import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/AppContextt";
import { createVendorService } from "../../service/vendorListingService";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/config";
import { ClipLoader } from "react-spinners";
import Cropper from 'react-easy-crop';

const AddServiceModal = ({ handleModal, fetchedUser }) => {
    const user = useContext(UserContext);
    const [categories, setCategories] = useState(null);
    const [allLocalGovernment, setAllLocalGovernment] = useState(null);
    const [inProgress, setInProgress] = useState(false);
    const [title, setTitle] = useState(null);
    const [localGovernment, setLocalGovernment] = useState(null);
    const [category, setCategory] = useState(null);
    const [description, setDescription] = useState(null);
    const [cac, setCAC] = useState(null);
    const [terms, setTerms] = useState(null);
    const [service_phone, setPhone] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [photoOne, setPhotoOne] = useState(null);
    const [photoTwo, setPhotoTwo] = useState(null);
    const [photoThree, setPhotoThree] = useState(null);
    const [photoFour, setPhotoFour] = useState(null);
    const [uploadedUrls, setUploadedUrls] = useState([]);

    // Image Cropping
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState(null)
    const [croppedImages, setCroppedImages] = useState({
        coverPhoto: null,
        photoOne: null,
        photoTwo: null,
        photoThree: null,
        photoFour: null,
    });
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null
    });
    const [cropImageModal, setCropImageModal] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    
    const handleFileChange = (setter, currentImageName) => (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Selected file:", file);
            setImageToCrop(URL.createObjectURL(file));
            setter(file);
            setCropImageModal(true);
            setCurrentImage(currentImageName);
        }
    };
    

    const onCropComplete = async (croppedArea, croppedAreaPixels) => {
        const croppedImageUrl = await getCroppedImg(imageToCrop, croppedAreaPixels);
        console.log("Cropped Image URL:", croppedImageUrl); // Debug log
        setCroppedImage(croppedImageUrl);
    };
    

    const handleCroppedImage = () => {
        setCroppedImages((prev) => ({
            ...prev,
            [currentImage]: croppedImage, // This should be the Blob or File object
        }));
        console.log("Cropped Images:", croppedImages); // Debug log
        setCropImageModal(false);
    };
    

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
                locationLat: parseFloat(location.latitude.toFixed(6)),
                locationLong: parseFloat(location.longitude.toFixed(6)),
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
                    <h4 className="font-bold text-[23px]">Add new Service</h4>
                    <div onClick={handleModal} className="size-[50px] bg-[red] flex justify-center items-center rounded text-white font-bold">X</div>
                </div>

                <div className="">
                    <p>Title</p> <p>{}</p>
                    <input onChange={(elem) => setTitle(elem.target.value)} value={title} className="border px-4 py-2 w-full" name="title" placeholder="Enter Title" type="text" />

                </div>

                <div className="">
                    <p>Description</p> <p>{}</p>
                    <textarea onChange={(elem) => setDescription(elem.target.value)} value={description} className="border px-4 py-2 w-full h-[40vh]" name="email" placeholder="Enter Description" type="text"></textarea>

                </div>

                <div className="">
                    <p>Business Line</p> <p>{}</p>
                    <input onChange={(elem) => setPhone(elem.target.value)} value={service_phone} className="border px-4 py-2 w-full" name="title" placeholder="Enter Phone" type="text" />
                </div>

                <div className="flex justify-between gap-4">
                    <div className="flex-1">
                    <p>Category</p> 
                    <select className="border px-4 py-2 w-full" value={category} onChange={(elem)=> setCategory(elem.target.value)}>
                        <option value="">...select category</option>
                        {categories?.map(category=>{
                            return(
                                user.lang == "ha"
                               ?  <option key={category.id+category.name} value={category.id}>{category.name_ha}</option>
                               : <option key={category.id+category.name} value={category.id}>{category.name}</option>
                            )
                        })}
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

                <div className="flex-1">
                <p>Cover Photo</p>
                <input onChange={handleFileChange(setCoverPhoto, "coverPhoto")} className="border px-4 py-2 w-full" name="coverPhoto" type="file" />
            </div>

                    <div className="flex-1">
                    <p>Service Picture 1</p>
                    <input onChange={handleFileChange(setPhotoOne, "photoOne")} className="border px-4 py-2 w-full" name="email" placeholder="Enter CAC" type="file" />

                    </div>

                    <div className="flex-1">
                    <p>Service Picture 2 (Optional)</p>
                    <input onChange={handleFileChange(setPhotoTwo, "photoTwo")} className="border px-4 py-2 w-full" name="email" placeholder="Enter CAC" type="file" />

                    </div>

                    <div className="flex-1">
                    <p>Service Picture 3  (Optional)</p>
                    <input onChange={handleFileChange(setPhotoThree, "photoThree")} className="border px-4 py-2 w-full" name="email" placeholder="Enter CAC" type="file" />

                    </div>

                    <div className="flex-1">
                    <p>Service Picture 4  (Optional)</p>
                    <input onChange={handleFileChange(setPhotoFour, "photoFour")} className="border px-4 py-2 w-full" name="email" placeholder="Enter CAC" type="file" />

                    </div>

                    <div className="flex-1 flex items-center gap-2">
                    
                    <input onChange={(elem) => setTerms(elem.target.value)} value={terms} className="border" type="checkbox" />
                    <label>By proceeding, you agree to <Link to={"/tc"}>BConnect's vendors terms and conditions </Link></label>
                    </div>

                      {/* Add cropper modal here */}
            
                     {cropImageModal && (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6">
            <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={currentImage == "coverPhoto" ? 900/300 : 3/4} // Adjust the aspect ratio as needed
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
            />
            <div className="flex absolute bottom-0 gap-4 justify-between mt-4">
                <button
                    onClick={() => setCropImageModal(false)}
                    className="bg-red-500 text-white rounded px-4 py-2"
                >
                    Cancel
                </button>
                <button
                    onClick={handleCroppedImage} // Add the function to confirm cropping
                    className="bg-green-500 text-white rounded px-4 py-2"
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
)}

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

export default AddServiceModal

// You also need to create a utility function for cropping the image
async function getCroppedImg(imageSrc, pixelCrop) {
    const image = new Image();
    image.src = imageSrc;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, "image/jpeg");
    });
}