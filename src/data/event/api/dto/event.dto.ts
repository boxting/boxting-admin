export interface EventDto {
    id: number,
    name: string,
    information: string,
    startDate: Date,
    endDate: Date,
    code: string,
    createdAt?: Date,
    updatedAt?: Date
}