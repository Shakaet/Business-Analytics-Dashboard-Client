import { useQuery } from '@tanstack/react-query';
import axios from 'axios';



const useUser = () => {


    



    const fetchUsers = async () => {
        const response = await axios.get("https://business-dashboard-server.vercel.app/users");
        return response?.data;
      };

   
    const { data: users = [], isLoading:userLoading } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers, 
      });
    
    

    return [users,userLoading]
};

export default useUser;