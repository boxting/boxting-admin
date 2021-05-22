import { CandidateDto } from "@/data/candidate/api/dto/candidate.dto";

export interface ElectionResultDto {
    election: {
        id: string,
        name: string
    },
    totalVotes: number,
    candidates: CandidateDto[]
}
