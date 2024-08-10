import { useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { updateProfile } from "../../../../service/authService";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import CTAButton from "../../../../components/Forms/Buttons/CTAButton";

const UserProfileEdit = () => {
    const [fetchedUser, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [cropping, setCropping] = useState(false);
    const profilePicElem = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Settings | Profile Details";
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleFileOpen = () => {
        profilePicElem.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setImage(fileURL);
            setCropping(true);
        }
    };

    const handleCropComplete = async (croppedArea, croppedAreaPixels) => {
        setCrop(croppedAreaPixels);
    };

    const handleCrop = async () => {
        const croppedImg = await getCroppedImg(image, crop);
        setCroppedImage(croppedImg);
        setCropping(false);
        setImage(null); // Clear the image after cropping

        // Upload cropped image to Cloudinary and update user profile
        const cloudUrl = await uploadToCloudinary(croppedImg);
        if (cloudUrl) {
            const serverRes = await updateProfile({image_url: cloudUrl}, fetchedUser.id);

        if (serverRes.status === 200 || serverRes.status === 201) {
            setUser((prev) => ({ ...prev, image_url: cloudUrl })); // Update fetchedUser's image_url
        }
        }
        
    };

    const handleProfileUpdate = async () => {
        const data = fetchedUser;
        const update = await updateProfile(data, data.id);

        if (update.status === 200 || update.status === 201) {
            localStorage.setItem("user", JSON.stringify(data));
            alert("Profile updated successfully!");
            navigate('../settings/profile');
        }
    };

    const handleDataChange = (propertyName) => (elem) => {
        const newValue = elem.target.value;
        setUser((prev) => ({ ...prev, [propertyName]: newValue }));
    };

    const uploadToCloudinary = async (tempImage) => {
        let uploadedUrl = null;

        if (tempImage) {
            const formData = new FormData();
            formData.append("file", tempImage);
            formData.append("upload_preset", "YolsFarms"); // Replace with your Cloudinary upload preset

            try {
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/deqi6mvv6/image/upload", // Replace with your Cloudinary URL
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                uploadedUrl = response.data.secure_url; // Store the URL
            } catch (error) {
                console.error("Error uploading to Cloudinary:", error);
            }
        }
        return uploadedUrl; // Return the uploaded URL
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <div onClick={handleFileOpen} className="size-[150px] border rounded-full flex justify-center items-center cursor-pointer">
                    {fetchedUser?.image_url ? (
                        <img className="rounded-full" src={fetchedUser.image_url} alt="Profile" />
                    ) : (
                        <img className="rounded-full" src={fetchedUser?.image_url} alt="Profile" />
                    )}
                </div>
                <input type="file" ref={profilePicElem} onChange={handleFileChange} style={{ display: "none" }} />
              
            </div>

            {cropping && (
                <div className="cropper">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1} // Set to 1 for a square crop
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={handleCropComplete}
                    />
                    <button onClick={handleCrop}>Crop Image</button>
                    <button onClick={() => setCropping(false)}>Cancel</button>
                </div>
            )}

            <div className="p-2">
                <p className="font-semibold text-[#797570]">Username</p>
                <input className="p-2 border w-full text-[#797570]" value={fetchedUser?.username} onChange={handleDataChange('username')} />
            </div>

            <div className="p-2">
                <p className="font-semibold text-[#797570]">Email</p>
                <input className="p-2 border w-full text-[#797570]" value={fetchedUser?.email} onChange={handleDataChange('email')} />
            </div>

            <div className="p-2">
                <p className="font-semibold text-[#797570]">First Name</p>
                <input className="p-2 border w-full text-[#797570]" value={fetchedUser?.first_name} onChange={handleDataChange('first_name')} />
            </div>

            <div className="p-2">
                <p className="font-semibold text-[#797570]">Last Name</p>
                <input className="p-2 border w-full text-[#797570]" value={fetchedUser?.last_name} onChange={handleDataChange('last_name')} />
            </div>

            <div className="p-2">
                <p className="font-semibold text-[#797570]">Local Government</p>
                <select className="p-2 border w-full text-[#797570]" onChange={handleDataChange('local_governmentID')}>
                    <option value="1">Bauchi</option>
                    <option value="2">Toro</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                    <option value="5">Option 5</option>
                    <option value="6">Option 6</option>
                    <option value="7">Option 7</option>
                </select>
            </div>

            <div className="p-2">
                <p className="font-semibold text-[#797570]">Date of Birth</p>
                <input type="date" className="p-2 border w-full text-[#797570]" value={fetchedUser?.date_of_birth} onChange={handleDataChange('date_of_birth')} />
            </div>

            <div className="p-2">
                <p className="font-semibold text-[#797570]">Personal Phone Number</p>
                <input type="tel" className="p-2 border w-full text-[#797570]" value={fetchedUser?.phone_number} onChange={handleDataChange('phone_number')} />
            </div>
<div className="flex py-4">
            <CTAButton title={"Update Profile"}/>
            </div>
        </>
    );
};

export default UserProfileEdit;

// The getCroppedImg function remains unchanged
const getCroppedImg = async (imageSrc, pixelCrop) => {
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
};
