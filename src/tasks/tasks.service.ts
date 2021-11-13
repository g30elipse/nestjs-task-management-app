import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.types';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { User } from 'src/auth/user.entity';


@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private taskRepository: TasksRepository
    ) { }

    getTasks(filterDto: GetTasksFilterDto, user: User) {
        return this.taskRepository.getTasks(filterDto, user);
    }


    createTask(createTaskDto: CreateTaskDto, user: User) {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async getTaskById(id: string, user: User) {
        const task = await this.taskRepository.findOne(id, { where: { user: user } });
        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return task;
    }

    async deleteTaskById(id: string, user: User) {
        const res = await this.taskRepository.delete({ id, user });
        if (res.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus, user: User) {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }
}
