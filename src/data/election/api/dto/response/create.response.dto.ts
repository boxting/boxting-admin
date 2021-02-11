import { ElectionDto } from "../election.dto";

export interface CreateElectionResponseDto {
    success: boolean,
    data: ElectionDto
}