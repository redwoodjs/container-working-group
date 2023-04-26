import signal
import subprocess
import time
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt

# Define variables
CONTAINER_NAME = "redwood-api"
DOCKERFILE_PATH = "."
BENCHMARK_DURATION = 20
BENCHMARK_RUNS = 9

# Build the Docker image
print("Building Docker image...")
subprocess.run(["docker", "build", f"-t{CONTAINER_NAME}", DOCKERFILE_PATH], check=True)

memoryUsages = []
for i in range(BENCHMARK_RUNS):
  # Run docker stats to collect data
  statsProcess = subprocess.Popen(["docker", "stats", "--format", "table {{.ID}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}\t{{.PIDs}}", "--no-trunc"], stdout=subprocess.PIPE, text=True)

  # Run the docker container
  print("Starting Docker container...")
  run_output = subprocess.run(["docker", "run", "-d", CONTAINER_NAME], check=True, stdout=subprocess.PIPE, text=True)
  container_ID = run_output.stdout.strip()

  # Wait for some time to gather data
  print(f"Waiting for {BENCHMARK_DURATION} seconds to gather data...")
  time.sleep(BENCHMARK_DURATION)

  # Stop and then delete the container
  print("Stopping and deleting container...")
  subprocess.run(["docker", "stop", container_ID], check=True, stdout=subprocess.PIPE)
  subprocess.run(["docker", "rm", container_ID], check=True, stdout=subprocess.PIPE)

  # Stop the docker stats process and get the output
  statsProcess.send_signal(signal.SIGINT)
  statsProcess.wait()

  # Parse the stats output
  statsOutput = statsProcess.stdout.readlines()
  containerStats = [line for line in statsOutput if line.startswith(container_ID)]
  containerMemUsage = [float(line.split('   ')[1].split(' ')[0][:-3]) for line in containerStats]

  memoryUsages.append(containerMemUsage)

# Plot the data
max_length = max([len(memoryUsage) for memoryUsage in memoryUsages])
for memoryUsage in memoryUsages:
  memoryUsage.extend([float("nan")] * (max_length - len(memoryUsage)))
  plt.plot(memoryUsage, marker='x')
plt.xlabel("Time (arb.)")
plt.ylabel("Memory Usage (MiB)")
plt.show()

# Print the max memory usage
maxMemoryUsages = [max(memoryUsage) for memoryUsage in memoryUsages]
print(f"Max memory usage: {max(maxMemoryUsages)} MiB")

