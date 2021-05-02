import { EventStatusEnum } from "@/data/utils/event.status.enum";

export interface EventDto {
    id: number,
    name: string,
    information: string,
    startDate: string,
    endDate: string,
    code: string,
    createdAt?: Date,
    updatedAt?: Date,
    configCompleted: boolean
    eventStatus: EventStatusEnum
}