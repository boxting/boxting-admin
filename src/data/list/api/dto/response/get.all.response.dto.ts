import { EventStatusEnum } from "@/data/utils/event.status.enum";
import { ListDto } from "../list.dto";

export interface GetAllListsResponseDto {
    success: boolean,
    data: {
        eventStatus: EventStatusEnum,
        elements: ListDto[]
    }
}