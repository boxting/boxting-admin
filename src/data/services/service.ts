import axios, {AxiosInstance} from "axios"
import ErrorInterceptor from "./service.interceptors"

export default class AxiosService{

    private static _instance: AxiosService
    connection: AxiosInstance

    constructor(){
        try {
            this.connection = axios.create({
                baseURL:"https://blockchain-voting.herokuapp.com/",
            })
            this.connection.interceptors.response.use(null, ErrorInterceptor)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    public static getAxiosService() {
        return this._instance || (this._instance = new this())
    }
}