import { start } from './start'
import type { WorkerMessage } from './types'

addEventListener('message', (message) => {
  const options = message.data as WorkerMessage
  console.log('web-worker received message:', options)

  start(options)
})
