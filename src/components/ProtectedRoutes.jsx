import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {

    const tokenExists = () => {
        const token = localStorage.getItem("token")
        return token !== ""; //true
    }
	
	if (tokenExists()) {
		return <Outlet />
	} else {
		return <Navigate to='/login' />
	} // Aquí le debemos decir la ruta a la que queremos llevar
} // al usuario si no está autenticado

export default ProtectedRoutes
