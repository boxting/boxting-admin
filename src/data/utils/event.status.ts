import { Event } from "@/data/event/model/event.model";
import { colors } from "@material-ui/core";
import moment from "moment";
import { EventStatusEnum } from "./event.status.enum";

export function getEventStatus(event: Event): EventStatusEnum {

    // Handle event dates
    const startDateMoment = moment(event.startDate, 'DD/MM/YYYY HH:mm:SS')
    const endDateMoment = moment(event.endDate, 'DD/MM/YYYY HH:mm:SS')

    // Validate if event is in progress
    if (moment().isBetween(startDateMoment, endDateMoment)) {
        return EventStatusEnum.IN_PROGRESS
    }

    if (moment().isAfter(endDateMoment)) {
        return EventStatusEnum.ENDED
    }

    if (event.configCompleted) {
        return EventStatusEnum.EDITION_CLOSED
    }

    if (moment().isBefore(startDateMoment)) {
        return EventStatusEnum.NOT_STARTED
    }
}

export function eventStatusMapper(status: EventStatusEnum): string {

    let strStatus = ''

    switch (status) {
        case EventStatusEnum.IN_PROGRESS:
            strStatus = "En progreso"
            break;
        case EventStatusEnum.ENDED:
            strStatus = "Finalizado"
            break;
        case EventStatusEnum.NOT_STARTED:
            strStatus = "No iniciado"
            break;
        case EventStatusEnum.EDITION_CLOSED:
            strStatus = "Edición completa"
            break;
        default:
            strStatus = "No iniciado"
            break;
    }

    return strStatus
}

export function eventStatusColorMapper(status: EventStatusEnum): string {

    let strStatus = ''

    switch (status) {
        case EventStatusEnum.IN_PROGRESS:
            strStatus = "#009416"
            break;
        case EventStatusEnum.ENDED:
            strStatus = "#6200EE"
            break;
        case EventStatusEnum.NOT_STARTED:
            strStatus = "#000000"
            break;
        case EventStatusEnum.EDITION_CLOSED:
            strStatus = "#d48a1c"
            break;
        default:
            strStatus = "#000000"
            break;
    }

    return strStatus
}