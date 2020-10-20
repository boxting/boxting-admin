import AxiosService from '@/data/services/service';

const service = new AxiosService()

export class LoginService{

    async login(username:string, password:string): Promise<any>{

        try {
            const res = await service.connection.post('user/organizer/login', {
              username: username,
              password: password
            })
            
            return Promise.resolve(res.data)
          } catch (error) {

            return Promise.reject(error)
          }
    }

}