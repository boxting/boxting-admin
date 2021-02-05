import { User } from "@/data/model/user.model";
import { LoginResponse } from "../response/login.response";

export function loginResponseToUserMapper(response: LoginResponse): User {

    const user: User = {
        id: response.data.id,
        username: response.data.username,
        mail: response.data.mail,
        organizer: response.data.organizer,
        isActive: true,
    }

    return user
}