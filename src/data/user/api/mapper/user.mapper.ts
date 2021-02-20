import { User } from "../../model/user.model"
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