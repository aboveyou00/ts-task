import autoLoad = require('auto-load');
import { Task } from './task';
import find = require('lodash.find');

export class TaskRunner {
    constructor() { }
    
    loadTasks(tasksDir: string) {
        let tasks_exports = autoLoad(tasksDir);
        let tasks: Task<any>[] = [];
        
        for (let key in tasks_exports) {
            if (tasks_exports.hasOwnProperty(key)) {
                for (let exported_key in tasks_exports[key]) {
                    if (tasks_exports[key].hasOwnProperty(exported_key)) {
                        let t = tasks_exports[key][exported_key];
                        if (t instanceof Task) tasks.push(t);
                    }
                }
            }
        }
        
        if (!tasks.length) {
            console.warn(`Warning: no tasks detected in ${tasksDir}`);
        }
        
        for (let q = 0; q < tasks.length; q++) {
            let task = tasks[q];
            let collision = this.findTask(task.name);
            if (collision) throw new Error(`Duplicate task detected: ${task.name}.`);
            this.tasks.push(task);
        }
    }
    
    findTask(taskName: string): Task<any> | undefined {
        return find(this.tasks, t => t.name == taskName);
    }
    
    runTask(taskName: string, ...taskArgs: any[]) {
        if (!taskName) throw new Error(`No task specified`);
        let task = this.findTask(taskName);
        if (!task) throw new Error(`Could not find the task: ${taskName}`);
        return task.start(...taskArgs);
    }
    
    private tasks: Task<any>[] = [];
}
