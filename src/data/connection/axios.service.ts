import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import CookiesManager from "../utils/cookies.manager"

export default class AxiosService {

    private static _instance: AxiosService
    private _cookiesManager: CookiesManager
    private _baseUrl: string = 'https://boxting-rest-api.herokuapp.com'
    connection: AxiosInstance

    constructor() {
        try {
            this.connection = axios.create({
                baseURL: this._baseUrl,
            })

            this._cookiesManager = CookiesManager.getInstance()
            this._setRequestInterceptor()
            this._setResponseInterceptor()

        } catch (error) {
            throw error
        }
    }

    public static getInstance() {
        return this._instance || (this._instance = new this())
    }

    _setRequestInterceptor() {
        // Add axios request interceptor to handle token usage
        this.connection.interceptors.request.use((config: AxiosRequestConfig) => {

            // Get token from cookies
            const token = this._cookiesManager._getToken()

            // If token exists, assign authorization header
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            // Set content type to json
            config.headers['Content-Type'] = 'application/json'

            // Return config
            return config;
        }, (error) => {
            Promise.reject(error)
        })
    }

    _setResponseInterceptor() {
        // Add axios request interceptor to handle token usage
        this.connection.interceptors.response.use(response => {
            return response
        }, (error: any) => {
            // Save axios error response config to verify data
            const originalRequest = error.config;

            // Check if error is an unauthorized response
            if (error.response.status === 401 && error.config && !originalRequest._isRetryRequest) {
                // Set retry flag to avoid loop
                originalRequest._isRetryRequest = true;
                
                let token = this._cookiesManager._getToken()
                const refreshToken = this._cookiesManager._getRefreshToken()

                // Make fetch request to make the token refresh
                let res = fetch(`${this._baseUrl}/login/token/refresh`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrer: 'no-referrer',
                    body: JSON.stringify({
                        token: token,
                        refreshToken: refreshToken
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        // If refresh is successful, save new tokens with on Cookies
                        token = res.data
                        this._cookiesManager._setToken(token, refreshToken)
                        // Update authorization header on original request
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        // Make request with updated token
                        return this.connection(originalRequest);
                    });
                // Resolve response from request with updated token
                return Promise.resolve(res);
            }

            // Check if errro has expected format
            const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

            if (expectedError) {
                // Return error data
                return Promise.reject(error.response.data);
            }
        })
    }
}