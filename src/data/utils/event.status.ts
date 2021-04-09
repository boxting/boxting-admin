import { Event } from "@/data/event/model/event.model";
import moment from "moment";
import { EventStatusEnum } from "./event.status.enum";

export default function getEventStatus(event: Event): EventStatusEnum {

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