import AxiosService from '@/data/connection/axios.service';
import { ErrorMapper } from '../../error/error.mapper';
import { CreateRequestDto } from '../api/dto/request/create.request.dto';
import { UpdateRequestDto } from '../api/dto/request/update.request.dto';
import { CreateResponseDto } from '../api/dto/response/create.response.dto';
import { DeleteResponseDto } from '../api/dto/response/delete.response.dto';
import { GetAllResponseDto } from '../api/dto/response/get.all.response.dto';
import { GetOneResponseDto } from '../api/dto/response/get.one.response.dto';
import { UpdateResponseDto } from '../api/dto/response/update.response.dto';

export class EventRepository {

    private static _instance: EventRepository
    private _service: AxiosService

    constructor(service: AxiosService) {
        this._service = service
    }

    public static getInstance() {
        return this._instance || (this._instance = new this(AxiosService.getInstance()))
    }

    async getAll(): Promise<GetAllResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.get('/user/events')
            // Assign data to response dto
            const data: GetAllResponseDto = res.data
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

    async create(event: CreateRequestDto): Promise<CreateResponseDto> {

        try {
            // Make request
            const res = await this._service.connection.post('/event/create', event);
            // Assign data to response dto
            const data: CreateResponseDto = res.data
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

    async getOne(id: string): Promise<GetOneResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.get(`/event/id/${id}`);
            // Assign data to response dto
            const data: CreateResponseDto = res.data
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

    async delete(id: string): Promise<boolean> {
        try {
            // Make request
            const res = await this._service.connection.delete(`/event/id/${id}`);
            // Assign data to response dto
            const data: DeleteResponseDto = res.data
            // Return data
            return Promise.resolve(data.success);
        } catch (error) {
            // Log error for internal use
            console.log(error)
            // Set the message using the error mapper
            let msg = ErrorMapper[error.error.errorCode] || ErrorMapper[500];
            // Return the obtained message
            return Promise.reject(msg);
        }
    }

    async update(newEvent: UpdateRequestDto): Promise<boolean> {
        try {
            // Make request
            const res = await this._service.connection.put(`/event/id/${newEvent.id}`, newEvent);
            // Assign data to response dto
            const data: UpdateResponseDto = res.data
            // Return data
            return Promise.resolve(data.success);
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