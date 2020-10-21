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

            let msg = ""

            if (error.error.statusCode == 400 || error.error.statusCode == 403){
                msg = "Usuario o contraseña incorrectos"
              }else{
                msg = "Ocurrió un problema al iniciar sesión"
              }
            return Promise.reject(msg)
          }
    }

}