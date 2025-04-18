import { useQuery } from '@tanstack/react-query';
import axios from 'axios';



const useRevenue = () => {


    



    const fetchUsers = async () => {
        const response = await axios.get("https://business-dashboard-server.vercel.app/revenue");
        return response?.data;
      };

   
    const { data: revenue = [], isLoading:revenueLoading } = useQuery({
        queryKey: ["revenue"], 
        queryFn: fetchUsers, 
      });
    
    

    return [revenue,revenueLoading]
};

export default useRevenue;