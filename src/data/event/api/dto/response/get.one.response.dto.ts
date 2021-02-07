import { EventDto } from "../event.dto";

export interface GetOneResponseDto {
    success: boolean,
    data: EventDto
}