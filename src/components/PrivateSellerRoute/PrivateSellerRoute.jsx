import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';


function PrivateSellerRoute() {
    const role = Cookies.get('role');
    const navigate = useNavigate();

    const logOutUser = async () => {
        const response = await axios.get("http://localhost:3000/api/v1/auth/sign-out", {
            withCredentials: true
        });
        return response.data;
    };

    const mutation = useMutation(logOutUser, {
        onSuccess: (res) => {
            toast.error("Please log in as the seller");
            Cookies.remove('userId');
            Cookies.remove('access_token');
            Cookies.remove('logedWith');
            Cookies.remove('role');
            navigate("/login");
        },
        onError: (error) => {
            toast.error("There is something wrong. Please try again.");
            console.error(error.message);
        }
    });

    if (role === 'seller') {
        return <Outlet />;
    }else{
        mutation.mutate()
    }
    return null; 
}

export default PrivateSellerRoute;
