import RecentlyViewed from "../../../../components/LandingPage/RecentlyViwedVendorsCard";
import UserDashboardLayout from "../../../../components/Layout/UserDashboardLayout"
import { RecetlyViwedItems } from "../../../../helpers/RecentlyViewed";

const RecentlyViewedSettings = () => {
    const recentlyViewed = new RecetlyViwedItems();
    return (
        <>
            <UserDashboardLayout>
            12345
                <RecentlyViewed items={recentlyViewed.getItems()}/>

            </UserDashboardLayout>
        </>)
}

export default RecentlyViewedSettings