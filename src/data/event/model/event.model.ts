import { AccessCode } from "../../access_code/model/access.code.model"
import { Election } from "../../election/model/election.model"
import { User } from "../../user/model/user.model"
import { EventStatusEnum } from "../../utils/event.status.enum"

export class Event {
    id: number
    name: string
    information: string
    startDate: Date
    endDate: Date
    code: string
    createdAt?: Date
    updatedAt?: Date
    users?: User[]
    accessCodes?: AccessCode[]
    elections?: Election[]
    configCompleted: boolean
    eventStatus: EventStatusEnum
}