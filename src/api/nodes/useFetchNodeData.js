import { useEffect, useState } from "react";
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";

// THIS HOOK EITHER FETCHES NODE DATA< OR IT DOESN'T
const useFetchNodeData = (username) => {

    
    //PROCESS INPUT DATA

    //STATES AND VARIABLES
    const {APIObj} = useAPI();
    const {debug} = useDebug();

    //DATA FETCHING FUNCTIONS

    async function fetchNodeData(){
        const response = APIObj.get(`/api/nodes/${username}`)
    }

}