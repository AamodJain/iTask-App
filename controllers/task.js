import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        let task = new Task({ title, description, user: req.user })
        task.save();
        res
            .status(201)
            .json({ success: true, message: "new task added successfully" })

    } catch (error) {
        next(error)
    }
}

export const myTasks = async (req, res, next) => {
    try {
        const user = req.user;
        let tasks = await Task.find({ user });
        res
            .status(200)
            .json({ success: true, tasks })
    } catch (error) {
        next(error)
    }
}

export const toggleIsDone = async (req, res, next) => {
    try {
        const id = req.params.id;
        let task = await Task.findById(id);
        task.isDone = !task.isDone;
        task.save()
        res
            .status(201)
            .json({ success: true, message: 'task updated successfully' })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        let task = await Task.findById(req.params.id);
        await task.deleteOne();
        res
            .status(201)
            .json({ success: true, message: 'task deleted successfully' })
    } catch (error) {
        next(error)
    }
}

export const editTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        res
            .status(200)
            .json({ success: true, task })
    } catch (error) {
        next(error)
    }
}

