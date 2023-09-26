/*global console*/
/*global process*/

import fs from 'node:fs'
import path from 'node:path'
import { URL } from 'node:url'

import { execa } from 'execa'
import ora from 'ora'
import prettyBytes from 'pretty-bytes'
import prettyMilliseconds from 'pretty-ms'
import stripAnsi from 'strip-ansi'
import parser from 'yargs-parser'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const spinner = ora()

/**
 * Stores all the results of the analysis.
 */
const results = {}

async function main() {
  const argv = parser(process.argv.slice(2))

  const useCache = argv['cache'] == true
  const resetResults = argv['reset'] == true
  const avoidDockle = argv['dockle'] === false
  const avoidDive = argv['dive'] === false
  const directoriesToUse = argv._
  const targetsToUse = argv['target'] ?? []

  const dockerDirectories = fs
    .readdirSync(path.join(__dirname, '..'))
    .filter((file) => {
      if (file === path.basename(__dirname)) {
        return false
      }
      if (!fs.statSync(path.join(__dirname, '..', file)).isDirectory()) {
        return false
      }
      if (!fs.existsSync(path.join(__dirname, '..', file, 'build.json'))) {
        return false
      }
      if (directoriesToUse.length > 0) {
        return directoriesToUse.includes(file)
      }
      return true
    })

  console.log(
    'Found the following directories with build.json files:',
    dockerDirectories
  )

  for (const dir of dockerDirectories) {
    await analyseDockerfiles(
      dir,
      useCache,
      avoidDockle,
      avoidDive,
      targetsToUse
    )
  }

  // Merge new results with old results
  if (!resetResults) {
    const oldResults = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'analysis.json'), 'utf8')
    )
    for (const name of Object.keys(oldResults)) {
      if (!results[name]) {
        results[name] = oldResults[name]
      } else {
        for (const target of Object.keys(oldResults[name])) {
          if (!results[name][target]) {
            results[name][target] = oldResults[name][target]
          } else {
            for (const image of Object.keys(oldResults[name][target])) {
              if (!results[name][target][image]) {
                results[name][target][image] = oldResults[name][target][image]
              }
            }
          }
        }
      }
    }
  }

  // Write the results to a data file
  console.log('Writing raw results to file...')
  fs.writeFileSync(
    path.join(__dirname, '..', 'analysis.json'),
    JSON.stringify(results, undefined, 2)
  )
  // Generate a report in markdown
  await generateReportMarkdown({
    cache: useCache,
    reset: resetResults,
    dockle: !avoidDockle,
    dive: !avoidDive,
  })
}

async function analyseDockerfiles(
  directory,
  useCache,
  avoidDockle,
  avoidDive,
  targetsToUse
) {
  const buildJSON = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', directory, 'build.json'), 'utf8')
  )
  console.log(`Processing dockerfiles for: '${buildJSON.name}'`)
  results[buildJSON.name] = {}

  // Get all the build targets
  const buildTargets = Object.keys(buildJSON.targets)
  for (const buildTarget of buildTargets) {
    if (targetsToUse.length > 0 && !targetsToUse.includes(buildTarget)) {
      continue
    }
    console.log('Target:\t', buildTarget)
    results[buildJSON.name][buildTarget] = {}
    const imageNames = Object.keys(buildJSON.targets[buildTarget])
    for (const imageName of imageNames) {
      console.log('Image:\t', imageName)
      const imageData = {}

      // Run the image build command through the linx time command to get
      // memory and time usage information
      spinner.start(`Building image`)
      const args = buildJSON.targets[buildTarget][imageName]
      if (!useCache) {
        args.push('--no-cache')
      }
      const result = await execa('/usr/bin/time', ['-v', ...args], {
        cwd: path.join(__dirname, '..', directory),
      })
      if (result.exitCode !== 0) {
        console.error(result.stderr)
        continue
      }
      spinner.stopAndPersist({
        prefixText: '  ',
        symbol: '✔',
        text: `Built image`,
      })

      const output = result.stderr || result.stdout

      // Parse the build command output
      imageData.buildMemory = extractMaximumResidentSetSize(output)
      imageData.buildTime = extractWallTimeAsMilliseconds(output)

      // Get image size from docker
      spinner.start(`Determining image size`)
      const sizeResult = await execa(
        'docker',
        ['inspect', '-f', '{{ .Size }}', 'rw-analyse-image'],
        {
          cwd: path.join(__dirname, '..', directory),
        }
      )
      imageData.imageSize = parseInt(sizeResult.stdout)
      spinner.stopAndPersist({
        prefixText: '  ',
        symbol: '✔',
        text: `Determined image size`,
      })

      // Layers
      spinner.start(`Determining image layers`)
      const historyResult = await execa(
        'docker',
        ['history', 'rw-analyse-image'],
        {
          cwd: path.join(__dirname, '..', directory),
        }
      )
      imageData.layers = historyResult.stdout
      spinner.stopAndPersist({
        prefixText: '  ',
        symbol: '✔',
        text: `Determined image layers`,
      })

      // Dockle
      if (!avoidDockle) {
        spinner.start(`Running dockle`)
        const dockleResult = await execa('dockle', ['rw-analyse-image'], {
          cwd: path.join(__dirname, '..', directory),
        })
        imageData.dockle = stripAnsi(dockleResult.stdout)
        spinner.stopAndPersist({
          prefixText: '  ',
          symbol: '✔',
          text: `Ran dockle`,
        })
      }

      // Dive
      if (!avoidDive) {
        spinner.start(`Running dive`)
        const diveResult = await execa('dive', ['rw-analyse-image'], {
          cwd: path.join(__dirname, '..', directory),
          env: {
            CI: '1',
          },
        })
        imageData.dive = stripAnsi(diveResult.stdout)
        spinner.stopAndPersist({
          prefixText: '  ',
          symbol: '✔',
          text: `Ran dive`,
        })
      }

      // Store the results
      results[buildJSON.name][buildTarget][imageName] = imageData
    }
  }
}

async function generateReportMarkdown(options) {
  console.log('Generating report markdown...')

  let report = `# Dockerfile Analysis Report`
  report += `\n\n**Generated:** ${new Date().toISOString()}`
  report += `\n\n**Options:** --cache=${options['cache']}, --reset=${options['reset']}, --dockle=${options['dockle']}, --dive=${options['dive']}`

  for (const name of Object.keys(results).sort()) {
    report += `\n\n## Version: "${name}"`
    for (const target of Object.keys(results[name])) {
      report += `\n\n### Target: "${target}"`
      for (const image of Object.keys(results[name][target])) {
        report += `\n\n#### Image: "${image}"`

        const imageSize = results[name][target][image].imageSize
        const imageSizePretty = prettyBytes(imageSize)
        const imageBuildMemory = results[name][target][image].buildMemory
        const imageBuildMemoryPretty = prettyBytes(imageBuildMemory)
        const imageBuildTime = results[name][target][image].buildTime
        const imageBuildTimePretty = prettyMilliseconds(imageBuildTime)

        report += `\n\n**Metrics:**`
        report += `\n\n| Metric | Value | Raw |`
        report += `\n| :----- | ----: | ----: |`
        report += `\n| Image Size | ${imageSizePretty} | ${imageSize} |`
        report += `\n| Build Time | ${imageBuildTimePretty} | ${imageBuildTime} |`
        report += `\n| Build Memory | ${imageBuildMemoryPretty} | ${imageBuildMemory} |`

        report += `\n\n**Layers:**`
        report += `\n\n\`\`\`\n${results[name][target][image].layers}\n\`\`\``

        if (results[name][target][image].dockle) {
          report += `\n\n**Dockle:**`
          report += `\n\n\`\`\`\n${results[name][target][image].dockle}\n\`\`\``
        }

        if (results[name][target][image].dive) {
          report += `\n\n**Dive:**`
          report += `\n\n\`\`\`\n${results[name][target][image].dive}\n\`\`\``
        }
      }
    }
  }

  // Write the report to a file
  fs.writeFileSync(path.join(__dirname, '..', 'analysis.md'), report)
}

function extractMaximumResidentSetSize(text) {
  const regex = /Maximum resident set size \(kbytes\): (\d+)/
  const match = text.match(regex)
  return match ? parseInt(match[1]) * 1000 : -1
}

// Thank chatgpt for this - yuck...
// Also the (format or format) in the output doesn't match the actual format it outputs?
function extractWallTimeAsMilliseconds(text) {
  const regex =
    /Elapsed \(wall clock\) time \(h:mm:ss or m:ss\): (\d+):?(\d+)?\.(\d+)/
  const match = text.match(regex)

  if (!match) {
    return -1
  }

  let minutes = 0
  let seconds = 0
  let milliseconds = 0

  if (match[2]) {
    // Format: m:ss
    minutes = parseInt(match[1])
    seconds = parseInt(match[2])
  } else {
    // Format: ss.SS
    seconds = parseInt(match[1])
  }

  if (match[3]) {
    // Format: ss.SS or m:ss.SS
    milliseconds = parseInt(match[3])
  }

  const totalTimeInSeconds = minutes * 60 + seconds + milliseconds / 100
  return totalTimeInSeconds * 1000
}

// Run...
main()
