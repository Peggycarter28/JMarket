import GrayContainer from "../../../components/Layout/GrayContainer"
import HomeDashboardLayout from "../../../components/Layout/HomeDashboardLayout"
import UserDashboardLayout from "../../../components/Layout/UserDashboarLayout"

const ClientHome = () => {
    return (
        <>
            <HomeDashboardLayout>
                <div className="flex gap-4 h-[60px]">
                    <GrayContainer>
                        Home 1
                    </GrayContainer>

                    <GrayContainer>
                        Home 1
                    </GrayContainer>

                    <GrayContainer>
                        Home 1
                    </GrayContainer>
                </div>
            </HomeDashboardLayout>
        </>)
}

export default ClientHome