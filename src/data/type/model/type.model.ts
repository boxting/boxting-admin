import { Election } from "../../election/model/election.model"

export class Type {
    id: number
    name: string
    information: string
    createdAt?: Date
    updatedAt?: Date
    elections?: Election[]
}