import { CandidateDto } from "../candidate.dto";

export interface CreateCandidateResponseDto {
    success: boolean,
    data: CandidateDto
}