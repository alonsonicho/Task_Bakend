import type { Request, Response, NextFunction } from 'express';
import Task, { ITask } from '../models/Task';

declare global {
    namespace Express {
        interface Request {
            task: ITask; // Use the IProject because it extends Document
        }
    }
}


export async function validateTaskExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        if(!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        req.task = task;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error validating task existence'});
    }
}


export async function taskBelongsProject(req: Request, res: Response, next: NextFunction) {
    if (req.task.project.toString() !== req.project.id.toString()) {
        return res.status(403).json({ message: 'Forbidden action: Task does not belong to this project' });
    }
    next();
}