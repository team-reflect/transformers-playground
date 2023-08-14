import type { WorkerMessage } from './types'

function createWorker() {
  return new Worker(new URL('./worker.ts', import.meta.url), {
    type: 'module',
  })
}

function startThread1() {
  const worker = createWorker()
  worker.postMessage({ threads: 1 } satisfies WorkerMessage)
}

function startThread4() {
  const worker = createWorker()
  worker.postMessage({ threads: 4 } satisfies WorkerMessage)
}

function startWorkerN(processes: number) {
  for (let processIndex = 0; processIndex < processes; processIndex++) {
    const worker = createWorker()
    worker.postMessage({ processIndex, processes } satisfies WorkerMessage)
  }
}

function addButton(text: string, callback: VoidFunction) {
  const button = document.createElement('button')
  button.addEventListener('click', callback)
  button.textContent = text
  document.body.append(button)
}

addButton('Click to start 1 thread', startThread1)
addButton('Click to start 4 threads', startThread4)
addButton('Click to start 4 workers', () => startWorkerN(4))
addButton('Click to start 8 workers', () => startWorkerN(8))
addButton('Click to start 16 workers', () => startWorkerN(16))
