import { EventStatusEnum } from "@/data/utils/event.status.enum"
import { Candidate } from "../../candidate/model/candidate.model"
import { Election } from "../../election/model/election.model"

export class List {
    id: number
    name: string
    information: string
    imageUrl?: string
    createdAt?: Date
    updatedAt?: Date
    electionId: number
    election?: Election
    candidates?: Candidate[]
    eventStatus?: EventStatusEnum
}