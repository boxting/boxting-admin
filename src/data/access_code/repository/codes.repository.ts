import AxiosService from '@/data/connection/axios.service';
import Cookies from 'js-cookie';
import {ErrorMapper} from '../../error/error.mapper'
import { CreateCodesRequestDto } from '../api/dto/request/create.request.dto';
import { UpdateCodeRequestDto } from '../api/dto/request/update.request.dto';
import { CreateCodesResponseDto } from '../api/dto/response/create.response.dto';
import { DeleteCodeResponseDto } from '../api/dto/response/delete.response.dto';
import { GetAllCodesResponseDto } from '../api/dto/response/get.all.response.dto';
import { UpdateCodeResponseDto } from '../api/dto/response/update.response.dto';

const service = new AxiosService();

export class CodeRepository {

    private static _instance: CodeRepository
    private _service: AxiosService

    constructor(service: AxiosService) {
        this._service = service
    }

    public static getInstance() {
        return this._instance || (this._instance = new this(AxiosService.getInstance()))
    }

    async getAll(eventId: string | number): Promise<GetAllCodesResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.get(`/code/event/${eventId}/all`)
            // Assign data to response dto
            const data: GetAllCodesResponseDto = res.data
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

    async create(req: CreateCodesRequestDto): Promise<CreateCodesResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.post(`/code/event/${req.eventId}/create`, req);
            // Assign data to response dto
            const data: CreateCodesResponseDto = res.data
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

    async delete(codeId: string | number, eventId: string | number): Promise<boolean> {
        try {
            // Make request
            const res = await this._service.connection.delete(`/code/event/${eventId}/id/${codeId}`);
            // Assign data to response dto
            const data: DeleteCodeResponseDto = res.data
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

    async update(req: UpdateCodeRequestDto): Promise<boolean> {
        try {
            // Make request
            const res = await this._service.connection.put(`/code/event/${req.eventId}/id/${req.codeId}`, req);
            // Assign data to response dto
            const data: UpdateCodeResponseDto = res.data
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
