export interface VoterDto{
    id: number,
    firstName: string,
    lastName: string,
    dni: string,
    phone: string,
    age: number,
    birthday: Date
}

export interface OrganizerDto{
    id: number,
    name: string
}

export interface RoleDto{
    name: string
}

export interface UserDto{
    id: number,
    username: string,
    mail: string,
    isActive: boolean,
    roleId: number
    role?: RoleDto,
    voter?: VoterDto,
    organizer?: OrganizerDto
}