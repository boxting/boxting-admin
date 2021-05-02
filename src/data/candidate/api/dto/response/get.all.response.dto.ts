import { EventStatusEnum } from "@/data/utils/event.status.enum";
import { CandidateDto } from "../candidate.dto";

export interface GetAllCandidatesResponseDto {
    success: boolean,
    data: {
        eventStatus: EventStatusEnum
        elements: CandidateDto[]
    }
}