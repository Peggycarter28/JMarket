import { Outlet } from "react-router-dom"

const AuthFormLayout = ({children}) => {
    return(<>
    <div className="flex flex-col w-full items-center align-center bg-auth_form_image min-h-screen">
        <div className="w-2/4 border p-8 m-8 rounded">
           {children}
        </div>
    </div>
    </>)
}

export default AuthFormLayout