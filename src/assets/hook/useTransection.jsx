import { useQuery } from '@tanstack/react-query';
import axios from 'axios';



const useTransection = () => {


    



    const fetchUsers = async () => {
        const response = await axios.get("http://localhost:3000/alltransection");
        return response?.data;
      };

   
    const { data: transections = [], isLoading:transectionLoading } = useQuery({
        queryKey: ["transectios"], 
        queryFn: fetchUsers, 
      });
    
    

    return [transections,transectionLoading]
};

export default useTransection;