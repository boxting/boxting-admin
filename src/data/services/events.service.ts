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
    const token = Cookies.get(`token`);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const res = await service.connection.delete(
        `event/token/delete/${id}`,
        config,
      );
      return Promise.resolve(res.data);
    } catch (error) {
      let msg = ``;
      console.log(error);
      if(error.error.errorCode == 4002){
        msg = `No puede eliminar el evento de votación porque ya ha iniciado`;
      }
      else if (error.error.statusCode == 400 || error.error.statusCode == 403) {
        msg = `No se pudo eliminar el evento de votación`;
      } else {
        msg = `Ocurrió un error en el sistema`;
      }
      return Promise.reject(msg);
    }
  }

  static async updateEvent(
    id: string,
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
      const res = await service.connection.put(
        `event/token/update/${id}`,
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
      console.log(error);
      let msg = ``;
      if(error.error.errorCode ==4002){
        msg = `No se puede modificar el evento de votación porque ya ha iniciado`;
      }
      else if (error.error.statusCode == 400 || error.error.statusCode == 403) {
        msg = `No se pudo crear un nuevo evento de votación`;
      } else {
        msg = `Ocurrió un error en el sistema`;
      }
      return Promise.reject(msg);
    }
  }
}
