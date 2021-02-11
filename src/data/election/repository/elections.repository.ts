import AxiosService from '@/data/connection/axios.service';
import { ErrorMapper } from '../../error/error.mapper';
import { CreateElectionRequestDto } from '../api/dto/request/create.request.dto';
import { UpdateElectionRequestDto } from '../api/dto/request/update.request.dto';
import { CreateElectionResponseDto } from '../api/dto/response/create.response.dto';
import { DeleteElectionResponseDto } from '../api/dto/response/delete.response.dto';
import { GetAllElectionsResponseDto } from '../api/dto/response/get.all.response.dto';
import { GetOneElectionResponseDto } from '../api/dto/response/get.one.response.dto';
import { UpdateElectionResponseDto } from '../api/dto/response/update.response.dto';

export class ElectionRepository {

    private static _instance: ElectionRepository
    private _service: AxiosService

    constructor(service: AxiosService) {
        this._service = service
    }

    public static getInstance() {
        return this._instance || (this._instance = new this(AxiosService.getInstance()))
    }

    async getAll(eventId: string | number): Promise<GetAllElectionsResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.get(`/election/event/${eventId}`)
            // Assign data to response dto
            const data: GetAllElectionsResponseDto = res.data
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

    async create( eventId: string | number, election: CreateElectionRequestDto): Promise<CreateElectionResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.post(`/election/event/${eventId}`, election);
            // Assign data to response dto
            const data: CreateElectionResponseDto = res.data
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

    async getOne(id: string | number, eventId: string | number): Promise<GetOneElectionResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.get(`/election/${id}/event/${eventId}`);
            // Assign data to response dto
            const data: GetOneElectionResponseDto = res.data
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

    async delete(id: string | number, eventId: string | number): Promise<boolean> {
        try {
            // Make request
            const res = await this._service.connection.delete(`/election/${id}/event/${eventId}`);
            // Assign data to response dto
            const data: DeleteElectionResponseDto = res.data
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

    async update(newElection: UpdateElectionRequestDto): Promise<boolean> {
        try {
            // Make request
            const res = await this._service.connection.put(`/election/${newElection.id}/event/${newElection.eventId}`, newElection);
            // Assign data to response dto
            const data: UpdateElectionResponseDto = res.data
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