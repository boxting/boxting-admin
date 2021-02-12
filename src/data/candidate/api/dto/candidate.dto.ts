import { List } from "@/data/list/model/list.model";

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
    list?: List
}
