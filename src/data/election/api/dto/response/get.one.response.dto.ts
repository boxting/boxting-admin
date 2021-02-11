import { ElectionDto } from "../election.dto";

export interface GetOneElectionResponseDto {
    success: boolean,
    data: ElectionDto
}