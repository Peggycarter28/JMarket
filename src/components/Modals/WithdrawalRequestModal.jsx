import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/AppContextt";
import { createVendorService } from "../../service/vendorListingService";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/config";
import { ClipLoader } from "react-spinners";

const WithdrawalRequestModal = ({ handleModal, fetchedUser }) => {
    const user = useContext(UserContext);
    const [categories, setCategories] = useState(null);
    const [inProgress, setInProgress] = useState(false);
    const [title, setTitle] = useState(null);
    const [localGovernment, setLocalGovernment] = useState(null);
    const [category, setCategory] = useState(null);
    const [description, setDescription] = useState(null);
    const [cac, setCAC] = useState(null);
    const [terms, setTerms] = useState(null);
    const [service_phone, setPhone] = useState(null);


    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null
    });

    // Function to upload the files to Cloudinary
    const uploadToCloudinary = async (photos) => {
        const uploadedUrlsTemp = []; // Temporary array to hold uploaded URLs

        for (const photo of photos) {
            if (photo) {
                const formData = new FormData();
                formData.append('file', photo);
                formData.append('upload_preset', 'YolsFarms'); // Replace with your Cloudinary upload preset

                try {
                    const response = await axios.post(
                        'https://api.cloudinary.com/v1_1/deqi6mvv6/image/upload', // Replace with your Cloudinary URL
                        formData,
                        { headers: { "Content-Type": "multipart/form-data" } }
                    );
                    uploadedUrlsTemp.push(response.data.secure_url); // Store the URL in the temporary array
                } catch (error) {
                    console.error('Error uploading to Cloudinary:', error);
                }
            }
        }
        return uploadedUrlsTemp; // Return the array of uploaded URLs
    };

    const handleAddListing = async () => {

        if(location.latitude == null || location.longitude == null)
        {return alert("Can't submit. Please ensure your have granted all required device access.")}

        console.log(fetchedUser)
        
        setInProgress(true);
        if(fetchedUser.id == '' || fetchedUser.id == undefined || fetchedUser.id == null)
            {console.log("You are probably not logged in")
                alert("We could not identify you. Kindly reload page or login and try again")
                return true
            }

        else if (localGovernment == '' || category == '' || title == '' || description == '' || service_phone == '' )
        {console.log("One or more required parameters is missing")
            alert("One or more required parameters is missing")
            return true}

        console.log("Adding Listing STarted") 

        if (!description || !title) {
            alert("Title or description cannot be blank");
            setInProgress(false);
            return;
        }

        // Upload images and store their URLs
        console.log("Adding Images to CLoudinary")

        // Upload images including cropped ones
        const imagesToUpload = [
            croppedImages.coverPhoto, // Use the cropped cover photo
            croppedImages.photoOne,
            croppedImages.photoTwo,
            croppedImages.photoThree,
            croppedImages.photoFour,
        ];

    console.log("Images are are: ", imagesToUpload) 

        const urls = await uploadToCloudinary(imagesToUpload);
        setUploadedUrls(urls);

        console.log("Links are: ", urls)

        if (urls.length > 0) {
            console.log("Adding Service with uploaded urls");

            const data = {
                owner: fetchedUser.id,
                local_government: localGovernment ,
                category: category,
                name: title,
                description: description,
                phone: service_phone,
                image_url: urls[0], // Use the first URL as the cover photo
                cac_number: cac,
                service_charge: 0,
                is_approved: false,
                date_listed: new Date(Date.now()).toISOString(),
                locationLat: parseFloat(location.latitude),
                locationLong: parseFloat(location.longitude),
            };

            console.log(data);

            const res = await createVendorService(data);

            if (res.status === 200 || res.status === 201) {
                const serviceID = res.data.id;

                console.log("Adding Service Photos");

                // Upload additional listing images
                const listingPhotos = urls.slice(1); // Exclude the first URL

                for (const [index, item] of listingPhotos.entries()) {
                    await axios.post(`${API_URL}/api/listing-images`, {
                        name: `Photo ${index + 1}`,
                        serviceID: serviceID,
                        image_url: item,
                    }).then(res => {
                        console.log("Upload complete", res);
                    });
                }

                console.log('Service created');
                alert("Service submitted successfully! Please allow up to 24 hours for your service to be approved.");
                handleModal();
            } else {
                alert("Failed! Something bad happened.");
            }
        }
        setInProgress(false);
    };

    useEffect(() => {
        const storedLGA = localStorage.getItem('localGovernmentAreas');
        const storedCategories = localStorage.getItem('categories');

        if (storedLGA) {
            setAllLocalGovernment(JSON.parse(storedLGA));
        }

        if (storedCategories) {
            setCategories(JSON.parse(storedCategories));
        }
    }, []);


    useEffect(() => {
        let watchId;
    
        const getLocation = async () => {
            if (navigator.geolocation) {
                watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        console.log(position.coords);
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude, error: null });
                    },
                    (error) => {
                        setLocation({ latitude: null, longitude: null, error: error.message });
                    },
                    {
                        enableHighAccuracy: true, // Enables high-accuracy GPS
                        timeout: 10000, // Max wait time to get location
                        maximumAge: 0 // Always fetch fresh location data
                    }
                );
            } else {
                setLocation({ latitude: null, longitude: null, error: 'Geolocation is not supported by this browser.' });
                alert('Geolocation is not supported by this browser.')
            }
        };
    
        getLocation();
    
        // Clean up the watchPosition listener when the component unmounts
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
                    <h4 className="font-bold text-[23px]">New Withdrawal request</h4>
                    <div onClick={handleModal} className="size-[50px] bg-[red] flex justify-center items-center rounded text-white font-bold">X</div>
                </div>
                
                <div className="">
                    <p>Account Name</p> <p>{}</p>
                    <input onChange={(elem) => setTitle(elem.target.value)} value={title} className="border px-4 py-2 w-full" name="title" placeholder="Enter Title" type="text" />
                </div>

                <div className="">
                    <p>Account Number</p> <p>{}</p>
                    <input onChange={(elem) => setDescription(elem.target.value)} value={description} className="border px-4 py-2 w-full" name="email" placeholder="Enter Description" type="text" />
                </div>

                <div className="">
                    <p>Amount</p> <p>{}</p>
                    <input onChange={(elem) => setPhone(elem.target.value)} value={service_phone} className="border px-4 py-2 w-full" name="title" placeholder="Enter Phone" type="text" />
                </div>

                <div className="flex justify-between gap-4">
                    <div className="flex-1">
                    <p>Bank</p> 
                    <select className="border px-4 py-2 w-full" value={category} onChange={(elem)=> setCategory(elem.target.value)}>
                        <option value="">...select bank account</option>
                        
                        {categories?.map(category=>{
                            return(
                                user.lang == "ha"
                               ?  <option key={category.id+category.name} value={category.id}>{category.name_ha}</option>
                               : <option key={category.id+category.name} value={category.id}>{category.name}</option>
                            )
                        })
                        }

                    </select>
                    </div>
                
                    <div className="flex-1">
                    <p>LGA</p>
                    <select className="border px-4 py-2 w-full" value={localGovernment} onChange={(elem)=> setLocalGovernment(elem.target.value)}>
                        <option value="">...select LGA</option>
                        <option value="1">Bauchi</option>
                        <option value="2">Toro</option>
                        <option value=""></option>
                    </select>
                    </div>

                    <div className="flex-1">
                    <p>C.A.C (Optional)</p>
                    <input onChange={(elem) => setCAC(elem.target.value)} value={cac} className="border px-4 py-2 w-full" placeholder="Enter CAC" type="text" />

                    </div>
                </div>

                    <div className="flex-1 flex items-center gap-2">
                    
                    <input onChange={(elem) => setTerms(elem.target.value)} value={terms} className="border" type="checkbox" />
                    <label>By proceeding, you agree to <Link to={"/tc"}>BConnect's vendors terms and conditions </Link></label>
                    </div>

                     

                <div className="flex">
                    <button disabled={inProgress} onClick={handleAddListing} className="bg-[#ef6c00] w-full text-white p-4 rounded-lg flex justify-center items-center">
                        <span>{inProgress == true ? "Proceeding..." : "Add Service"}
                        </span>
                       
                        {inProgress == true &&
                         <span>
                        <ClipLoader color="#ccc" size={18} />

                        </span>
}
                        </button>
                </div>

            </div>
        </div>)
}

export default WithdrawalRequestModal