import { EventDto } from "../event.dto";

export interface CreateResponseDto {
    success: boolean,
    data: EventDto
}