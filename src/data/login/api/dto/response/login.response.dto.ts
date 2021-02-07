interface LoginResponseDataDto {
    id: number,
    username: string,
    mail: string,
    role: {
        name: string
    },
    organizer: {
        id: number,
        name: string
    }
    token: string,
    refreshToken: string
}

export interface LoginResponseDto {
    success: boolean,
    data: LoginResponseDataDto
}