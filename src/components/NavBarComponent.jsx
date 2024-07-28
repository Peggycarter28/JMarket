import NavBar from "./LandingPage/NavBar"
import SignInNav from "./LandingPage/SignInNav"
import siteLogo from '../assets/bauchi-connect-logo.svg'

const NavBarComponent = () => {
    return(
        <nav className="flex w-full justify-between md:justify-around items-center p-2 md:p-8">
                        <img src={siteLogo} class alt="BConnect Logo" />

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

                        <div className="size-[50px] bg-[white] md:hidden">Mobile Nav</div>
                    </nav>
    )
}

export default NavBarComponent