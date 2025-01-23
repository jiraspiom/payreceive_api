import type { ILogger } from '../interfaces/ILogger.js'

export class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(`[LOG]: ${message}`)
  }
}
