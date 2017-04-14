

export class Task {
    constructor(name: string, task: (...args: string[]) => void) {
        this._name = name;
        this._task = task;
    }
    
    private _name: string;
    get name() {
        return this._name;
    }
    
    private _task: (...args: string[]) => void;
    start(...args: string[]) {
        this._task(...args);
    }
}
