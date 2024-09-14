import { useContext, useEffect, useState } from "react";
import CTAButton from "../../../components/Forms/Buttons/CTAButton";
import WithdrawalRequestModal from "../../../components/Modals/WithdrawalRequestModal";
import { UserContext } from "../../../context/AppContextt";
import { getVendorWithdrawalService } from "../../../service/vendorListingService";

const Withdrawals = ({ activePage }) => {
    const [showServiceModal, setShowServiceModal] = useState(false);
    const { user } = useContext(UserContext);  // User from context

    const [userr, setUser] = useState(null);
    const [myServices, setMyServices] = useState([]);

    const toggleShowService = () => {
        setShowServiceModal(!showServiceModal);
    };

    const fetchWithdrawalRecords = async (userId) => {
        try {
            const res = await getVendorWithdrawalService();
            if (res.status === 200 || res.status === 201) {
                const found = res.data;
                if (found.length > 0) {
                    // Filter records by the current user's ID
                    const myOwn = found.filter((record) => record.owner_id === userId);
                    setMyServices(myOwn);
                    // Store the filtered records in localStorage
                    localStorage.setItem('withdrawalRecords', JSON.stringify(myOwn));
                    console.log(myOwn, "Completed and stored in localStorage");
                } else {
                    setMyServices([]);  // Clear state if no records found
                    localStorage.setItem('withdrawalRecords', JSON.stringify([]));
                }
            } else {
                console.log("Something bad happened!");
            }
        } catch (error) {
            console.error("Error fetching withdrawal records", error);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);

        if (parsedUser && parsedUser.id) {
            // Check if there are withdrawal records in localStorage
            const localData = localStorage.getItem('withdrawalRecords');
            if (localData) {
                const parsedData = JSON.parse(localData);
                setMyServices(parsedData); // Set the state from localStorage
            }

            // Fetch fresh records only when component is remounted
            fetchWithdrawalRecords(parsedUser.id);
        }
    }, [activePage]);  // Re-fetch every time the activePage changes

    return (
        <>
            <h3 className="font-bold text-[36px] text-[#b4b4b4]">Withdrawal Requests</h3>

            <div onClick={toggleShowService} className="flex p-4">
                <CTAButton title={"New Request"} />
            </div>

            <div>
                <table className="w-full border text-[12px]">
                    <thead>
                        <tr>
                            <th>Sn</th>
                            <th>Date</th>
                            <th>Reference</th>
                            <th>Account Name</th>
                            <th>Account Number</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myServices.length > 0 ? (
                            myServices.map((item, index) => (
                                <tr key={index} className="bg-[#e8e8e8]">
                                    <td className="p-2">{index + 1}</td>
                                    <td>{new Date(item.date).toDateString()}</td>
                                    <td>{user?.lang === "ha" ? item.reference : item.reference}</td>
                                    <td>{user?.lang === "ha" ? item.name : item.name}</td>
                                    <td>{user?.lang === "ha" ? item.account_number : item.account_number}</td>
                                    <td>NGN {item.amount}</td>
                                    <td className="flex flex-col gap-1 p-2">{item.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No Withdrawal Request yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showServiceModal && <WithdrawalRequestModal fetchedUser={userr} handleModal={toggleShowService} />}
        </>
    );
};

export default Withdrawals;

