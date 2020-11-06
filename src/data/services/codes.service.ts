import AxiosService from '@/data/services/service';
import Cookies from 'js-cookie';

const service = new AxiosService();

export class CodeService {

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
      let msg = ``;
      if (error.error.statusCode == 400 || error.error.statusCode == 403) {
        msg = `No se pudo eliminar el código de acceso de votación.`;
      } else {
        msg = `Ocurrió un error en el sistema`;
      }
      return Promise.reject(msg);
    }
  }
}
