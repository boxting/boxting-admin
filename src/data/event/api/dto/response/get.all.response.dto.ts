import { EventDto } from "../event.dto";

export interface GetAllResponseDto {
    success: boolean,
    data: EventDto[]
}