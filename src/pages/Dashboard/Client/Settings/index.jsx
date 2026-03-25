import { useContext, useEffect, useState } from "react";
import UserDashboardLayout from "../../../../components/Layout/UserDashboarLayout";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../../context/AppContextt";
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../../../../constants/config";
import UserProfile from "./UserProfile";
import UserProfileEdit from "./UserProfileEdit";
import RecentlyViewed from "../../../../components/LandingPage/RecentlyViwedVendorsCard";
import { RecetlyViwedItems } from "../../../../helpers/RecentlyViewed";

const ProfileDetailsSettings = () => {
  const { curr_section } = useParams();

  const [fetchedUser, setUser] = useState(null);

  console.log(curr_section);

  useEffect(() => {
    document.title = "Settings | JMarket";
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const recentlyViewed = new RecetlyViwedItems();

  return (
    <>
      <UserDashboardLayout>
        <h5 className="font-bold text-[16px] text-[#e8e8e8] py-2">
          {" "}
          {curr_section}{" "}
        </h5>
        {curr_section.toLowerCase() == "profile" && <UserProfile />}
        {curr_section.toLowerCase() == "edit-profile" && <UserProfileEdit />}
        {curr_section.toLowerCase() == "viewed" && (
          <RecentlyViewed items={recentlyViewed.getItems()} />
        )}
      </UserDashboardLayout>
    </>
  );
};

export default ProfileDetailsSettings;
