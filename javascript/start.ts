import { pipeline, env } from '@xenova/transformers'

import data from '../data/transformers-input.json'

import type { WorkerMessage } from './types'

function wasmThreadsSupported() {
  return (
    typeof SharedArrayBuffer !== 'undefined' &&
    typeof Atomics !== 'undefined' &&
    typeof WebAssembly.Memory === 'function' &&
    new WebAssembly.Memory({ shared: true, initial: 1, maximum: 1 })
      .buffer instanceof SharedArrayBuffer
  )
}

console.log(
  wasmThreadsSupported()
    ? 'Wasm threads supported'
    : 'Wasm threads not supported',
)

export async function start(options?: WorkerMessage) {
  console.log('preparing', options)

  if (options?.threads) {
    env.backends.onnx.wasm.numThreads = options.threads
  }

  const processIndex = options?.processIndex
  const processes = options?.processes

  const extractor = await pipeline(
    'feature-extraction',
    'Xenova/all-MiniLM-L6-v2',
  )

  const extract = async (text: string) => {
    const result = await extractor(text, { pooling: 'mean', normalize: true })
    return result.data as Float32Array
  }

  console.log('start')

  let timeStart = 0

  const getTime = () => {
    return `${Math.floor((Date.now() - timeStart) / 1000)} seconds`
  }

  console.log('data', data.length)

  let index = 0
  for (const text of data) {
    index++

    if (
      processIndex != null &&
      processes != null &&
      index % processes !== processIndex
    ) {
      continue
    }

    const embedding = await extract(text)
    if (!timeStart) {
      timeStart = Date.now()
    }

    console.log(
      `index: ${index}; time: ${getTime()}; result length: ${embedding.length}`,
    )
  }

  console.log('end', getTime())
}
