import { AccessCode } from "../../access_code/model/access.code.model"
import { Election } from "../../election/model/election.model"
import { User } from "../../user/model/user.model"

export class Event {
    id: number
    name: string
    information: string
    startDate: Date
    endDate: Date
    code: String
    createdAt?: Date
    updatedAt?: Date
    users?: User[]
    accessCodes?: AccessCode[]
    elections?: Election[]
}