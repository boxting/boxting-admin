import { EventStatusEnum } from "@/data/utils/event.status.enum"
import { List } from "../../list/model/list.model"
import { Type } from "../../type/model/type.model"

export class Election {
    id: number
    name: string
    information: string
    winners: number
    createdAt?: Date
    updatedAt?: Date
    eventId: number
    event?: Event
    typeId: number
    type?: Type
    lists?: List[]
    eventStatus?: EventStatusEnum
}