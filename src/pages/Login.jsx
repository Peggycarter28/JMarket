import AuthFormLayout from "../components/Layout/AuthFormLayout"

const Login = () => {

    return(
        <AuthFormLayout>
            <form className="w-[100%]">
                <input name="email" placeholder="Enter email" type="email"/>
                <input name="password" placeholder="Enter password" type="password"/>
                <input name="submit" type="submit" value={"Login"}/>
            </form>
        </AuthFormLayout>
    )
}

export default Login