export interface UpdateListRequestDto {
    id: number,
    name: string,
    information: string,
    electionId: number,
    imageUrl?: string
}