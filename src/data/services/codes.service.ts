import AxiosService from '@/data/services/service';
import Cookies from 'js-cookie';
import {ErrorMapper} from '../error/error.mapper'

const service = new AxiosService();

export class CodeService {

    static async createCodes(
        codes: string[],
        eventId: string
    ): Promise<any> {
        const token = Cookies.get(`token`);
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        try {
            const res = await service.connection.post(
                `accesscodes/token/event/${eventId}/create`,
                {
                    codes
                },
                config,
            );
            return Promise.resolve(res.data);
        } catch (error) {
            console.log(error)

            let msg = ErrorMapper[error.error.errorCode] || ErrorMapper[500];
            
            return Promise.reject(msg);
        }
    }

    static async updateCode(
        newCode: string,
        codeId: string,
        eventId: string
    ): Promise<any> {
        const token = Cookies.get(`token`);
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        try {
            const res = await service.connection.put(
                `accesscodes/token/event/${eventId}/update/${codeId}`,
                {
                    newCode
                },
                config,
            );
            return Promise.resolve(res.data);
        } catch (error) {
            console.log(error)

            let msg = ErrorMapper[error.error.errorCode] || ErrorMapper[500];
            
            return Promise.reject(msg);
        }
    }

    static async deleteCode(
        eventId: string,
        codeId: string
    ): Promise<any> {
        const token = Cookies.get(`token`);
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        try {
            const res = await service.connection.delete(
                `accesscodes/token/event/${eventId}/delete/${codeId}`,
                config,
            );
            return Promise.resolve(res.data);
        } catch (error) {
            console.log(error)

            let msg = ErrorMapper[error.error.errorCode] || ErrorMapper[500];
            
            return Promise.reject(msg);
        }
    }
}
