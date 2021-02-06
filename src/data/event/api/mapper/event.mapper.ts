import { Event } from "../../model/event.model";
import { GetAllResponseDto } from "../dto/response/get.all.response.dto";
import { GetOneResponseDto } from "../dto/response/get.one.response.dto";

export async function getAllToEventList(response: GetAllResponseDto): Promise<Event[]> {

    const eventList: Event[] = response.data.map((value) => {
        let event: Event = {
            id: value.id,
            code: value.code,
            endDate: new Date(value.endDate),
            startDate: new Date(value.startDate),
            information: value.information,
            name: value.name,
        }
        return event
    })

    return eventList
}

export async function getOneToEvent(response: GetOneResponseDto): Promise<Event> {

    const event: Event = {
        id: response.data.id,
        code: response.data.code,
        endDate: new Date(response.data.endDate),
        startDate: new Date(response.data.startDate),
        information: response.data.information,
        name: response.data.name
    }

    return event
}