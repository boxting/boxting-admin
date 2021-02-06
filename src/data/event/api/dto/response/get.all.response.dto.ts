import { EventDto } from "../evento.dto";

export interface GetAllResponseDto {
    success: boolean,
    data: EventDto[]
}