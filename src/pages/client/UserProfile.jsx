import { useParams } from "react-router-dom";
import ProfileViewLayout from "../../components/Layout/ProfileViewLayout";
import { useEffect } from "react";
import ProfilePicRounded from "../../components/User/ProfilePicRounded";

const UserProfile = () => {
  const { username } = useParams();

  useEffect(() => {
    username !== undefined
      ? (document.title = ` ${username}'s Profile | JMarket`)
      : (document.title = `Error! No user found`);
  }, []);

  return (
    <ProfileViewLayout>
      {username}
      <div className="flex flex-col justify-center items-center">
        <ProfilePicRounded />
      </div>
    </ProfileViewLayout>
  );
};

export default UserProfile;
