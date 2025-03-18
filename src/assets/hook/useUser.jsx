import { useQuery } from '@tanstack/react-query';
import axios from 'axios';



const useUser = () => {


    



    const fetchUsers = async () => {
        const response = await axios.get("http://localhost:3000/users");
        return response?.data;
      };

   
    const { data: users = [], isLoading:userLoading } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers, 
      });
    
    

    return [users,userLoading]
};

export default useUser;