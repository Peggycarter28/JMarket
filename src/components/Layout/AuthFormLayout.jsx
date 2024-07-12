import { Outlet } from "react-router-dom"

const AuthFormLayout = () => {
    return(<>
    <div className="flex flex-col w-full justify-center align-center">
        <div className="w-2/4 border p-8">
            <Outlet/>
        </div>
    </div>
    </>)
}

export default AuthFormLayout