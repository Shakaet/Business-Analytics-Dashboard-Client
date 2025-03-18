import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { Context } from '../../provider/AuthProvider';



const useU = () => {


    let {user}= useContext(Context)



    const fetchUsers = async () => {
        const response = await axios.get(`http://localhost:3000/users/user/${user?.email}`);
        return response.data?.user;
      };

   
    const { data: isU = [], isLoading:ULoading } = useQuery({
        queryKey: [user?.email,"isU"], 
        queryFn: fetchUsers, 
      });
    
    

    return [isU,ULoading]
};

export default useU;