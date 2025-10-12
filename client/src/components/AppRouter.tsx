import { Routes, Route, Navigate } from 'react-router-dom'
import { auhtRoutes, publicRoutes } from '../router/index'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../main'

const AppRouter = observer(() => {
    const context = useContext(Context)
    if(!context) return <div>загрузка...</div>

    const { user } = context

    return (
        <Routes>
        {publicRoutes.map((route) => (
            <Route path={route.path} element={<route.component />} key={route.path} />
        ))}
        {user.isAuth && auhtRoutes.map((route) => 
            <Route path={route.path} element={<route.component />} key={route.path}/>     
        )}
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    )
})

export default AppRouter