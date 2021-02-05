import { Event } from "./event.model"
import { Organizer } from "./organizer.model"
import { Voter } from "./voter.model"

export class User {
    username!: string
    password!: string
    mail!: string
    isActive!: boolean
    createdAt!: Date
    updatedAt!: Date
    roleId!: number
    voter?: Voter
    organizer?: Organizer
    events?: Event[]  
}