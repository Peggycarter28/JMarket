import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { getVendorCategoriesService } from "../../service/vendorListingService";
import { ClipLoader } from "react-spinners";

const LeftsideBar = () => {
    const name = "leftsidebar";

    const [categories, setCategories] = useState([]);
    const [loaded, setLoaded] = useState(false); // Start as false until loading is done
    const [offlineFound, setOfflineFound] = useState(false);

    useEffect(() => {
        console.log("Viewing categories");

        const storedCategories = localStorage.getItem("categories");

        if (storedCategories) {
            setCategories(JSON.parse(storedCategories));
            setOfflineFound(true);
            setLoaded(true)
        }
    }, [name]);

    useEffect(() => {
        const fetch = async () => { 
            const res = await getVendorCategoriesService();

            if (res.status === 200 || res.status === 201) {
                setCategories(res.data);
                localStorage.setItem("categories", JSON.stringify(res.data));
                setLoaded(true);
                setOfflineFound(true);
            } else {
                alert("Unable to fetch categories");
                setLoaded(true);
            }
        };

        fetch();
    }, []);

    return (
        <aside className="w-full md:w-[20vw] gap-4 md:gap-none overflow-auto flex md:flex-col mr-none md:mr-4 p-4 h-[90px] md:h-screen md:bg-[#F5F5F5] border border-[#EBEBEB] rounded-lg">
            <div className="flex md:flex-col gap-4 md:gap-1 w-full">
                {loaded && offlineFound && categories.length > 0
                    ? categories.map((item, index) => {
                          return <SidebarItem key={item.name + index} itemObject={item} />;
                      })
                    : loaded && categories.length === 0
                    ? <p>No categories found</p>
                    : (
                        <div className="flex justify-center items-center w-full text-[#EF6C00]">
                          <ClipLoader color="#EF6C00" size={35} />
                        </div>
                    )}
            </div>
        </aside>
    );
};

export default LeftsideBar;
