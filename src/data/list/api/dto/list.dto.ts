export interface ListDto {
    id: number,
    name: string,
    information: string,
    electionId: number,
    imageUrl?: string,
    createdAt?: Date,
    updatedAt?: Date
}
