import { CloseButton, Col, Row } from "reactstrap"

const CustomModalHeader = ({handleClose, children}) => {
    return (
        <>
             <Row style={{minHeight:'75px'}}className='align-items-center g-0 border-bottom' >
                            <Col xs={9} >
                                <div className='fs-3 px-3'  >
                                <h3 className='m-0'>{children}</h3>
                                </div>
                            </Col>
                            <Col xs={3} className=' p-2 justify-content-end text-end'>
                                <div className='align-items-center'>
                                   {handleClose &&<CloseButton className='fs-3' size='lg' onClick={()=>handleClose()}variant='white'></CloseButton>}
                                </div>
                            </Col>
                        </Row>
        </>
    )
}

export default CustomModalHeader