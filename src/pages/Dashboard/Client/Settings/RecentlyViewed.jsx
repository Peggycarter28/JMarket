import RecentlyViewed from "../../../../components/LandingPage/RecentlyViwedVendorsCard";
import UserDashboardLayout from "../../../../components/Layout/UserDashboardLayout"
import { RecetlyViwedItems } from "../../../../helpers/RecentlyViewed";

const RecentlyViewedSettings = () => {
    const recentlyViewed = new RecetlyViwedItems();
    return (
        <>
            <UserDashboardLayout>
                <RecentlyViewed items={recentlyViewed.getItems()}/>

            </UserDashboardLayout>
        </>)
}

export default RecentlyViewedSettings