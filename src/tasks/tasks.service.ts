import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.types';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';


@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private taskRepository: TasksRepository
    ) { }
    getTasks(filterDto: GetTasksFilterDto) {
        return this.taskRepository.getTasks(filterDto);
    }


    createTask(createTaskDto: CreateTaskDto) {
        return this.taskRepository.createTask(createTaskDto);
    }

    async getTaskById(id: string) {
        const task = await this.taskRepository.findOne(id)
        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return task;
    }

    async deleteTaskById(id: string) {
        const res = await this.taskRepository.delete(id);
        if (res.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus) {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }
}
