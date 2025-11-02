import { makeAutoObservable } from 'mobx'

export default class UserStore{
    private _isAuth: boolean = false
    private _token: string = ''

    constructor(){
        makeAutoObservable(this)
        this.checkAuth()
    }

    checkAuth(){
        const token = localStorage.getItem('token')
        if(token){
            this._isAuth = true
            this._token = token
        } 
    }

    login(token: string){
        localStorage.setItem('token', token)
        this._isAuth = true
        this._token = token
    }

    get token() {
        return this._token
    }
    get isAuth(){
        return this._isAuth
    }
}
