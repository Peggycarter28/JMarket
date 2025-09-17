import NavBar from "./LandingPage/NavBar";
import SignInNav from "./LandingPage/SignInNav";
import siteLogo from "../assets/bauchi-connect-logo.svg";

const NavBarComponentOthers = () => {
  return (
    <nav className="flex w-full justify-around items-center p-8">
      <img src={siteLogo} alt="" />

      <div className="flex">
        <NavBar
          links={[
            { name: "Find Vendors", url: "" },
            { name: "Vendors", url: "" },
          ]}
        />

        <SignInNav
          links={[
            { name: "Sign In", url: "/auth/signin" },
            { name: "Sign Up", url: "/auth/signup", isPrimary: true },
          ]}
        />
      </div>
    </nav>
  );
};

export default NavBarComponentOthers;
