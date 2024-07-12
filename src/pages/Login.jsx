import AuthFormLayout from "../components/Layout/AuthFormLayout"

const Login = () => {

    return(
        <AuthFormLayout>
            <>
            <form className="w-[100%] flex flex-col gap-2">
                <h2>Sign In</h2>
                <input className="border" name="email" placeholder="Enter email" type="email"/>
                <input  className="border" name="password" placeholder="Enter password" type="password"/>
                <submit className="border bg-[orange] text-white text-center py-2" >{"Login"}</submit>
            </form>
            </>
        </AuthFormLayout>
    )
}

export default Login