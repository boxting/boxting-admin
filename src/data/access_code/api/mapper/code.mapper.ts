import { AccessCode } from "../../model/access.code.model";
import { CreateCodesResponseDto } from "../dto/response/create.response.dto";
import { GetAllCodesResponseDto } from "../dto/response/get.all.response.dto";

export async function getAllToCodesList(response: GetAllCodesResponseDto): Promise<AccessCode[]> {

    const codeList: AccessCode[] = response.data.map((value) => {
        let code: AccessCode = {
            id: value.id,
            code: value.code,
            used: value.used,
            eventId: value.eventId
        }
        return code
    })

    return codeList
}

export async function createToCodesList(response: CreateCodesResponseDto): Promise<AccessCode[]> {

    const codeList: AccessCode[] = response.data.map((value) => {
        let code: AccessCode = {
            id: value.id,
            code: value.code,
            used: value.used,
            eventId: value.eventId
        }
        return code
    })

    return codeList
}