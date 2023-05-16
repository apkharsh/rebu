import React, { useEffect, useState } from "react";
import avatar from "../../Assets/avatar.png";
import Lottie from "lottie-react";
import Success from "../../Assets/Lotties/Success.json";
import Loader from "../../Assets/Lotties/Loader.json";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../Config/url";
import Error from "../../Components/Error";
import {Link} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

export default function BookNow() {
  const navigate = useNavigate();

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(null);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      setLoading1(true);
      fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          // Print the Stringified JSON object
          let stringifyData = JSON.stringify(resData);
          localStorage.setItem("user", stringifyData);

          setLoading1(false);
          setLoading2(true);
          setTimeout(() => {
            setLoading2(false);
            navigate("/dashboard");
          }, 2000);
          // console.log(resData, "resData");
          localStorage.setItem("myInfo", JSON.stringify(resData.data));
        })
        .catch((err) => {
          setLoading1(false);
          setError(err.message);
          console.log("err", err);
        });
    } catch (err) {
      setLoading1(false);
      setError(err.message);
      <Error error={error} />;
    }
  };

  return (
    <div>
        <h1 style={{fontSize:"2.5rem",textAlign:"center",margin:"2rem",fontWeight:"900"}}>REBU</h1>
      <form onSubmit={handleSubmit} className="relative">
        <div style={{ height:"33rem",display:"flex",alignItems:"center",justifyContent:"center" }}>
        <div>
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
=======
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading1(true);
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const resData = await res.json();

            console.log(resData);

            if (res.status !== 200) {
                setLoading1(false);
                setError("Invalid Credentials");
                <Error error={error} />;
                setTimeout(() => {
                    setError(null);
                }, 3000);
            } else {
                let stringifyData = JSON.stringify(resData);
                localStorage.setItem("user", stringifyData);
                setLoading1(false);
                setLoading2(true);
                setTimeout(() => {
                    setLoading2(false);
                    navigate("/dashboard");
                }, 2000);
                localStorage.setItem(
                    "myInfo",
                    JSON.stringify(resData.data)
                );
            }
        } catch (err) {
            setLoading1(false);
            setError(err.message);
            <Error error={error} />;
        }
    };

    const naviToSignUp = () => {
        navigate("/signup");
    };

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
                            Enter the required information to Login.
                        </p>
                    </div>
                </div>

                {/* username, email, roomType, startTime, endTime, roomNumber  */}
                <div className="flex flex-col md:flex-row gap-5 xl:gap-10 justify-between flex-1">
                    <div className="flex-1 flex flex-col gap-4">
                        {/* Username */}

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

                        {/* password Details */}
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
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex item-center w-full justify-end mt-5">
                <button
                    onClick={handleSubmit}
                    className="px-2 w-full xl:w-52 py-6 rounded-xl bg-black text-white hover:bg-[#000000] hover:shadow-xl transition-all"
                >
                    Login
                </button>
            </div>
            <button className="px-2 text-white py-3 rounded-xl" style={{'backgroundColor':'green'}} onClick={naviToSignUp}> Sign Up</button>
>>>>>>> afaf40d7c8def95c475dc49801f119653ff58f04

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

                {/* password Details */}
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
                </div>
              </div>
            </div>
          </div>
          <div className="flex item-center w-full justify-end mt-5">
          <button
              className="px-2 w-full xl:w-52 py-6 m-5 rounded-xl bg-black text-white hover:bg-[#000000] hover:shadow-xl transition-all"
            >
              <Link to={'/signup'}>Register</Link>
            </button>
            <button
              onClick={handleSubmit}
              className="px-2 w-full xl:w-52 py-6 m-5 rounded-xl bg-black text-white hover:bg-[#000000] hover:shadow-xl transition-all"
            >
              Login
            </button>
            
          </div>
          </div>
          
          
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
    </div>
  );
}
