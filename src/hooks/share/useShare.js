import { useEffect, useState } from "react";
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";
import useError from "../useError";

const useShare = (myNode, setMyNode) => {
   //if myNode does not exist, make it if share button is pressed
   const [show, setShow] = useState(false);

   const [isLoading, setIsLoading] = useState(true);
    const [error, setTheError] = useState(null);
    const { APIObj } = useAPI();
    const { debug } = useDebug();
    

   const {handleError} = useError();
   const handleOpen = () => setShow(true);
   const handleClose = () => setShow(false)

    const ShareModal = () =>{
        <ShareModal>

        </ShareModal>
    }


    return {};

}
export default useShare;