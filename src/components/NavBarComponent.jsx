import NavBar from "./LandingPage/NavBar"
import SignInNav from "./LandingPage/SignInNav"
import siteLogo from '../assets/bauchi-connect-logo.svg'
import { Link } from "react-router-dom"

const NavBarComponent = () => {
    return(
        <nav className="flex w-full justify-between md:justify-around items-center p-2 md:p-8">
                        <Link to={"/"}>
                        <img src={siteLogo} class alt="BConnect Logo" />
                        </Link>

                        <div className='hidden md:flex'>
                            <NavBar links={[
                                { name: "Find Vendors", url: "/search" },
                                { name: "Vendors", url: "/search" }
                            ]} />

                            <SignInNav links={[
                                { name: "Sign In", url: "auth/signin" },
                                { name: "Sign Up", url: "auth/signup", isPrimary: true },
                            ]
                            } />

                            
                        </div>

                        <div className="size-[50px] p-2 md:hidden">
                            <img className="size-[30px]" src="https://img.icons8.com/ios/50/FFFFFF/menu-v7.png" alt="Menu Icon" />
                        </div>
                    </nav>
    )
}

export default NavBarComponent