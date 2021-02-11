import AxiosService from '@/data/connection/axios.service';
import { ErrorMapper } from '../../error/error.mapper';
import { CreateListRequestDto } from '../api/dto/request/create.request.dto';
import { UpdateListRequestDto } from '../api/dto/request/update.request.dto';
import { CreateListResponseDto } from '../api/dto/response/create.response.dto';
import { DeleteListResponseDto } from '../api/dto/response/delete.response.dto';
import { GetAllListsResponseDto } from '../api/dto/response/get.all.response.dto';
import { GetOneListResponseDto } from '../api/dto/response/get.one.response.dto';
import { UpdateListResponseDto } from '../api/dto/response/update.response.dto';

export class ListRepository {

    private static _instance: ListRepository
    private _service: AxiosService

    constructor(service: AxiosService) {
        this._service = service
    }

    public static getInstance() {
        return this._instance || (this._instance = new this(AxiosService.getInstance()))
    }

    async getAll(electionId: string | number): Promise<GetAllListsResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.get(`/list/election/${electionId}`)
            // Assign data to response dto
            const data: GetAllListsResponseDto = res.data
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

    async create( electionId: string | number, list: CreateListRequestDto): Promise<CreateListResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.post(`/list/election/${electionId}`, list);
            // Assign data to response dto
            const data: CreateListResponseDto = res.data
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

    async getOne(id: string | number, electionId: string | number): Promise<GetOneListResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.get(`/list/${id}/election/${electionId}`);
            // Assign data to response dto
            const data: GetOneListResponseDto = res.data
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

    async delete(id: string | number, electionId: string | number): Promise<boolean> {
        try {
            // Make request
            const res = await this._service.connection.delete(`/list/${id}/election/${electionId}`);
            // Assign data to response dto
            const data: DeleteListResponseDto = res.data
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

    async update(newList: UpdateListRequestDto): Promise<boolean> {
        try {
            // Make request
            const res = await this._service.connection.put(`/list/${newList.id}/election/${newList.electionId}`, newList);
            // Assign data to response dto
            const data: UpdateListResponseDto = res.data
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