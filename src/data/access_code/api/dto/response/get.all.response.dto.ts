import { AccessCodeDto } from "../access.code.dto";

export interface GetAllCodesResponseDto{
    success: boolean,
    data: AccessCodeDto[]
}