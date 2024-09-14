import { useState } from "react";
import AuthFormLayout from "../components/Layout/AuthFormLayout";
import { registerService } from "../service/authService";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const res = await registerService(username, email, password, repeatPassword);
            console.log(res);

            if (res.status === 200 || res.status === 201) {
                // Show the alert first before navigating
                alert("Account created successfully. Proceed to sign in.");
                navigate("../signin");
            } else {
                // Handle different statuses
                alert("Unable to create your account. Please try again.");
            }
        } catch (error) {
            console.error("Error during account creation:", error);
            alert("An error occurred during registration. Please try again later.");
        }
    };

    return (
        <AuthFormLayout>
            <div className="w-full flex flex-col gap-2 md:gap-6 items-center justify-center min-h-screen">
                <div>
                    <h2 className="font-bold text-[24px] text-center">Welcome User</h2>
                    <p className="font-regular text-[16px] text-center">
                        Create your account now and get in touch with your customers - sign in now.
                    </p>
                </div>
                <div className="w-[100%] flex flex-col gap-2 bg-[#e8e8e899] p-4 justify-center items-center">
                    <input
                        onChange={(elem) => setEmail(elem.target.value)}
                        value={email}
                        className="border px-4 py-2 w-full"
                        name="email"
                        placeholder="Enter email"
                        type="email"
                    />

                    <input
                        onChange={(elem) => setUsername(elem.target.value)}
                        value={username}
                        className="border px-4 py-2 w-full"
                        name="username"
                        placeholder="Enter username"
                        type="text"
                    />

                    <input
                        onChange={(elem) => setPassword(elem.target.value)}
                        value={password}
                        className="border px-4 py-2 w-full"
                        name="password"
                        placeholder="Enter password"
                        type="password"
                    />

                    <input
                        onChange={(elem) => setRepeatPassword(elem.target.value)}
                        value={repeatPassword}
                        className="border px-4 py-2 w-full"
                        name="repeatPassword"
                        placeholder="Re-type password"
                        type="password"
                    />

                    <fieldset>
                        <input type="checkbox" name="tc" id="tc" />
                        <label htmlFor="tc">I accept BConnect's terms and conditions</label>
                    </fieldset>
                </div>

                <button onClick={handleRegister} className="border bg-[orange] text-white text-center py-2 w-full">
                    {"Register"}
                </button>
                <p>Or Register with</p>
                <div className="w-full p-2 flex justify-center gap-8">
                    <div className="size-[45px] bg-black rounded-full"></div>
                    <div className="size-[45px] bg-black rounded-full"></div>
                </div>
                <div className="flex justify-center w-full">
                    <Link to={"/auth/signin"}>Already have an account? Login</Link>
                </div>
            </div>
        </AuthFormLayout>
    );
};

export default Register;
