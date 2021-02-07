import { AccessCodeDto } from "../access.code.dto";

export interface CreateCodesResponseDto {
    success: boolean,
    data: AccessCodeDto[]
}