import { Event } from "./event.model"

export class AccessCode {
    code!: string
    used!: boolean
    createdAt?: Date
    updatedAt?: Date
    eventId?: number
    event?: Event
}