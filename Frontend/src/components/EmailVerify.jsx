import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import verify from "../assets/verify.png";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${USER_API_END_POINT}/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <div className="bg-richblack-900 h-screen flex items-center justify-center ">
      {validUrl ? (
        <div className="flex flex-col justify-center items-center">
          <img src={verify} width={200} />
          <h1 className="text-white font-bold text-[30px]">
            Email verified successfully
          </h1>

          <Link to="/login" className="text-white fond-bold mt-10 text-[20px] border border-richblack-800 bg-richblack-700 p-2 px-4 rounded-md">LogIn</Link>
        </div>
      ) : (
        <h1 className="text-white font bold flex items-center justify-center ">
          404 Not Found
        </h1>
      )}
    </div>
  );
};

export default EmailVerify;
