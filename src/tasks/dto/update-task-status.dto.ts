import { IsEnum } from "class-validator";
import { TaskStatus } from "../tasks.types";

export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}