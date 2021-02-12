import AxiosService from '@/data/connection/axios.service';
import { ErrorMapper } from '../../error/error.mapper';
import { CreateCandidateRequestDto } from '../api/dto/request/create.request.dto';
import { UpdateCandidateRequestDto } from '../api/dto/request/update.request.dto';
import { CreateCandidateResponseDto } from '../api/dto/response/create.response.dto';
import { DeleteCandidateResponseDto } from '../api/dto/response/delete.response.dto';
import { GetAllCandidatesResponseDto } from '../api/dto/response/get.all.response.dto';
import { GetOneCandidateResponseDto } from '../api/dto/response/get.one.response.dto';
import { UpdateCandidateResponseDto } from '../api/dto/response/update.response.dto';

export class CandidateRepository {

    private static _instance: CandidateRepository
    private _service: AxiosService

    constructor(service: AxiosService) {
        this._service = service
    }

    public static getInstance() {
        return this._instance || (this._instance = new this(AxiosService.getInstance()))
    }

    async getAll(listId: string | number): Promise<GetAllCandidatesResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.get(`/candidate/list/${listId}`)
            // Assign data to response dto
            const data: GetAllCandidatesResponseDto = res.data
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

    async getAllByElection(electionId: string | number): Promise<GetAllCandidatesResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.get(`/candidate/election/${electionId}`)
            // Assign data to response dto
            const data: GetAllCandidatesResponseDto = res.data
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

    async create(listId: string | number, candidate: CreateCandidateRequestDto): Promise<CreateCandidateResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.post(`/candidate/list/${listId}`, candidate);
            // Assign data to response dto
            const data: CreateCandidateResponseDto = res.data
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

    async getOne(id: string | number, listId: string | number): Promise<GetOneCandidateResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.get(`/candidate/${id}/list/${listId}`);
            // Assign data to response dto
            const data: GetOneCandidateResponseDto = res.data
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

    async getOneByElection(id: string | number, electionId: string | number): Promise<GetOneCandidateResponseDto> {
        try {
            // Make request
            const res = await this._service.connection.get(`/candidate/${id}/election/${electionId}`);
            // Assign data to response dto
            const data: GetOneCandidateResponseDto = res.data
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

    async delete(id: string | number, listId: string | number): Promise<boolean> {
        try {
            // Make request
            const res = await this._service.connection.delete(`/candidate/${id}/list/${listId}`);
            // Assign data to response dto
            const data: DeleteCandidateResponseDto = res.data
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

    async deleteByElection(id: string | number, electionId: string | number): Promise<boolean> {
        try {
            // Make request
            const res = await this._service.connection.delete(`/candidate/${id}/election/${electionId}`);
            // Assign data to response dto
            const data: DeleteCandidateResponseDto = res.data
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

    async update(newCandidate: UpdateCandidateRequestDto): Promise<boolean> {
        try {
            // Make request
            const res = await this._service.connection.put(
                `/candidate/${newCandidate.id}/list/${newCandidate.listId}`, newCandidate);
            // Assign data to response dto
            const data: UpdateCandidateResponseDto = res.data
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

    async updateByElection(newCandidate: UpdateCandidateRequestDto): Promise<boolean> {
        try {
            // Make request
            const res = await this._service.connection.put(
                `/candidate/${newCandidate.id}/election/${newCandidate.electionId}`, newCandidate);
            // Assign data to response dto
            const data: UpdateCandidateResponseDto = res.data
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