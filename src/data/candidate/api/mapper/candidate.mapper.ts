import { Candidate } from "../../model/candidate.model";
import { GetAllCandidatesResponseDto } from "../dto/response/get.all.response.dto";
import { GetOneCandidateResponseDto } from "../dto/response/get.one.response.dto";

export async function getAllToCandidateList(response: GetAllCandidatesResponseDto): Promise<Candidate[]> {

    const candidateList: Candidate[] = response.data.map((value) => {
        let candidate: Candidate = {
            id: value.id,
            information: value.information,
            firstName: value.firstName,
            lastName: value.lastName,
            age: value.age,
            isActive: value.isActive,
            electionId: value.electionId,
            imageUrl: value.imageUrl,
            listId: value.listId
        }
        return candidate
    })

    return candidateList
}

export async function getOneToCandidate(response: GetOneCandidateResponseDto): Promise<Candidate> {

    const candidate: Candidate = {
        id: response.data.id,
        information: response.data.information,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        age: response.data.age,
        isActive: response.data.isActive,
        electionId: response.data.electionId,
        imageUrl: response.data.imageUrl,
        listId: response.data.listId
    }

    return candidate
}