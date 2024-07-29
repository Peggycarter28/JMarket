

const AuthFormLayout = ({children}) => {

    
    return(<>
    <div className="flex flex-col w-full items-center align-center bg-auth_form_image min-h-screen">
        <div className="relative w-full md:w-1/3 p-2 md:p-8 md:m-8 rounded">
           {children}
        </div>
    </div>
    </>)
}

export default AuthFormLayout