export interface UpdateElectionRequestDto {
    id: string,
    eventId: number
    name: string,
    information: string,
    typeId: number,
    winners: number
}