import AuthFormLayout from "../components/Layout/AuthFormLayout"
import { registerService } from "../service/authService"

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
            <form className="w-[100%]">
                <input value={email} name="email" placeholder="Enter email" type="email"/>
                <input value={username} name="text" placeholder="Enter username" type="text"/>
                <input value={password} name="password" placeholder="Enter password" type="password"/>
                <input value={repeatPassword} name="password" placeholder="Retype password" type="password"/>
                <input onClick={handleRegister} name="submit" type="submit" value={"Register"}/>
            </form>
        </AuthFormLayout>
    )
}

export default Register