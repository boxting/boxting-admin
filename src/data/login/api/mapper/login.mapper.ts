import { User } from "@/data/user/model/user.model";
import { LoginResponseDto } from "../dto/response/login.response.dto";

export function loginResponseDtoToUserMapper(response: LoginResponseDto): User {

    const user: User = {
        id: response.data.id,
        username: response.data.username,
        mail: response.data.mail,
        organizer: response.data.organizer,
        isActive: true,
    }

    return user
}