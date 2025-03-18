import React, { useContext } from 'react';


import { Navigate, useLocation } from 'react-router-dom';
import { Context } from '../provider/AuthProvider';
import useU from '../assets/hook/useU';


const UserRoute = ({children}) => {
    let {user,loading}= useContext(Context)
    
    let [isU,ULoading]=useU()

             let location= useLocation()

    if(loading || ULoading){
        return <progress className="progress w-56"></progress>
    }


    if(user && isU){
        return children
    }


    return <Navigate  to={"/login"} state={{from:location}} replace></Navigate>



    

};

export default UserRoute;