import { useEffect, useState } from "react";
import { useAPI } from "../../components/context/APIContext";
import { useDebug } from "../../components/context/DebugContext";
import useError from "../useError";
import ShareModal from "../../components/modals/share/ShareModal";
import { AppError } from "../../errors/customErrors";

const useShare = (myNode, setMyNode) => {
    const errorName = 'useShare Hook Error'
   //if myNode does not exist, make it if share button is pressed
   const [show, setShow] = useState(false);

   const [isLoading, setIsLoading] = useState(true);
    const [error, setTheError] = useState(null);
    const { APIObj } = useAPI();
    const { debug } = useDebug();
    const[ nodeLocal, setNodeLocal] = useState(null)

   const {handleError, assertHandlerPresence} = useError();
   const handleOpen = () => setShow(true);
   const handleClose = () => setShow(false);


    /**
    * @description If someone interacts with something,
    * we need to check if they have a node already, and if they don't we need to make one
    * @param {Object} [myNode={}] - the global scope myNode state
    * @param {Object} [setMyNode=()] - the global scope setter function for myNode state
    */
    const handleInteraction = (callbackFn) => {
        console.log(typeof callbackFn)
        debug('Hnadling interaction', 'Hook: useShare, function: handleInteraction')
        if(!myNode){
        
            handleError(new AppError({name: errorName, message:'myNode provided is null'}))
            //Intereact with node for the first time
            //set the 'global state' of the node just created
            console.log('no myNode provided, interacting for the first time')
        }  else {
            console.log('calling callbackFn')
            //assertHandlerPresence(callbackFn, 'callbackFn')()
            callbackFn()
        }
    }


   /**
    * @description If 'myNode' is not something that exists yet, this will create it and 
    * set it for the entirety of the myNode scope.
    * @param {Object} [options.myNode={}] - the global scope myNode state
    * @param {Object} [options.setMyNode=()] - the global scope setter function for myNode state
    */
   const initShareModal = () => {
    console.log('initShareModal mynode data inputted ', myNode)
    if(!myNode){
        
        handleError(new AppError({name: errorName, message:'myNode provided is null'}))
        //Intereact with node for the first time
        //set the 'global state' of the node just created
        console.log('no myNode provided, interacting for the first time')
    }  else {
        console.log('myNode accepted', myNode)
    setNodeLocal(myNode);
    handleOpen();
    }
    
    
    

}

    const ShareModalComponent = () =>{
        return(
            <>
                {nodeLocal == null ? (<></>): (
                    <ShareModal 
                    show={show}
                    node={nodeLocal}
                    handleClose={handleClose}
                >

                </ShareModal>
                )}
            </>
        )
    }


    return {ShareModalComponent, initShareModal, handleInteraction};

}
export default useShare;