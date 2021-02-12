import { CandidateDto } from "../candidate.dto";

export interface GetAllCandidatesResponseDto {
    success: boolean,
    data: CandidateDto[]
}