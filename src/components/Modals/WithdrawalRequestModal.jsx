import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/AppContextt";
import { createVendorService } from "../../service/vendorListingService";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/config";
import { ClipLoader } from "react-spinners";

const WithdrawalRequestModal = ({ handleModal, fetchedUser }) => {
    const user = useContext(UserContext);
    const [categories, setCategories] = useState([]);
    const [inProgress, setInProgress] = useState(false);
    const [title, setTitle] = useState("");
    const [localGovernment, setLocalGovernment] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [cac, setCAC] = useState("");
    const [terms, setTerms] = useState(false); // Change to boolean
    const [service_phone, setPhone] = useState("");

    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null
    });

    const handleAddListing = async () => {
        if (location.latitude == null || location.longitude == null) {
            alert("Can't submit. Please ensure you have granted all required device access.");
            return;
        }

        setInProgress(true);

        if (!fetchedUser?.id) {
            alert("We could not identify you. Kindly reload the page or log in and try again.");
            setInProgress(false);
            return;
        }

        if (!localGovernment || !category || !title || !description || !service_phone) {
            alert("One or more required fields are missing.");
            setInProgress(false);
            return;
        }

        try {
            const data = {
                owner: fetchedUser.id,
                local_government: localGovernment,
                category: category,
                name: title,
                description: description,
                phone: service_phone,
                image_url: "", // Placeholder, handle image uploads separately
                cac_number: cac,
                service_charge: 0,
                is_approved: false,
                date_listed: new Date().toISOString(),
                locationLat: parseFloat(location.latitude),
                locationLong: parseFloat(location.longitude),
            };

            const res = await createVendorService(data);

            if (res.status === 200 || res.status === 201) {
                alert("Service submitted successfully! Please allow up to 24 hours for approval.");
                handleModal();
            } else {
                alert("Failed! Something bad happened.");
            }
        } catch (error) {
            console.error("Error adding listing:", error);
            alert("An error occurred while submitting the service.");
        } finally {
            setInProgress(false);
        }
    };

    useEffect(() => {
        let watchId;

        const getLocation = () => {
            if (navigator.geolocation) {
                watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude, error: null });
                    },
                    (error) => {
                        setLocation({ latitude: null, longitude: null, error: error.message });
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0,
                    }
                );
            } else {
                setLocation({ latitude: null, longitude: null, error: 'Geolocation is not supported by this browser.' });
                alert('Geolocation is not supported by this browser.');
            }
        };

        getLocation();

        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, []);

    return (
        <div className="fixed h-screen w-full bg-[#808080a3] left-0 right-0 bottom-0 flex flex-col items-center justify-center p-4 overflow-hidden">
            <div className="bg-white p-4 rounded-lg shadow-2xl min-h-[400px] min-w-[70%] md:min-w-[70%] flex flex-col gap-2 overflow-y-scroll">
                <div className="flex justify-between">
                    <h4 className="font-bold text-[23px]">New Withdrawal Request</h4>
                    <div onClick={handleModal} className="size-[50px] bg-[red] flex justify-center items-center rounded text-white font-bold">X</div>
                </div>

                <div>
                    <p>Account Name</p>
                    <input onChange={(e) => setTitle(e.target.value)} value={title} className="border px-4 py-2 w-full" name="title" placeholder="Enter Title" type="text" />
                </div>

                <div>
                    <p>Account Number</p>
                    <input onChange={(e) => setDescription(e.target.value)} value={description} className="border px-4 py-2 w-full" name="description" placeholder="Enter Description" type="text" />
                </div>

                <div>
                    <p>Amount</p>
                    <input onChange={(e) => setPhone(e.target.value)} value={service_phone} className="border px-4 py-2 w-full" name="phone" placeholder="Enter Phone" type="text" />
                </div>

                <div className="flex justify-between gap-4">
                    <div className="flex-1">
                        <p>Bank</p>
                        <select className="border px-4 py-2 w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">...select bank account</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {user.lang === "ha" ? category.name_ha : category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <p>LGA</p>
                        <select className="border px-4 py-2 w-full" value={localGovernment} onChange={(e) => setLocalGovernment(e.target.value)}>
                            <option value="">...select LGA</option>
                            <option value="1">Bauchi</option>
                            <option value="2">Toro</option>
                        </select>
                    </div>

                    <div className="flex-1">
                        <p>C.A.C (Optional)</p>
                        <input onChange={(e) => setCAC(e.target.value)} value={cac} className="border px-4 py-2 w-full" placeholder="Enter CAC" type="text" />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" onChange={(e) => setTerms(e.target.checked)} checked={terms} />
                    <label>
                        By proceeding, you agree to <Link to={"/tc"}>BConnect's vendors terms and conditions</Link>
                    </label>
                </div>

                <div className="flex">
                    <button disabled={inProgress} onClick={handleAddListing} className="bg-[#ef6c00] w-full text-white p-4 rounded-lg flex justify-center items-center">
                        <span>{inProgress ? "Proceeding..." : "Add Service"}</span>
                        {inProgress && (
                            <span>
                                <ClipLoader color="#ccc" size={18} />
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WithdrawalRequestModal;
