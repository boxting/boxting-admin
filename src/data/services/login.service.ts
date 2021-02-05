import { ErrorMapper } from "../error/error.mapper";
import AxiosService from '@/data/connection/axios.service';

export class LoginService {

    private static _instance: LoginService
    private _service: AxiosService

    constructor(service: AxiosService) {
        this._service = service
    }

    public static getInstance() {
        return this._instance || (this._instance = new this(AxiosService.getInstance()))
    }

    async login(username: string, password: string): Promise<any> {
        try {
            const res = await this._service.connection.post('/login/organizer', {
                username,
                password,
            });

            return Promise.resolve(res.data);
        } catch (error) {

            let msg = ErrorMapper[error.error.errorCode] || ErrorMapper[500];

            return Promise.reject(msg);
        }
    }
}