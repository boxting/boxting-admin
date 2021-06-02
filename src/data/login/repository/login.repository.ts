import { ErrorMapper } from "../../error/error.mapper";
import AxiosService from '@/data/connection/axios.service';
import { LoginRequestDto } from "../api/dto/request/login.request.dto";
import { LoginResponseDto } from "../api/dto/response/login.response.dto";
import { ForgotPasswordRequestDto } from "../api/dto/request/forgot.password.request.dto";
import { ValidateTokenRequestDto } from "../api/dto/request/validate.token.request.dto";
import { ChangePasswordRequestDto } from "../api/dto/request/change.password.request.dto";

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

    async logout(refreshToken: string): Promise<boolean> {
        try {
            await this._service.connection.delete(`/login/close/${refreshToken}`);

            return Promise.resolve(true);
        } catch (error) {

            let msg = ErrorMapper[error.error.errorCode] || ErrorMapper[500];

            return Promise.reject(msg);
        }
    }

    async forgotPassword(request: ForgotPasswordRequestDto): Promise<boolean> {
        try {
            await this._service.connection.post(`/login/forgot/password`, request);

            return Promise.resolve(true);
        } catch (error) {

            let msg = ErrorMapper[error.error.errorCode] || ErrorMapper[500];

            return Promise.reject(msg);
        }
    }

    async validatePasswordToken(request: ValidateTokenRequestDto): Promise<boolean> {
        try {
            await this._service.connection.post(`/login/validate/password-token`, request);

            return Promise.resolve(true);
        } catch (error) {

            let msg = ErrorMapper[error.error.errorCode] || ErrorMapper[500];

            return Promise.reject(msg);
        }
    }

    async setNewPassword(request: ChangePasswordRequestDto): Promise<boolean> {
        try {
            await this._service.connection.post(`/login/set/password`, request);

            return Promise.resolve(true);
        } catch (error) {

            let msg = ErrorMapper[error.error.errorCode] || ErrorMapper[500];

            return Promise.reject(msg);
        }
    }
}