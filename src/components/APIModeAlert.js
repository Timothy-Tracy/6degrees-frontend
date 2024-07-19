import { useState, useEffect } from "react";
import { Alert } from "reactstrap";
import { useAPI } from "../context/APIContext";

//<APIModeAlert></APIModeAlert>
//This is a component you can render anywhere
//If You are not in API mode, there will be a red alert telling you that
//If you are in API Mode, it will render nothing

const APIModeAlert = () => {
    const {APIMode} = useAPI();
    const [output,setOutput] = useState();

    useEffect(()=>{
        if (!APIMode){
            setOutput(<Alert color='danger'>API Mode is False. Not currently using a backend</Alert>)
          } else {
            setOutput(<div></div>)
          }
    },[APIMode]);
    return output;
}
export default APIModeAlert;