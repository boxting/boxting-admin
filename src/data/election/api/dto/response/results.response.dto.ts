import { ElectionResultDto } from "../election.result.dto";

export interface GetResultsResponseDto {
    success: boolean,
    data: ElectionResultDto
}