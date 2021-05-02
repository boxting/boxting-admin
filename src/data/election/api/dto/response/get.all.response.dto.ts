import { EventStatusEnum } from "@/data/utils/event.status.enum";
import { ElectionDto } from "../election.dto";

export interface GetAllElectionsResponseDto {
    success: boolean,
    data: {
        eventStatus: EventStatusEnum,
        elements: ElectionDto[]
    }
}