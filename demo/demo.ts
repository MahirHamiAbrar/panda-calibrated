/**
 * Panda Calibrated Theme - TypeScript Showcase
 * Precision semantic token highlighting over a soft charcoal canvas.
 */

import { createHash, randomUUID } from 'node:crypto';
import { EventEmitter } from 'node:events';

// Constants, Enums & Regular Expressions (#FFB86C & #45A9F9)
export const MAX_QUEUE_SIZE: number = 1_000_000;
export const API_REGEX: RegExp = /^https?:\/\/[a-z0-9.-]+\.[a-z]{2,}$/gi;

export enum TaskStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
}

// Interfaces & Generic Types (#FFCC95 & #FFE3B0)
export interface TaskConfig<T> {
  readonly id: string;
  name: string;
  payload: T;
  retries?: number;
}

export type TaskResult<T> =
  | { success: true; data: T; timestamp: number }
  | { success: false; error: string; timestamp: number };

// Class with Storage Modifiers, Generics & Arrow Functions
export class TaskRunner<T extends Record<string, unknown>> extends EventEmitter {
  private readonly config: TaskConfig<T>; // Property (#FF9AC1)
  public status: TaskStatus = TaskStatus.IDLE;

  constructor(config: TaskConfig<T>) {
    super();
    this.config = config; // Special variable: this (#FF75B5 Italic)
  }

  // Method call, async/await, template string & escape sequence
  public async execute(input: T): Promise<TaskResult<T>> {
    this.status = TaskStatus.RUNNING;
    const startTime: number = Date.now(); // Builtin function call (#45A9F9)

    try {
      if (!input || typeof input !== 'object') {
        throw new Error('Invalid payload received');
      }

      const hash: string = createHash('sha256')
        .update(JSON.stringify(input))
        .digest('hex');

      // Escapes (\x1b[36m), template strings (${...}) & Builtin console.log (#45A9F9 Italic)
      console.log(`\x1b[36m[RUNNER]\x1b[0m Executed task ${this.config.id} (${hash.slice(0, 7)})`);
      this.status = TaskStatus.COMPLETED;

      return { success: true, data: input, timestamp: Date.now() - startTime };
    } catch (err) {
      this.status = TaskStatus.COMPLETED;
      const message: string = err instanceof Error ? err.message : String(err);
      return { success: false, error: message, timestamp: Date.now() - startTime };
    }
  }
}

// Execution trigger
const runner = new TaskRunner<Record<string, string>>({
  id: randomUUID(),
  name: 'Demo-Worker',
  payload: { key: 'value' },
});
runner.execute({ key: 'panda-calibrated' }).then(console.log);
