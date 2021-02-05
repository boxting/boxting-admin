import { ErrorMapper } from "../../error/error.mapper";
import AxiosService from '@/data/connection/axios.service';
import { LoginRequest } from "../api/request/login.request";
import { LoginResponse } from "../api/response/login.response";

export class LoginRepository {

    private static _instance: LoginRepository
    private _service: AxiosService

    constructor(service: AxiosService) {
        this._service = service
    }

    public static getInstance() {
        return this._instance || (this._instance = new this(AxiosService.getInstance()))
    }

    async login(request: LoginRequest): Promise<LoginResponse> {
        try {

            const res = await this._service.connection.post('/login/organizer', request);
            const loginResponse: LoginResponse = res.data

            return Promise.resolve(loginResponse);
        } catch (error) {

            let msg = ErrorMapper[error.error.errorCode] || ErrorMapper[500];

            return Promise.reject(msg);
        }
    }
}