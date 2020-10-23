import AxiosService from '@/data/services/service';
import Cookies from 'js-cookie';

const service = new AxiosService();

export class EventService {
  static async createEvent(
    name: string,
    information: string,
    startDate: string,
    endDate: string,
  ): Promise<any> {
    const token = Cookies.get(`token`);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const res = await service.connection.post(
        `event/token/create`,
        {
          name,
          information,
          startDate,
          endDate,
        },
        config,
      );
      return Promise.resolve(res.data);
    } catch (error) {
      let msg = ``;

      if (error.error.statusCode == 400 || error.error.statusCode == 403) {
        msg = `No se pudo crear un nuevo evento de votación`;
      } else {
        msg = `Ocurrió un error en el sistema`;
      }
      return Promise.reject(msg);
    }
  }

  static async read(): Promise<Array<any>> {
    const token = Cookies.get(`token`);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const res = await service.connection.get(`user/token/events/get`, config);
      return Promise.resolve(res.data);
    } catch (error) {
      let msg = ``;

      if (error.statusCode === 400 || error.statusCode === 403) {
        msg = `No se pudieron traer los eventos de votación`;
      } else {
        msg = `Ocurrió un error en el sistema`;
      }
      return Promise.reject(msg);
    }
  }

  static async delete(id: string): Promise<any> {
    return id;
  }

  static async update(
    id: string,
    name: string,
    information: string,
  ): Promise<any> {
    return id;
  }
}
