export interface CreateElectionRequestDto {
    name: string,
    information: string,
    typeId: number,
    winners: number
}