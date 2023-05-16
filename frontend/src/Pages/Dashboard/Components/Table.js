import React, { useEffect, useState } from "react";
import Loader from "../../../Assets/Lotties/Loader.json";
import Lottie from "lottie-react";
import { BASE_URL } from "../../../Config/url";

export default function Table({ selected }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    // logged in user
    // console.log(user, "user");

    const fetchData = async () => {
        setLoading(true);
        let user = localStorage.getItem("user");

        // console.log("Table.js " + user);
        // console.log("this is logged in " + user);
        // console.log("this is logged in NAME " + user.name);
        // console.log("this is logged in PARSED " + JSON.parse(user));
        // console.log("this is logged in PARSED NAME " + JSON.parse(user).user.name);

        try {
            const response = await fetch(`${BASE_URL}/bookings/all`);
            // const response = await fetch(`${BASE_URL}/bookings/all`,{
            //     params: {}
            // });
            var dataLocal = await response.json();
            console.log("this is dataLocal")
            console.log(dataLocal)
            console.log("datalocal ends here")

            // change bookingFrom and bookingTo from unix to date and time
            dataLocal.filtered_bookings.forEach((item) => {
                const currentTime = new Date().getTime();
                const bookingFrom = new Date(item.bookingFrom).getTime();
                const bookingTo = new Date(item.bookingTo).getTime();

                if (currentTime >= bookingFrom && currentTime <= bookingTo)
                    item.status = "checked in";
                else if (currentTime > bookingTo)
                    item.status = "checked out";
                else item.status = "not checked in";

                item.bookingFrom = new Date(item.bookingFrom).toLocaleString();
                item.bookingTo = new Date(
                    item.bookingTo
                ).toLocaleString();
            });
            const filterData = dataLocal.filtered_bookings;
            setFilteredData(filterData);
            setData(filterData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError("Something went wrong");
        }
    };
    // use effect
    useEffect(() => {
        console.log("useEffect");
        fetchData();
    }, []);

    useEffect(() => {
        if (selected === "all") return setData(filteredData);
        const filterData = data.filter((item) =>
            selected ? item.status === selected : true
        );
        setData(filterData);
    }, [selected]);

    const headings = [
        {
            id: 1,
            name: "Car No.",
        },
        {
            id: 2,
            name: "Car Type",
        },
        {
            id: 3,
            name: "Customer",
        },
        {
            id: 4,
            name: "Start time",
        },
        {
            id: 5,
            name: "End time",
        },
        {
            id: 6,
            name: "Amount",
        },
        {
            id: 7,
            name: "Status",
        },
    ];

    return (
        <table className="w-full min-w-[10rem] overflow-auto">
            <thead className="bg-zinc-100 bg-opacity-50">
                <tr>
                    {headings.map((item) => {
                        return (
                            <td
                                key={item.id}
                                className="py-3 px-4 min-w-[150px] text-zinc-600"
                            >
                                <p>{item.name}</p>
                            </td>
                        );
                    })}
                </tr>
            </thead>
            <tbody className="bg-white text-black">
                {loading ? (
                    <tr>
                        <td colSpan="7">
                            <div className="w-full flex flex-col justify-center items-center">
                                <Lottie
                                    className="w-52"
                                    animationData={Loader}
                                    loop={true}
                                />
                                <p className="-mt-8 pb-2">Loading...</p>
                            </div>
                        </td>
                    </tr>
                ) : (
                    data.map((item) => {
                        return (
                            <tr className="border-b" key={item._id}>
                                <td className="py-2 px-4">
                                    {item.carID.carNumber}
                                </td>
                                <td className="py-2 px-4">
                                    {item.carID.carType}
                                </td>
                                <td className="py-2 px-4">{item.userName}</td>
                                <td className="py-2 px-4">
                                    {item.bookingFrom}
                                </td>
                                <td className="py-2 px-4">
                                    {item.bookingTo}
                                </td>
                                <td className="py-2 px-4">{item.totalPrice}</td>
                                <td className="py-2 px-4">
                                    <p
                                        className={`border w-[max-content] px-2 py-1 rounded-md text-[14px] capitalize
                    ${item.status === "checked in" && "bg-red-200 text-red-700"}
                    ${
                        item.status === "checked out" &&
                        "bg-green-200 text-green-700"
                    }
                    ${
                        item.status === "not checked in" &&
                        "bg-yellow-200 text-yellow-700"
                    }
                  `}
                                    >
                                        &#x2022; &nbsp;{item.status}
                                    </p>
                                </td>
                            </tr>
                        );
                    })
                )}
            </tbody>
        </table>
    );
}
