import { ElectionDto } from "../election.dto";

export interface GetAllElectionsResponseDto {
    success: boolean,
    data: ElectionDto[]
}