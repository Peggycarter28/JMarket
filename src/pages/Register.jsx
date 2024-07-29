import { useState } from "react"
import AuthFormLayout from "../components/Layout/AuthFormLayout"
import { registerService } from "../service/authService"
import { Link } from "react-router-dom"

const Register = () => {
    // Variables that will store the username and password as they type.
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [username, setUsername] = useState("")

    // Function that will call the login service and pass the user data for authentication
    // It will be invoked by the login button in the form
    const handleRegister = async ()=> {
        await registerService(email, password, username)
    }

    return(
        <AuthFormLayout>

          <div className="w-full flex flex-col gap-2 md:gap-6 items-center justify-center min-h-screen">
                <div>
            <h2 className="font-bold text-[24px] text-center">Welcome User</h2>
                    <p className="font-regular text-[16px] text-center">Create your account now and get in touch with your custmers - sign in now.</p>
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

                
                    <button type="submit" onClick={handleRegister} className="border bg-[orange] text-white text-center py-2 w-full" >{"Login"}</button>
                
            </div>
        </AuthFormLayout>
    )
}

export default Register