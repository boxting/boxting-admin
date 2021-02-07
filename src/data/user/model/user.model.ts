import { Event } from "../../event/model/event.model"
import { Organizer } from "./organizer.model"
import { Voter } from "./voter.model"

export class User {
    id: number
    username: string
    mail: string
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
    voter?: Voter
    organizer?: Organizer
    events?: Event[]  
}