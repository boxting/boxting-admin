export interface CreateCandidateRequestDto {
    firstName: string,
    lastName: string,
    information: string,
    age: number,
    imageUrl?: string,
    isActive: boolean,
    listId: number,
    electionId: number
}