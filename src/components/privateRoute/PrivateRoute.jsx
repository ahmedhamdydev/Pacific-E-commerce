
import Cookies from 'js-cookie';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
    const userId = Cookies.get('userId')

    return userId ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute