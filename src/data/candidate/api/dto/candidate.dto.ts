import { List } from "@/data/list/model/list.model";
import { EventStatusEnum } from "@/data/utils/event.status.enum";

export interface CandidateDto {
    id: number,
    firstName: string,
    lastName: string,
    information: string,
    age: number,
    imageUrl?: string,
    isActive: boolean,
    listId: number,
    electionId: number,
    createdAt?: Date,
    updatedAt?: Date,
    voteCount?: number
    list?: List,
    eventStatus?: EventStatusEnum
}
