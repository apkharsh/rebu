import React, { useEffect, useState } from "react";
import Loader from "../../../Assets/Lotties/Loader.json";
import Lottie from "lottie-react";
import { BASE_URL } from "../../../Config/url";

export default function Table({ selected }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [user, setUser] = useState({});
    // logged in user
    // console.log(user, "user");

    const fetchData = async () => {
        setLoading(true);
        let user = localStorage.getItem("user");

        let userInfo = await JSON.parse(user);
        userInfo = userInfo.user;
        setUser(userInfo);

        console.log(userInfo);

        try {
            const response = await fetch(`${BASE_URL}/bookings/all`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userInfo._id }),
            });

            const dataLocal = await response.json();

            console.log(dataLocal);


            dataLocal.filtered_bookings.forEach((item) => {
                const currentTime = new Date().getTime();
                const checkInTime = new Date(item.bookingFrom).getTime();
                const checkOutTime = new Date(item.bookingTo).getTime();

                if (currentTime >= checkInTime && currentTime <= checkOutTime)
                    item.status = "checked in";
                else if (currentTime > checkOutTime)
                    item.status = "checked out";
                else item.status = "not checked in";

                item.bookingFrom = new Date(item.bookingFrom).toLocaleString();
                item.bookingTo = new Date(
                    item.bookingTo
                ).toLocaleString();
            });
            const filterData = dataLocal.filtered_bookings;
            setFilteredData(filterData);
            setData(dataLocal.filtered_bookings);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError(err.message);
        }
    };

    useEffect(() => {
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
            name: "Check-in",
        },
        {
            id: 4,
            name: "Check-out",
        },
        {
            id: 5,
            name: "Amount",
        },
        {
            id: 6,
            name: "Status",
        },
        (user.email === 'abc@gmail.com') ? ({
            id: 0,
            name: "Customer Name",
        }) : (<></>)
    ];

    return (
        <>
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
                            if (user.email === 'abc@gmail.com') {
                                return (
                                    <tr className="border-b" key={item._id}>
                                        <td className="py-2 px-4">
                                            {item.carID.carNumber}
                                        </td>
                                        <td className="py-2 px-4">
                                            {item.carID.carType}
                                        </td>
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
                    ${item.status === "checked out" &&
                                                    "bg-green-200 text-green-700"
                                                    }
                    ${item.status === "not checked in" &&
                                                    "bg-yellow-200 text-yellow-700"
                                                    }
                  `}
                                            >
                                                &#x2022; &nbsp;{item.status}
                                            </p>
                                        </td>
                                        {(user.email === 'abc@gmail.com') ? (<td className="py-2 px-4">{item.userName}</td>) : <></>}
                                    </tr>
                                )
                            } else {
                                if (item.email === user.email) {
                                    return (
                                        <tr className="border-b" key={item._id}>
                                            <td className="py-2 px-4">
                                                {item.carID.carNumber}
                                            </td>
                                            <td className="py-2 px-4">
                                                {item.carID.carType}
                                            </td>
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
                        ${item.status === "checked out" &&
                                                        "bg-green-200 text-green-700"
                                                        }
                        ${item.status === "not checked in" &&
                                                        "bg-yellow-200 text-yellow-700"
                                                        }
                      `}
                                                >
                                                    &#x2022; &nbsp;{item.status}
                                                </p>
                                            </td>
                                        </tr>
                                    )
                                }
                            }
                        }))}
                </tbody>
            </table>
        </>
    );
}
