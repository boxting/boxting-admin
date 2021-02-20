export interface CreateCollaboratorRequestDto{
    username: string,
    password: string,
    mail: string,
    organizer: {
        name: string
    }
}