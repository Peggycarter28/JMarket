import { useContext, useState } from "react"
import AuthFormLayout from "../components/Layout/AuthFormLayout"
import { loginService } from "../service/authService"
import { Link } from "react-router-dom"
import LoaderScreen from "./LoaderScreen"
import Cookies from "js-cookie"
import Rings from "react-loading-icons/dist/esm/components/rings"
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles"
import { UserContext } from "../context/AppContextt"

const Login = () => {
    // Variables that will store the username and password as they type.
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const {user, setUser} = useContext(UserContext)
    // Function that will call the login service and pass the user data for authentication
    // It will be invoked by the login button in the form
 

    const login = async () =>{
        const credentials = {username:email, password: password}
        setIsLoading(true)
        try {
            const res = await loginService(email, password)

            if(res.status == 200 || res.data == 201)
            {
                Cookies.set('token', res.data['auth_token'], {expires: 7})
                setUser(prev => ({...prev, token: res.data['auth_token'], isLoggedIn: true, username: email}))
                alert("Logged In Successfully! You can make your orders now")

                setIsLoading(false)
                window.location.pathname = "/search"
                 
            }
            else{
                setIsLoading(false)
             alert("Invalid login credentials")
        }
        }
        catch(err){
            setIsLoading(false)
            alert('Error!', err)
        }
    }

    const handleLogin = async () => {
        email == ""  || password == "" ? alert("Username or password cannot be blank") : login()

        
    }

    return (
        <AuthFormLayout>
            {/* <LoaderScreen/> */}

            <div className="w-full flex flex-col gap-2 md:gap-6 items-center justify-center min-h-screen">
                <div>
            <h2 className="font-bold text-[24px] text-center">Welcome Back</h2>
                    <p className="font-regular text-[16px] text-center">Stay connected with your favourite vendors - sign in now.</p>
                    </div>
                <form className="w-[100%] flex flex-col gap-2 bg-[#e8e8e899] p-4 justify-center items-center">
                    <input onChange={(elem) => setEmail(elem.target.value)} value={email} className="border px-4 py-2 w-full" name="email" placeholder="Enter email" type="email" />

                    <input onChange={(elem) => setPassword(elem.target.value)} value={password} className="border px-4 py-2 w-full" name="password" placeholder="Enter password" type="password" />
                    <div className="flex justify-end w-full">
                        <Link to={"/auth/forgot-password"}>Forgot Password</Link>
                    </div>
                    <div className="w-full p-2 flex justify-center gap-8">
                        <div className="size-[45px] bg-black rounded-full"></div>
                        <div className="size-[45px] bg-black rounded-full"></div>
                    </div>

                </form>

                
                    <button disabled={isLoading} type="submit" onClick={handleLogin} className="border bg-[orange] text-white text-center py-4 w-full flex gap-2 justify-center items-center overflow-hidden" ><span>Login</span> {isLoading && <span><SpinningCircles fontSize={14} scale={0.5} color="#660033"/></span>}</button>
                
            </div>
        </AuthFormLayout>
    )
}

export default Login