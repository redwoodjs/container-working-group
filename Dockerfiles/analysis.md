# Dockerfile Analysis Report

**Generated:** 2023-05-30T13:55:42.961Z

**Options:** --cache=true, --reset=true, --dockle=true, --dive=true

## Version: "coherence"

### Target: "serve"

#### Image: "api"

**Metrics:**

| Metric | Value | Raw |
| :----- | ----: | ----: |
| Image Size | 1.99 GB | 1987507666 |
| Build Time | 1s | 1050 |
| Build Memory | 47.1 MB | 47136000 |

**Layers:**

```
IMAGE          CREATED             CREATED BY                                      SIZE      COMMENT
8197b773145f   5 minutes ago       CMD ["yarn" "rw" "serve" "api"]                 0B        buildkit.dockerfile.v0
<missing>      5 minutes ago       RUN /bin/sh -c yarn rw build api # buildkit     49.2MB    buildkit.dockerfile.v0
<missing>      5 minutes ago       COPY . . # buildkit                             3.25MB    buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c yarn install # buildkit          934MB     buildkit.dockerfile.v0
<missing>      About an hour ago   COPY api/package.json ./api/ # buildkit         201B      buildkit.dockerfile.v0
<missing>      About an hour ago   COPY package.json yarn.lock . # buildkit        884kB     buildkit.dockerfile.v0
<missing>      About an hour ago   COPY .yarnrc.yml . # buildkit                   600B      buildkit.dockerfile.v0
<missing>      About an hour ago   COPY .yarn .yarn # buildkit                     2.23MB    buildkit.dockerfile.v0
<missing>      About an hour ago   WORKDIR /app                                    0B        buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c yarn cache clean # buildkit      2.2MB     buildkit.dockerfile.v0
<missing>      7 days ago          /bin/sh -c #(nop)  CMD ["node"]                 0B        
<missing>      7 days ago          /bin/sh -c #(nop)  ENTRYPOINT ["docker-entry…   0B        
<missing>      7 days ago          /bin/sh -c #(nop) COPY file:4d192565a7220e13…   388B      
<missing>      7 days ago          /bin/sh -c set -ex   && for key in     6A010…   7.6MB     
<missing>      7 days ago          /bin/sh -c #(nop)  ENV YARN_VERSION=1.22.19     0B        
<missing>      7 days ago          /bin/sh -c ARCH= && dpkgArch="$(dpkg --print…   154MB     
<missing>      7 days ago          /bin/sh -c #(nop)  ENV NODE_VERSION=18.16.0     0B        
<missing>      7 days ago          /bin/sh -c groupadd --gid 1000 node   && use…   334kB     
<missing>      7 days ago          /bin/sh -c set -ex;  apt-get update;  apt-ge…   529MB     
<missing>      7 days ago          /bin/sh -c apt-get update && apt-get install…   152MB     
<missing>      7 days ago          /bin/sh -c set -eux;  apt-get update;  apt-g…   28.6MB    
<missing>      7 days ago          /bin/sh -c #(nop)  CMD ["bash"]                 0B        
<missing>      7 days ago          /bin/sh -c #(nop) ADD file:150a6453ab2258061…   124MB     
```

**Dockle:**

```
WARN	- CIS-DI-0001: Create a user for the container
	* Last user should not be root
WARN	- DKL-DI-0006: Avoid latest tag
	* Avoid 'latest' tag
INFO	- CIS-DI-0005: Enable Content trust for Docker
	* export DOCKER_CONTENT_TRUST=1 before docker pull/build
INFO	- CIS-DI-0006: Add HEALTHCHECK instruction to the container image
	* not found HEALTHCHECK statement
INFO	- CIS-DI-0008: Confirm safety of setuid/setgid files
	* setgid file: grwxr-xr-x sbin/unix_chkpwd
	* setgid file: grwxr-xr-x usr/bin/ssh-agent
	* setgid file: grwxr-xr-x usr/bin/expiry
	* setuid file: urwxr-xr-x bin/su
	* setuid file: urwxr-xr-x usr/lib/openssh/ssh-keysign
	* setuid file: urwxr-xr-x bin/mount
	* setuid file: urwxr-xr-x usr/bin/passwd
	* setuid file: urwxr-xr-x usr/bin/newgrp
	* setuid file: urwxr-xr-x bin/umount
	* setuid file: urwxr-xr-x usr/bin/chfn
	* setgid file: grwxr-xr-x usr/bin/chage
	* setgid file: grwxr-xr-x usr/bin/wall
	* setuid file: urwxr-xr-x usr/bin/chsh
	* setuid file: urwxr-xr-x usr/bin/gpasswd
INFO	- DKL-LI-0003: Only put necessary files
	* Suspicious directory : tmp 
```

**Dive:**

```
  Using default CI config
Image Source: docker://rw-analyse-image
Fetching image... (this can take a while for large images)
Analyzing image...
  efficiency: 98.2127 %
  wastedBytes: 60166903 bytes (60 MB)
  userWastedPercent: 3.2290 %
Inefficient Files:
Count  Wasted Space  File Path
    2         29 MB  /root/.cache/prisma/master/d9a4c5988f480fa576d43970d5a23641aa77bc9c/debian-openssl-1.1.x/libquery-engine
    4        8.8 MB  /tmp/v8-compile-cache-0/10.2.154.26-node.26/zSoptzSyarn-v1.22.19zSbinzSyarn.js.BLOB
    2        5.9 MB  /app/.yarn/install-state.gz
    2        4.5 MB  /app/.yarn/releases/yarn-3.5.1.cjs
    4        3.3 MB  /var/cache/debconf/templates.dat
    4        3.2 MB  /var/cache/debconf/templates.dat-old
    3        2.6 MB  /app/yarn.lock
    4        724 kB  /var/lib/dpkg/status
    4        724 kB  /var/lib/dpkg/status-old
    2        322 kB  /var/log/lastlog
    3        205 kB  /var/log/dpkg.log
    2        179 kB  /app/node_modules/.prisma/client/index.d.ts
    3        106 kB  /var/log/apt/term.log
    2         74 kB  /root/.gnupg/pubring.kbx
    2         61 kB  /root/.gnupg/pubring.kbx~
    4         56 kB  /etc/ld.so.cache
    4         54 kB  /var/cache/debconf/config.dat
    4         44 kB  /var/lib/apt/extended_states
    4         42 kB  /var/cache/debconf/config.dat-old
    2         35 kB  /var/log/faillog
    3         32 kB  /var/cache/ldconfig/aux-cache
    3         31 kB  /var/log/apt/eipp.log.xz
    3         20 kB  /var/log/apt/history.log
    3         13 kB  /var/log/alternatives.log
    2         12 kB  /app/node_modules/.prisma/client/index.js
    2        4.8 kB  /app/node_modules/.prisma/client/index-browser.js
    2        2.4 kB  /root/.gnupg/trustdb.gpg
    2        1.9 kB  /etc/passwd
    2        1.8 kB  /etc/passwd-
    3        1.4 kB  /etc/group
    3        1.3 kB  /etc/group-
    2        1.2 kB  /app/.yarnrc.yml
    3        1.1 kB  /etc/gshadow
    2        1.0 kB  /etc/shadow
    2        1.0 kB  /etc/shadow-
    2         770 B  /app/package.json
    2         756 B  /etc/gshadow-
    2         402 B  /app/api/package.json
    4         352 B  /tmp/v8-compile-cache-0/10.2.154.26-node.26/zSoptzSyarn-v1.22.19zSbinzSyarn.js.MAP
    2         271 B  /app/.redwood/updateCheck/data.json
    2          18 B  /etc/subgid
    2          18 B  /etc/subuid
    3           0 B  /var/cache/apt/archives/partial
    3           0 B  /var/cache/apt/archives/lock
    4           0 B  /var/lib/dpkg/lock-frontend
    4           0 B  /var/lib/dpkg/lock
    4           0 B  /var/lib/apt/lists
    2           0 B  /root/.gnupg/private-keys-v1.d
    3           0 B  /etc
    3           0 B  /var/lib/dpkg/triggers/Unincorp
    4           0 B  /var/cache/debconf/passwords.dat
    4           0 B  /var/lib/dpkg/updates
    3           0 B  /etc/.pwd.lock
    4           0 B  /tmp
    4           0 B  /var/lib/dpkg/triggers/Lock
Results:
  PASS: highestUserWastedPercent
  SKIP: highestWastedBytes: rule disabled
  PASS: lowestEfficiency
Result:PASS [Total:3] [Passed:2] [Failed:0] [Warn:0] [Skipped:1]

```

## Version: "optimized"

### Target: "build"

#### Image: "api"

**Metrics:**

| Metric | Value | Raw |
| :----- | ----: | ----: |
| Image Size | 1.94 GB | 1938339971 |
| Build Time | 660ms | 660 |
| Build Memory | 43.2 MB | 43156000 |

**Layers:**

```
IMAGE          CREATED             CREATED BY                                      SIZE      COMMENT
ca45ef4fb8c3   26 minutes ago      ENTRYPOINT ["/bin/sh" "-c" "yarn rw build ap…   0B        buildkit.dockerfile.v0
<missing>      26 minutes ago      COPY . . # buildkit                             3.25MB    buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c yarn install # buildkit          934MB     buildkit.dockerfile.v0
<missing>      About an hour ago   COPY ./api/package*.json ./api/ # buildkit      201B      buildkit.dockerfile.v0
<missing>      About an hour ago   COPY .yarnrc.yml .yarnrc.yml # buildkit         600B      buildkit.dockerfile.v0
<missing>      About an hour ago   COPY .yarn .yarn # buildkit                     2.23MB    buildkit.dockerfile.v0
<missing>      About an hour ago   COPY yarn.lock . # buildkit                     883kB     buildkit.dockerfile.v0
<missing>      About an hour ago   COPY package*.json . # buildkit                 385B      buildkit.dockerfile.v0
<missing>      About an hour ago   WORKDIR /app                                    0B        buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c mkdir /app # buildkit            0B        buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c yarn cache clean # buildkit      2.2MB     buildkit.dockerfile.v0
<missing>      7 days ago          /bin/sh -c #(nop)  CMD ["node"]                 0B        
<missing>      7 days ago          /bin/sh -c #(nop)  ENTRYPOINT ["docker-entry…   0B        
<missing>      7 days ago          /bin/sh -c #(nop) COPY file:4d192565a7220e13…   388B      
<missing>      7 days ago          /bin/sh -c set -ex   && for key in     6A010…   7.6MB     
<missing>      7 days ago          /bin/sh -c #(nop)  ENV YARN_VERSION=1.22.19     0B        
<missing>      7 days ago          /bin/sh -c ARCH= && dpkgArch="$(dpkg --print…   154MB     
<missing>      7 days ago          /bin/sh -c #(nop)  ENV NODE_VERSION=18.16.0     0B        
<missing>      7 days ago          /bin/sh -c groupadd --gid 1000 node   && use…   334kB     
<missing>      7 days ago          /bin/sh -c set -ex;  apt-get update;  apt-ge…   529MB     
<missing>      7 days ago          /bin/sh -c apt-get update && apt-get install…   152MB     
<missing>      7 days ago          /bin/sh -c set -eux;  apt-get update;  apt-g…   28.6MB    
<missing>      7 days ago          /bin/sh -c #(nop)  CMD ["bash"]                 0B        
<missing>      7 days ago          /bin/sh -c #(nop) ADD file:150a6453ab2258061…   124MB     
```

**Dockle:**

```
WARN	- CIS-DI-0001: Create a user for the container
	* Last user should not be root
WARN	- DKL-DI-0006: Avoid latest tag
	* Avoid 'latest' tag
INFO	- CIS-DI-0005: Enable Content trust for Docker
	* export DOCKER_CONTENT_TRUST=1 before docker pull/build
INFO	- CIS-DI-0006: Add HEALTHCHECK instruction to the container image
	* not found HEALTHCHECK statement
INFO	- CIS-DI-0008: Confirm safety of setuid/setgid files
	* setgid file: grwxr-xr-x usr/bin/chage
	* setuid file: urwxr-xr-x usr/bin/chfn
	* setuid file: urwxr-xr-x usr/lib/openssh/ssh-keysign
	* setuid file: urwxr-xr-x bin/mount
	* setuid file: urwxr-xr-x usr/bin/gpasswd
	* setuid file: urwxr-xr-x bin/su
	* setuid file: urwxr-xr-x usr/bin/chsh
	* setgid file: grwxr-xr-x usr/bin/wall
	* setgid file: grwxr-xr-x sbin/unix_chkpwd
	* setgid file: grwxr-xr-x usr/bin/expiry
	* setuid file: urwxr-xr-x usr/bin/newgrp
	* setuid file: urwxr-xr-x bin/umount
	* setgid file: grwxr-xr-x usr/bin/ssh-agent
	* setuid file: urwxr-xr-x usr/bin/passwd
INFO	- DKL-LI-0003: Only put necessary files
	* Suspicious directory : tmp 
```

**Dive:**

```
  Using default CI config
Image Source: docker://rw-analyse-image
Fetching image... (this can take a while for large images)
Analyzing image...
  efficiency: 99.1951 %
  wastedBytes: 22769505 bytes (23 MB)
  userWastedPercent: 1.2551 %
Inefficient Files:
Count  Wasted Space  File Path
    3        6.6 MB  /tmp/v8-compile-cache-0/10.2.154.26-node.26/zSoptzSyarn-v1.22.19zSbinzSyarn.js.BLOB
    2        4.5 MB  /app/.yarn/releases/yarn-3.5.1.cjs
    4        3.3 MB  /var/cache/debconf/templates.dat
    4        3.2 MB  /var/cache/debconf/templates.dat-old
    3        2.6 MB  /app/yarn.lock
    4        724 kB  /var/lib/dpkg/status
    4        724 kB  /var/lib/dpkg/status-old
    2        322 kB  /var/log/lastlog
    3        205 kB  /var/log/dpkg.log
    3        106 kB  /var/log/apt/term.log
    2         74 kB  /root/.gnupg/pubring.kbx
    2         61 kB  /root/.gnupg/pubring.kbx~
    4         56 kB  /etc/ld.so.cache
    4         54 kB  /var/cache/debconf/config.dat
    4         44 kB  /var/lib/apt/extended_states
    4         42 kB  /var/cache/debconf/config.dat-old
    2         35 kB  /var/log/faillog
    3         32 kB  /var/cache/ldconfig/aux-cache
    3         31 kB  /var/log/apt/eipp.log.xz
    3         20 kB  /var/log/apt/history.log
    3         13 kB  /var/log/alternatives.log
    2        2.4 kB  /root/.gnupg/trustdb.gpg
    2        1.9 kB  /etc/passwd
    2        1.8 kB  /etc/passwd-
    3        1.4 kB  /etc/group
    3        1.3 kB  /etc/group-
    2        1.2 kB  /app/.yarnrc.yml
    3        1.1 kB  /etc/gshadow
    2        1.0 kB  /etc/shadow
    2        1.0 kB  /etc/shadow-
    2         770 B  /app/package.json
    2         756 B  /etc/gshadow-
    2         402 B  /app/api/package.json
    3         264 B  /tmp/v8-compile-cache-0/10.2.154.26-node.26/zSoptzSyarn-v1.22.19zSbinzSyarn.js.MAP
    2          18 B  /etc/subuid
    2          18 B  /etc/subgid
    3           0 B  /etc/.pwd.lock
    3           0 B  /var/cache/apt/archives/lock
    4           0 B  /var/lib/dpkg/lock-frontend
    4           0 B  /var/lib/dpkg/lock
    4           0 B  /var/lib/apt/lists
    2           0 B  /root/.gnupg/private-keys-v1.d
    3           0 B  /var/lib/dpkg/triggers/Unincorp
    3           0 B  /etc
    4           0 B  /var/cache/debconf/passwords.dat
    3           0 B  /var/cache/apt/archives/partial
    4           0 B  /var/lib/dpkg/updates
    4           0 B  /tmp
    4           0 B  /var/lib/dpkg/triggers/Lock
Results:
  PASS: highestUserWastedPercent
  SKIP: highestWastedBytes: rule disabled
  PASS: lowestEfficiency
Result:PASS [Total:3] [Passed:2] [Failed:0] [Warn:0] [Skipped:1]

```

### Target: "serve"

#### Image: "api"

**Metrics:**

| Metric | Value | Raw |
| :----- | ----: | ----: |
| Image Size | 1.94 GB | 1938339971 |
| Build Time | 690ms | 690 |
| Build Memory | 43.6 MB | 43584000 |

**Layers:**

```
IMAGE          CREATED             CREATED BY                                      SIZE      COMMENT
59c2ccbe90bc   27 minutes ago      CMD ["/bin/sh" "-c" "yarn rw build api && ya…   0B        buildkit.dockerfile.v0
<missing>      27 minutes ago      COPY . . # buildkit                             3.25MB    buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c yarn install # buildkit          934MB     buildkit.dockerfile.v0
<missing>      About an hour ago   COPY ./api/package*.json ./api/ # buildkit      201B      buildkit.dockerfile.v0
<missing>      About an hour ago   COPY .yarnrc.yml .yarnrc.yml # buildkit         600B      buildkit.dockerfile.v0
<missing>      About an hour ago   COPY .yarn .yarn # buildkit                     2.23MB    buildkit.dockerfile.v0
<missing>      About an hour ago   COPY yarn.lock . # buildkit                     883kB     buildkit.dockerfile.v0
<missing>      About an hour ago   COPY package*.json . # buildkit                 385B      buildkit.dockerfile.v0
<missing>      About an hour ago   WORKDIR /app                                    0B        buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c mkdir /app # buildkit            0B        buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c yarn cache clean # buildkit      2.2MB     buildkit.dockerfile.v0
<missing>      7 days ago          /bin/sh -c #(nop)  CMD ["node"]                 0B        
<missing>      7 days ago          /bin/sh -c #(nop)  ENTRYPOINT ["docker-entry…   0B        
<missing>      7 days ago          /bin/sh -c #(nop) COPY file:4d192565a7220e13…   388B      
<missing>      7 days ago          /bin/sh -c set -ex   && for key in     6A010…   7.6MB     
<missing>      7 days ago          /bin/sh -c #(nop)  ENV YARN_VERSION=1.22.19     0B        
<missing>      7 days ago          /bin/sh -c ARCH= && dpkgArch="$(dpkg --print…   154MB     
<missing>      7 days ago          /bin/sh -c #(nop)  ENV NODE_VERSION=18.16.0     0B        
<missing>      7 days ago          /bin/sh -c groupadd --gid 1000 node   && use…   334kB     
<missing>      7 days ago          /bin/sh -c set -ex;  apt-get update;  apt-ge…   529MB     
<missing>      7 days ago          /bin/sh -c apt-get update && apt-get install…   152MB     
<missing>      7 days ago          /bin/sh -c set -eux;  apt-get update;  apt-g…   28.6MB    
<missing>      7 days ago          /bin/sh -c #(nop)  CMD ["bash"]                 0B        
<missing>      7 days ago          /bin/sh -c #(nop) ADD file:150a6453ab2258061…   124MB     
```

**Dockle:**

```
WARN	- CIS-DI-0001: Create a user for the container
	* Last user should not be root
WARN	- DKL-DI-0006: Avoid latest tag
	* Avoid 'latest' tag
INFO	- CIS-DI-0005: Enable Content trust for Docker
	* export DOCKER_CONTENT_TRUST=1 before docker pull/build
INFO	- CIS-DI-0006: Add HEALTHCHECK instruction to the container image
	* not found HEALTHCHECK statement
INFO	- CIS-DI-0008: Confirm safety of setuid/setgid files
	* setuid file: urwxr-xr-x bin/mount
	* setuid file: urwxr-xr-x usr/bin/newgrp
	* setuid file: urwxr-xr-x usr/bin/chfn
	* setuid file: urwxr-xr-x bin/su
	* setuid file: urwxr-xr-x usr/bin/gpasswd
	* setuid file: urwxr-xr-x usr/bin/passwd
	* setuid file: urwxr-xr-x bin/umount
	* setgid file: grwxr-xr-x usr/bin/ssh-agent
	* setgid file: grwxr-xr-x usr/bin/chage
	* setgid file: grwxr-xr-x usr/bin/expiry
	* setuid file: urwxr-xr-x usr/bin/chsh
	* setgid file: grwxr-xr-x usr/bin/wall
	* setgid file: grwxr-xr-x sbin/unix_chkpwd
	* setuid file: urwxr-xr-x usr/lib/openssh/ssh-keysign
INFO	- DKL-LI-0003: Only put necessary files
	* Suspicious directory : tmp 
```

**Dive:**

```
  Using default CI config
Image Source: docker://rw-analyse-image
Fetching image... (this can take a while for large images)
Analyzing image...
  efficiency: 99.1951 %
  wastedBytes: 22769505 bytes (23 MB)
  userWastedPercent: 1.2551 %
Inefficient Files:
Count  Wasted Space  File Path
    3        6.6 MB  /tmp/v8-compile-cache-0/10.2.154.26-node.26/zSoptzSyarn-v1.22.19zSbinzSyarn.js.BLOB
    2        4.5 MB  /app/.yarn/releases/yarn-3.5.1.cjs
    4        3.3 MB  /var/cache/debconf/templates.dat
    4        3.2 MB  /var/cache/debconf/templates.dat-old
    3        2.6 MB  /app/yarn.lock
    4        724 kB  /var/lib/dpkg/status
    4        724 kB  /var/lib/dpkg/status-old
    2        322 kB  /var/log/lastlog
    3        205 kB  /var/log/dpkg.log
    3        106 kB  /var/log/apt/term.log
    2         74 kB  /root/.gnupg/pubring.kbx
    2         61 kB  /root/.gnupg/pubring.kbx~
    4         56 kB  /etc/ld.so.cache
    4         54 kB  /var/cache/debconf/config.dat
    4         44 kB  /var/lib/apt/extended_states
    4         42 kB  /var/cache/debconf/config.dat-old
    2         35 kB  /var/log/faillog
    3         32 kB  /var/cache/ldconfig/aux-cache
    3         31 kB  /var/log/apt/eipp.log.xz
    3         20 kB  /var/log/apt/history.log
    3         13 kB  /var/log/alternatives.log
    2        2.4 kB  /root/.gnupg/trustdb.gpg
    2        1.9 kB  /etc/passwd
    2        1.8 kB  /etc/passwd-
    3        1.4 kB  /etc/group
    3        1.3 kB  /etc/group-
    2        1.2 kB  /app/.yarnrc.yml
    3        1.1 kB  /etc/gshadow
    2        1.0 kB  /etc/shadow
    2        1.0 kB  /etc/shadow-
    2         770 B  /app/package.json
    2         756 B  /etc/gshadow-
    2         402 B  /app/api/package.json
    3         264 B  /tmp/v8-compile-cache-0/10.2.154.26-node.26/zSoptzSyarn-v1.22.19zSbinzSyarn.js.MAP
    2          18 B  /etc/subuid
    2          18 B  /etc/subgid
    3           0 B  /etc/.pwd.lock
    3           0 B  /var/cache/apt/archives/lock
    4           0 B  /var/lib/dpkg/lock-frontend
    4           0 B  /var/lib/dpkg/lock
    4           0 B  /var/lib/apt/lists
    2           0 B  /root/.gnupg/private-keys-v1.d
    3           0 B  /var/lib/dpkg/triggers/Unincorp
    3           0 B  /etc
    4           0 B  /var/cache/debconf/passwords.dat
    3           0 B  /var/cache/apt/archives/partial
    4           0 B  /var/lib/dpkg/updates
    4           0 B  /tmp
    4           0 B  /var/lib/dpkg/triggers/Lock
Results:
  PASS: highestUserWastedPercent
  SKIP: highestWastedBytes: rule disabled
  PASS: lowestEfficiency
Result:PASS [Total:3] [Passed:2] [Failed:0] [Warn:0] [Skipped:1]

```

## Version: "unoptimized"

### Target: "build"

#### Image: "api"

**Metrics:**

| Metric | Value | Raw |
| :----- | ----: | ----: |
| Image Size | 1.94 GB | 1938339971 |
| Build Time | 630ms | 630 |
| Build Memory | 43.4 MB | 43392000 |

**Layers:**

```
IMAGE          CREATED             CREATED BY                                      SIZE      COMMENT
ca45ef4fb8c3   28 minutes ago      ENTRYPOINT ["/bin/sh" "-c" "yarn rw build ap…   0B        buildkit.dockerfile.v0
<missing>      28 minutes ago      COPY . . # buildkit                             3.25MB    buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c yarn install # buildkit          934MB     buildkit.dockerfile.v0
<missing>      About an hour ago   COPY ./api/package*.json ./api/ # buildkit      201B      buildkit.dockerfile.v0
<missing>      About an hour ago   COPY .yarnrc.yml .yarnrc.yml # buildkit         600B      buildkit.dockerfile.v0
<missing>      About an hour ago   COPY .yarn .yarn # buildkit                     2.23MB    buildkit.dockerfile.v0
<missing>      About an hour ago   COPY yarn.lock . # buildkit                     883kB     buildkit.dockerfile.v0
<missing>      About an hour ago   COPY package*.json . # buildkit                 385B      buildkit.dockerfile.v0
<missing>      About an hour ago   WORKDIR /app                                    0B        buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c mkdir /app # buildkit            0B        buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c yarn cache clean # buildkit      2.2MB     buildkit.dockerfile.v0
<missing>      7 days ago          /bin/sh -c #(nop)  CMD ["node"]                 0B        
<missing>      7 days ago          /bin/sh -c #(nop)  ENTRYPOINT ["docker-entry…   0B        
<missing>      7 days ago          /bin/sh -c #(nop) COPY file:4d192565a7220e13…   388B      
<missing>      7 days ago          /bin/sh -c set -ex   && for key in     6A010…   7.6MB     
<missing>      7 days ago          /bin/sh -c #(nop)  ENV YARN_VERSION=1.22.19     0B        
<missing>      7 days ago          /bin/sh -c ARCH= && dpkgArch="$(dpkg --print…   154MB     
<missing>      7 days ago          /bin/sh -c #(nop)  ENV NODE_VERSION=18.16.0     0B        
<missing>      7 days ago          /bin/sh -c groupadd --gid 1000 node   && use…   334kB     
<missing>      7 days ago          /bin/sh -c set -ex;  apt-get update;  apt-ge…   529MB     
<missing>      7 days ago          /bin/sh -c apt-get update && apt-get install…   152MB     
<missing>      7 days ago          /bin/sh -c set -eux;  apt-get update;  apt-g…   28.6MB    
<missing>      7 days ago          /bin/sh -c #(nop)  CMD ["bash"]                 0B        
<missing>      7 days ago          /bin/sh -c #(nop) ADD file:150a6453ab2258061…   124MB     
```

**Dockle:**

```
WARN	- CIS-DI-0001: Create a user for the container
	* Last user should not be root
WARN	- DKL-DI-0006: Avoid latest tag
	* Avoid 'latest' tag
INFO	- CIS-DI-0005: Enable Content trust for Docker
	* export DOCKER_CONTENT_TRUST=1 before docker pull/build
INFO	- CIS-DI-0006: Add HEALTHCHECK instruction to the container image
	* not found HEALTHCHECK statement
INFO	- CIS-DI-0008: Confirm safety of setuid/setgid files
	* setgid file: grwxr-xr-x usr/bin/expiry
	* setuid file: urwxr-xr-x bin/su
	* setuid file: urwxr-xr-x usr/bin/newgrp
	* setuid file: urwxr-xr-x bin/umount
	* setuid file: urwxr-xr-x bin/mount
	* setuid file: urwxr-xr-x usr/bin/gpasswd
	* setuid file: urwxr-xr-x usr/bin/passwd
	* setuid file: urwxr-xr-x usr/bin/chfn
	* setgid file: grwxr-xr-x usr/bin/wall
	* setgid file: grwxr-xr-x usr/bin/ssh-agent
	* setuid file: urwxr-xr-x usr/bin/chsh
	* setuid file: urwxr-xr-x usr/lib/openssh/ssh-keysign
	* setgid file: grwxr-xr-x usr/bin/chage
	* setgid file: grwxr-xr-x sbin/unix_chkpwd
INFO	- DKL-LI-0003: Only put necessary files
	* Suspicious directory : tmp 
```

**Dive:**

```
  Using default CI config
Image Source: docker://rw-analyse-image
Fetching image... (this can take a while for large images)
Analyzing image...
  efficiency: 99.1951 %
  wastedBytes: 22769505 bytes (23 MB)
  userWastedPercent: 1.2551 %
Inefficient Files:
Count  Wasted Space  File Path
    3        6.6 MB  /tmp/v8-compile-cache-0/10.2.154.26-node.26/zSoptzSyarn-v1.22.19zSbinzSyarn.js.BLOB
    2        4.5 MB  /app/.yarn/releases/yarn-3.5.1.cjs
    4        3.3 MB  /var/cache/debconf/templates.dat
    4        3.2 MB  /var/cache/debconf/templates.dat-old
    3        2.6 MB  /app/yarn.lock
    4        724 kB  /var/lib/dpkg/status
    4        724 kB  /var/lib/dpkg/status-old
    2        322 kB  /var/log/lastlog
    3        205 kB  /var/log/dpkg.log
    3        106 kB  /var/log/apt/term.log
    2         74 kB  /root/.gnupg/pubring.kbx
    2         61 kB  /root/.gnupg/pubring.kbx~
    4         56 kB  /etc/ld.so.cache
    4         54 kB  /var/cache/debconf/config.dat
    4         44 kB  /var/lib/apt/extended_states
    4         42 kB  /var/cache/debconf/config.dat-old
    2         35 kB  /var/log/faillog
    3         32 kB  /var/cache/ldconfig/aux-cache
    3         31 kB  /var/log/apt/eipp.log.xz
    3         20 kB  /var/log/apt/history.log
    3         13 kB  /var/log/alternatives.log
    2        2.4 kB  /root/.gnupg/trustdb.gpg
    2        1.9 kB  /etc/passwd
    2        1.8 kB  /etc/passwd-
    3        1.4 kB  /etc/group
    3        1.3 kB  /etc/group-
    2        1.2 kB  /app/.yarnrc.yml
    3        1.1 kB  /etc/gshadow
    2        1.0 kB  /etc/shadow
    2        1.0 kB  /etc/shadow-
    2         770 B  /app/package.json
    2         756 B  /etc/gshadow-
    2         402 B  /app/api/package.json
    3         264 B  /tmp/v8-compile-cache-0/10.2.154.26-node.26/zSoptzSyarn-v1.22.19zSbinzSyarn.js.MAP
    2          18 B  /etc/subuid
    2          18 B  /etc/subgid
    3           0 B  /etc/.pwd.lock
    3           0 B  /var/cache/apt/archives/lock
    4           0 B  /var/lib/dpkg/lock-frontend
    4           0 B  /var/lib/dpkg/lock
    4           0 B  /var/lib/apt/lists
    2           0 B  /root/.gnupg/private-keys-v1.d
    3           0 B  /var/lib/dpkg/triggers/Unincorp
    3           0 B  /etc
    4           0 B  /var/cache/debconf/passwords.dat
    3           0 B  /var/cache/apt/archives/partial
    4           0 B  /var/lib/dpkg/updates
    4           0 B  /tmp
    4           0 B  /var/lib/dpkg/triggers/Lock
Results:
  PASS: highestUserWastedPercent
  SKIP: highestWastedBytes: rule disabled
  PASS: lowestEfficiency
Result:PASS [Total:3] [Passed:2] [Failed:0] [Warn:0] [Skipped:1]

```

### Target: "serve"

#### Image: "api"

**Metrics:**

| Metric | Value | Raw |
| :----- | ----: | ----: |
| Image Size | 1.94 GB | 1938339971 |
| Build Time | 700ms | 700 |
| Build Memory | 43.6 MB | 43584000 |

**Layers:**

```
IMAGE          CREATED             CREATED BY                                      SIZE      COMMENT
59c2ccbe90bc   29 minutes ago      CMD ["/bin/sh" "-c" "yarn rw build api && ya…   0B        buildkit.dockerfile.v0
<missing>      29 minutes ago      COPY . . # buildkit                             3.25MB    buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c yarn install # buildkit          934MB     buildkit.dockerfile.v0
<missing>      About an hour ago   COPY ./api/package*.json ./api/ # buildkit      201B      buildkit.dockerfile.v0
<missing>      About an hour ago   COPY .yarnrc.yml .yarnrc.yml # buildkit         600B      buildkit.dockerfile.v0
<missing>      About an hour ago   COPY .yarn .yarn # buildkit                     2.23MB    buildkit.dockerfile.v0
<missing>      About an hour ago   COPY yarn.lock . # buildkit                     883kB     buildkit.dockerfile.v0
<missing>      About an hour ago   COPY package*.json . # buildkit                 385B      buildkit.dockerfile.v0
<missing>      About an hour ago   WORKDIR /app                                    0B        buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c mkdir /app # buildkit            0B        buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c yarn cache clean # buildkit      2.2MB     buildkit.dockerfile.v0
<missing>      7 days ago          /bin/sh -c #(nop)  CMD ["node"]                 0B        
<missing>      7 days ago          /bin/sh -c #(nop)  ENTRYPOINT ["docker-entry…   0B        
<missing>      7 days ago          /bin/sh -c #(nop) COPY file:4d192565a7220e13…   388B      
<missing>      7 days ago          /bin/sh -c set -ex   && for key in     6A010…   7.6MB     
<missing>      7 days ago          /bin/sh -c #(nop)  ENV YARN_VERSION=1.22.19     0B        
<missing>      7 days ago          /bin/sh -c ARCH= && dpkgArch="$(dpkg --print…   154MB     
<missing>      7 days ago          /bin/sh -c #(nop)  ENV NODE_VERSION=18.16.0     0B        
<missing>      7 days ago          /bin/sh -c groupadd --gid 1000 node   && use…   334kB     
<missing>      7 days ago          /bin/sh -c set -ex;  apt-get update;  apt-ge…   529MB     
<missing>      7 days ago          /bin/sh -c apt-get update && apt-get install…   152MB     
<missing>      7 days ago          /bin/sh -c set -eux;  apt-get update;  apt-g…   28.6MB    
<missing>      7 days ago          /bin/sh -c #(nop)  CMD ["bash"]                 0B        
<missing>      7 days ago          /bin/sh -c #(nop) ADD file:150a6453ab2258061…   124MB     
```

**Dockle:**

```
WARN	- CIS-DI-0001: Create a user for the container
	* Last user should not be root
WARN	- DKL-DI-0006: Avoid latest tag
	* Avoid 'latest' tag
INFO	- CIS-DI-0005: Enable Content trust for Docker
	* export DOCKER_CONTENT_TRUST=1 before docker pull/build
INFO	- CIS-DI-0006: Add HEALTHCHECK instruction to the container image
	* not found HEALTHCHECK statement
INFO	- CIS-DI-0008: Confirm safety of setuid/setgid files
	* setgid file: grwxr-xr-x usr/bin/ssh-agent
	* setuid file: urwxr-xr-x usr/lib/openssh/ssh-keysign
	* setuid file: urwxr-xr-x usr/bin/passwd
	* setgid file: grwxr-xr-x usr/bin/expiry
	* setuid file: urwxr-xr-x bin/umount
	* setgid file: grwxr-xr-x usr/bin/chage
	* setuid file: urwxr-xr-x usr/bin/newgrp
	* setuid file: urwxr-xr-x bin/su
	* setuid file: urwxr-xr-x usr/bin/gpasswd
	* setgid file: grwxr-xr-x usr/bin/wall
	* setuid file: urwxr-xr-x usr/bin/chsh
	* setgid file: grwxr-xr-x sbin/unix_chkpwd
	* setuid file: urwxr-xr-x usr/bin/chfn
	* setuid file: urwxr-xr-x bin/mount
INFO	- DKL-LI-0003: Only put necessary files
	* Suspicious directory : tmp 
```

**Dive:**

```
  Using default CI config
Image Source: docker://rw-analyse-image
Fetching image... (this can take a while for large images)
Analyzing image...
  efficiency: 99.1951 %
  wastedBytes: 22769505 bytes (23 MB)
  userWastedPercent: 1.2551 %
Inefficient Files:
Count  Wasted Space  File Path
    3        6.6 MB  /tmp/v8-compile-cache-0/10.2.154.26-node.26/zSoptzSyarn-v1.22.19zSbinzSyarn.js.BLOB
    2        4.5 MB  /app/.yarn/releases/yarn-3.5.1.cjs
    4        3.3 MB  /var/cache/debconf/templates.dat
    4        3.2 MB  /var/cache/debconf/templates.dat-old
    3        2.6 MB  /app/yarn.lock
    4        724 kB  /var/lib/dpkg/status
    4        724 kB  /var/lib/dpkg/status-old
    2        322 kB  /var/log/lastlog
    3        205 kB  /var/log/dpkg.log
    3        106 kB  /var/log/apt/term.log
    2         74 kB  /root/.gnupg/pubring.kbx
    2         61 kB  /root/.gnupg/pubring.kbx~
    4         56 kB  /etc/ld.so.cache
    4         54 kB  /var/cache/debconf/config.dat
    4         44 kB  /var/lib/apt/extended_states
    4         42 kB  /var/cache/debconf/config.dat-old
    2         35 kB  /var/log/faillog
    3         32 kB  /var/cache/ldconfig/aux-cache
    3         31 kB  /var/log/apt/eipp.log.xz
    3         20 kB  /var/log/apt/history.log
    3         13 kB  /var/log/alternatives.log
    2        2.4 kB  /root/.gnupg/trustdb.gpg
    2        1.9 kB  /etc/passwd
    2        1.8 kB  /etc/passwd-
    3        1.4 kB  /etc/group
    3        1.3 kB  /etc/group-
    2        1.2 kB  /app/.yarnrc.yml
    3        1.1 kB  /etc/gshadow
    2        1.0 kB  /etc/shadow
    2        1.0 kB  /etc/shadow-
    2         770 B  /app/package.json
    2         756 B  /etc/gshadow-
    2         402 B  /app/api/package.json
    3         264 B  /tmp/v8-compile-cache-0/10.2.154.26-node.26/zSoptzSyarn-v1.22.19zSbinzSyarn.js.MAP
    2          18 B  /etc/subuid
    2          18 B  /etc/subgid
    3           0 B  /etc/.pwd.lock
    3           0 B  /var/cache/apt/archives/lock
    4           0 B  /var/lib/dpkg/lock-frontend
    4           0 B  /var/lib/dpkg/lock
    4           0 B  /var/lib/apt/lists
    2           0 B  /root/.gnupg/private-keys-v1.d
    3           0 B  /var/lib/dpkg/triggers/Unincorp
    3           0 B  /etc
    4           0 B  /var/cache/debconf/passwords.dat
    3           0 B  /var/cache/apt/archives/partial
    4           0 B  /var/lib/dpkg/updates
    4           0 B  /tmp
    4           0 B  /var/lib/dpkg/triggers/Lock
Results:
  PASS: highestUserWastedPercent
  SKIP: highestWastedBytes: rule disabled
  PASS: lowestEfficiency
Result:PASS [Total:3] [Passed:2] [Failed:0] [Warn:0] [Skipped:1]

```