export interface AccessCodeDto{
    id: number,
    code: string,
    used: boolean,
    eventId: number,
    createdAt?: string,
    updatedAt?: string
}