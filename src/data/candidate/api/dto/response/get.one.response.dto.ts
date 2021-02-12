import { CandidateDto } from "../candidate.dto";

export interface GetOneCandidateResponseDto {
    success: boolean,
    data: CandidateDto
}