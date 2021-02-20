import { User } from "../../model/user.model"
import { CreateUserResponseDto } from "../dto/response/create.response.dto"
import { GetAllUsersResponseDto } from "../dto/response/get.all.response.dto"

export async function getAllToUserList(response: GetAllUsersResponseDto): Promise<User[]> {

    const userList: User[] = response.data.map((value) => {
        let user: User = {
            id: value.id,
            isActive: value.isActive,
            mail: value.mail,
            username: value.username,
            voter: value.voter,
            organizer: value.organizer
        }
        return user
    })

    return userList
}

export async function createToUserMapper(response: CreateUserResponseDto): Promise<User> {

    let user: User = {
        id: response.data.id,
        isActive: response.data.isActive,
        mail: response.data.mail,
        username: response.data.username,
        voter: response.data.voter,
        organizer: response.data.organizer
    }

    return user
}