import { ListDto } from "../list.dto";

export interface CreateListResponseDto {
    success: boolean,
    data: ListDto
}