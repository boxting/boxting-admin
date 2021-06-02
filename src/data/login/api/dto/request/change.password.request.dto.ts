export interface ChangePasswordRequestDto {
    mail: string,
    token: string,
    newPassword: string
}