import React, { useEffect, useState } from "react";
import avatar from "../../Assets/avatar.png";
import Lottie from "lottie-react";
import Success from "../../Assets/Lotties/Success.json";
import Loader from "../../Assets/Lotties/Loader.json";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../Config/url";
import Error from "../../Components/Error";

export default function BookNow() {
    const navigate = useNavigate();

    const [input, setinput] = useState({
        name: "",
        phonenumber: null,
        email: "",
        password: "",
    });

    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setinput({ ...input, [name]: value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
    }

    function Addusertodb(e) {
        e.preventDefault();
        if (input.password !== "" || input.email !== "") {
            setLoading1(true);
            fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(input),
            })
                .then(() => {
                    // setLoading2(true);
                    console.log("success");
                    setLoading1(false);
                    setLoading2(true);
                    setTimeout(() => {
                        navigate("/login");
                        setLoading2(false);
                    }, 2000);
                })
                .catch((err) => {
                    console.log(err, "err");
                    setError(err);
                    setLoading1(false);
                });

        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col xl:flex-row gap-10">
                <div className="w-full xl:w-[25%] flex flex-col justify-center xl:justify-start items-center xl:items-start gap-10">
                    <div>
                        <img
                            src={avatar}
                            alt="profile_picture"
                            className="w-24 rounded-full"
                        />
                    </div>

                    <div className="text-md text-gray-500">
                        <p className="text-center xl:text-left">
                            Enter the required information to register.
                        </p>
                        <p className="text-center xl:text-left ">
                            {" "}
                            These are editable.{" "}
                        </p>
                    </div>
                </div>

                {/* username, email, roomType, startTime, endTime, roomNumber  */}
                <div className="flex flex-col md:flex-row gap-5 xl:gap-10 justify-between flex-1">
                    <div className="flex-1 flex flex-col gap-4">
                        {/* Username */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-lg">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                                className="outline-none w-full px-2 py-3 border rounded-md shadow focus:shadow-lg transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-lg">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                placeholder="abc@email.com"
                                required
                                className="outline-none w-full px-2 py-3 border rounded-md shadow focus:shadow-lg transition-all"
                            />
                        </div>

                        {/* Room Details */}
                        <div className="flex gap-3">
                            <div className="flex-1 flex flex-col gap-2">
                                <label htmlFor="" className="text-lg">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="outline-none w-full px-2 py-3 border rounded-md shadow focus:shadow-lg transition-all"
                                />
                            </div>
                            {/* <div className="flex-1 flex flex-col gap-2">
                                <label htmlFor="" className="text-lg">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="roomNumber"
                                    onChange={handleChange}
                                    placeholder="Confirm"
                                    className="outline-none w-full px-2 py-3 border rounded-md shadow focus:shadow-lg transition-all"
                                />
                            </div> */}

                            <div className="flex-1 flex flex-col gap-2">
                                <label htmlFor="" className="text-lg">
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    name="phonenumber"
                                    onChange={handleChange}
                                    placeholder="Optional"
                                    className="outline-none w-full px-2 py-3 border rounded-md shadow focus:shadow-lg transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex item-center w-full justify-end mt-5">
                <button
                    onClick={Addusertodb}
                    className="px-2 w-full xl:w-52 py-6 rounded-xl bg-black text-white hover:bg-[#000000] hover:shadow-xl transition-all"
                >
                    Sign Up
                </button>
            </div>

            <AnimatePresence>
                {loading1 && (
                    <div className="bg-[#FDFDFD] bg-opacity-90 w-full h-full absolute top-0 left-0 flex items-center justify-center">
                        <Lottie
                            animationData={Loader}
                            className="w-[10rem]"
                            loop={false}
                        />
                    </div>
                )}
                {loading2 && (
                    <div className="bg-[#FDFDFD] bg-opacity-90 w-full h-full absolute top-0 left-0 flex items-center justify-center">
                        <Lottie
                            animationData={Success}
                            className="w-[10rem]"
                            loop={false}
                        />
                    </div>
                )}
                {error !== null && <Error error={error} />}
            </AnimatePresence>
        </form>
    );
}
