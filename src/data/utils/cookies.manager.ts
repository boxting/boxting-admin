import Cookies from 'js-cookie';
import { CryptoManager } from './crypto.manager';

export default class CookiesManager {

    private static _instance: CookiesManager

    public static getInstance() {
        return this._instance || (this._instance = new this())
    }

    _setRole(role: string) {
        Cookies.set('role', role);
    }

    _getRole() {
        return Cookies.get('role')
    }

    _setToken(token: string, refreshToken: string) {
        Cookies.set('token', token);
        Cookies.set('refresh_token', refreshToken);
    }

    _getToken() {
        return Cookies.get('token')
    }

    _getRefreshToken() {
        return Cookies.get('refresh_token')
    }

    _clearToken() {
        Cookies.remove('token')
        Cookies.remove('refresh_token')
    }
}