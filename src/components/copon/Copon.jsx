import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
const Copon = () => {
    const[ copouns , setCopouns] = useState([])
    const getCopon = async()=>{
        const response = await axios.get('http://localhost:3000/api/v1/coupons',{
            withCredentials: true,
        });
        return response.data
        
    }
    useQuery('getcopon',getCopon,{
        
    })
    return (
        <div>

        </div>
    )
}

export default Copon
