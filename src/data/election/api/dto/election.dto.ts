import { EventStatusEnum } from "@/data/utils/event.status.enum";

export interface ElectionDto {
    id: number,
    name: string,
    information: string,
    winners: number,
    eventId: number,
    typeId: number,
    createdAt?: Date,
    updatedAt?: Date
    eventStatus?: EventStatusEnum
}
