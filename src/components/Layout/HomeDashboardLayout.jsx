import { Link, useParams, useNavigate } from "react-router-dom";
import GrayContainer from "./GrayContainer";
import DashSideNav from "./DashSideNav";
import { useEffect, useState } from "react";

const HomeDashboardLayout = ({ children }) => {
  const { curr_section } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const sub_sections = [
    { name: "Profile Details", slug: "profile" },
    { name: "Recently Viewed", slug: "viewed" },
    { name: "Settings", slug: "settings" }
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      console.log(storedUser);
      setUser(JSON.parse(storedUser));
    } else {
      setUser({});
    }
  }, []);

  // Logout function to clear localStorage and redirect
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user from localStorage
    localStorage.removeItem("authToken"); // Clear token from localStorage if stored

    // Navigate back to the home page
    navigate("/");
  };

  return (
    <>
      <GrayContainer noPadding={true}>
        <div className="flex h-screen">
          <DashSideNav />
          <main className="flex-1 flex border gap-2 md:gap-4 p-2 md:p-4">
            <div className="hidden flex-[4] border rounded-[17px] bg-[#F9F9F9] p-4 md:flex flex-col justify-center items-center">
              {/* Title */}
              <Link to={'/'}>
              <h3 className="py-8">
                <img className="" src="/logo.svg" alt="BauchiConnect Logo" />
              </h3>
              </Link>

              {/* User Details */}
              <h4 className="text-[#464B4F] text-[24px] fw-600">{user?.username}</h4>
              <p className="text-[#808080] text-[16px]">{user?.email}</p>

              {/* Logout Button */}
              <button
                className="bg-[#808080] px-[16px] py-[12px] mt-4 text-[white] rounded hover:bg-slate-800 transition-all duration-300"
                onClick={handleLogout} // Call the logout function on click
              >
                Logout
              </button>

              <div className="flex-1"></div>
            </div>

            {/* Chat Area */}
            <div className="flex-[8] p-2 overflow-y-scroll flex flex-col border rounded-[17px] bg-[#F9F9F9]">
              {children}
            </div>
          </main>
        </div>
      </GrayContainer>
    </>
  );
};

export default HomeDashboardLayout;
