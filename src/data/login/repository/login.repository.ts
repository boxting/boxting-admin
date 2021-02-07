import { ErrorMapper } from "../../error/error.mapper";
import AxiosService from '@/data/connection/axios.service';
import { LoginRequestDto } from "../api/dto/request/login.request.dto";
import { LoginResponseDto } from "../api/dto/response/login.response.dto";

export class LoginRepository {

    private static _instance: LoginRepository
    private _service: AxiosService

    constructor(service: AxiosService) {
        this._service = service
    }

    public static getInstance() {
        return this._instance || (this._instance = new this(AxiosService.getInstance()))
    }

    async login(request: LoginRequestDto): Promise<LoginResponseDto> {
        try {

            const res = await this._service.connection.post('/login/organizer', request);
            const loginResponseDto: LoginResponseDto = res.data

            return Promise.resolve(loginResponseDto);
        } catch (error) {

            let msg = ErrorMapper[error.error.errorCode] || ErrorMapper[500];

            return Promise.reject(msg);
        }
    }
}