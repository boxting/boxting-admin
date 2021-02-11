import { ListDto } from "../list.dto";

export interface GetAllListsResponseDto {
    success: boolean,
    data: ListDto[]
}