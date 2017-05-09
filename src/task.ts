

export class Task<T> {
    constructor(public readonly name: string, private task: (...args: string[]) => Promise<T>) {
    }
    
    async start(...args: string[]): Promise<T> {
        return await this.task(...args);
    }
}
