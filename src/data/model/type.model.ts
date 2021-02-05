import { Election } from "./election.model"

export class Type {
    name!: string
    information!: string
    createdAt?: Date
    updatedAt?: Date
    elections?: Election[]
}