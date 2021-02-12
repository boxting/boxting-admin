import { List } from "@/data/list/model/list.model"

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
}