const UsernameAt =({children}) => {

    return (
        <>
             <strong className='bg-secondary rounded-pill p-1 mx-1 shadow'>
                                    @{children}
            </strong>
        </>
    )

}

export default UsernameAt