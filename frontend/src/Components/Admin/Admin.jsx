import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../Contexts/Auth/AuthContext";
import SetContext from "../Contexts/SetContexts/SetContext";

export default function Admin() {
    const {auth} = useContext(AuthContext);
    const {setHeaderDom,setFooterDom} = useContext(SetContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(auth){
            auth.role==='admin'?null:navigate('/');
            setHeaderDom(<div className="flex flex-row"><h4>Қош келдіңіз : {auth.username}</h4></div>);
            setFooterDom(null);
        }
    },[]);
  return <div></div>;
}
