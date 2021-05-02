import { List } from "@/data/list/model/list.model"
import { EventStatusEnum } from "@/data/utils/event.status.enum"

export class Candidate {
    id: number
    firstName: string
    lastName: string
    information: string
    age: number
    imageUrl?: string
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
    listId?: number
    electionId?: number
    list?: List
    eventStatus?: EventStatusEnum
}