import { User } from "@/data/user/model/user.model";

export interface CreateUserResponseDto{
    success: boolean,
    data: User
}