## Preparation

For Node.js:

```shell
$ cd transformers-playground

# Make sure that Node.js is installed
$ node --version
v18.16.1

# Install dependencies
$ corepack enable
$ pnpm install
```

For Python

```shell
$ cd transformers-playground

# Make sure that Python is installed
$ python3 --version
Python 3.11.4

# Install dependencies
$ python3 venv venv
$ source ./venv/bin/activate
$ pip3 install torch transformers
```

## Usage

```shell
$ cd transformers-playground

# Run python3 script
$ pnpm run:python

# Run Node.js script
$ pnpm run:node

# Start a web server, then click the buttons in the browser to start the benchmark.
# The result will be printed in the browser console.
$ pnpm run:browser
```

## Benchmark result

| Environment                   | CPU usage | Time (seconds) |
| ----------------------------- | --------- | -------------- |
| Chrome - 1 worker - 1 thread  | 100%      | 300            |
| Chrome - 1 worker - 4 threads | 100%      | 303            |
| Chrome - 4 workers            | 400%      | 94             |
| Chrome - 8 workers            | 700%      | 72             |
| Chrome - 16 workers           | 700%      | 69             |
| Node.js                       | 350%      | 33             |
| Python                        | 300%      | 31             |
