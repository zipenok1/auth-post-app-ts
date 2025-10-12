import { 
  useContext, 
  useState, 
  type FormEvent
} from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../main'
import * as Api from '../api'
import '../styles/Auth.css'

interface AuthResponse {
  token: string
}

const Auth = observer(() => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLogin, setIsLogin] = useState<boolean>(true)

  const context = useContext(Context)
  if(!context) return <div>загрузка...</div>
  const {user} = context
  
  const navigate = useNavigate()

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      let response: AuthResponse
      if (isLogin) {
        response = await Api.auth.login({ email, password });
      } else {
        response = await Api.auth.register({ email, password });
      }
      localStorage.setItem('token', response.token)
      user.setIsAuth(true)
      navigate('/posts')
    } catch(error: any){
      alert('ошибка: ' + (error.response?.data?.message || error.message))
    }
  };

  return (
    <div className="auth">
      <form onSubmit={submit}>
        <h2>{isLogin ? 'вход' : 'регистрация'}</h2>
        <input type="email" placeholder="почта" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          type="password"
          placeholder="пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'войти' : 'создать аккаунт'}</button>
        <button type="button" className="switch" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'нет аккаунта?' : 'усть аккаунт?'}
        </button>
      </form>
    </div>
  )
})

export default Auth