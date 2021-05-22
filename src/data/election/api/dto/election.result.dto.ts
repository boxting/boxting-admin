import { CandidateDto } from "@/data/candidate/api/dto/candidate.dto";

type CandidateResult = {
    id: string,
    firstName: string,
    lastName: string,
    imageUrl?: string,
    electionId: string,
    voteCount?: number
}

export interface ElectionResultDto {
    election: {
        id: string,
        name: string
    },
    totalVotes: number,
    candidates: CandidateResult[]
}
