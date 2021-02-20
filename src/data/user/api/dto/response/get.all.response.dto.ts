import { UserDto } from "../user.dto";

export interface GetAllUsersResponseDto{
    success: boolean,
    data: UserDto[]
}