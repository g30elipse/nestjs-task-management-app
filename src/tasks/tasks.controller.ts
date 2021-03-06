import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query() tasksFilterDto: GetTasksFilterDto, @GetUser() user: User) {
        return this.taskService.getTasks(tasksFilterDto, user);
    }


    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
        return this.taskService.createTask(createTaskDto, user);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string, @GetUser() user: User) {
        return this.taskService.getTaskById(id, user);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string, @GetUser() user: User) {
        return this.taskService.deleteTaskById(id, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto, @GetUser() user: User) {
        return this.taskService.updateTaskStatus(id, updateTaskStatusDto.status, user);
    }


}
