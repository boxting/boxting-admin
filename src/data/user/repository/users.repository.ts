import AxiosService from '@/data/connection/axios.service';
import { ErrorMapper } from '../../error/error.mapper';
import { GetAllUsersResponseDto } from '../api/dto/response/get.all.response.dto';

export class UserRepository {

    private static _instance: UserRepository
    private _service: AxiosService

    constructor(service: AxiosService) {
        this._service = service
    }

    public static getInstance() {
        return this._instance || (this._instance = new this(AxiosService.getInstance()))
    }

    async getAll(eventId: string, userType: 'collaborators' | 'voters'): Promise<GetAllUsersResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.get(`/event/${eventId}/${userType}`)
            // Assign data to response dto
            const data: GetAllUsersResponseDto = res.data
            // Return data
            return Promise.resolve(data);
        } catch (error) {
            // Log error for internal use
            console.log(error)
            // Set the message using the error mapper
            let msg = ErrorMapper[error.error.errorCode] || ErrorMapper[500];
            // Return the obtained message
            return Promise.reject(msg);
        }
    }
}