import { makeAutoObservable } from 'mobx'

export default class UserStore{
    private _isAuth: boolean = false

    constructor(){
        makeAutoObservable(this)
    }

    setIsAuth(bool: boolean){
        this._isAuth = bool
    }

    get isAuth(){
        return this._isAuth
    }
}