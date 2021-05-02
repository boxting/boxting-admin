import { EventStatusEnum } from "@/data/utils/event.status.enum";

export interface ListDto {
    id: number,
    name: string,
    information: string,
    electionId: number,
    imageUrl?: string,
    createdAt?: Date,
    updatedAt?: Date,
    eventStatus?: EventStatusEnum
}
