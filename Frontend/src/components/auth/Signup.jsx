import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [files , setfiles] =useState("Choose File")

  // Check Valid Password or Not
  const isValidPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Check Valid Mobile Number or Not
  const isValidPhoneNumber = (phoneNumber) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  };

  // Check Valid Email or Not
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(); //formdata object
    formData.append("fullname", input.fullname);

    const email = isValidEmail(input.email);

    if (!email) {
      return toast.error("email address is not valid");
    }
    formData.append("email", input.email);

    const numb = isValidPhoneNumber(input.phoneNumber);

    if (!numb) {
      return toast.error("Invalid Mobile Number");
    }
    formData.append("phoneNumber", input.phoneNumber);

    const pass = isValidPassword(input.password);

    if (!pass) {
      return toast.error(
        "Password at least have 1 uppercase letter, 1 lowercase letter, 1 special Character and must be length of 8 character "
      );
    }

    formData.append("password", input.password);

    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="bg-richblack-900 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={submitHandler}
          autoComplete="off"
          className="w-3/4 sm:w-3/4 md:w-1/2 lg:w-1/3 border border-richblack-700 shadow-2xl rounded-md p-4 sm:p-6 lg:p-8 my-10"
        >
          <h1 className="font-bold text-xl text-[20px] mb-5 text-richblack-5">
            Sign Up
          </h1>
          <div className="my-2">
            <Label className="text-richblack-5 text-[16px]">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="name"
              className="bg-richblack-800 rounded-md text-richblack-5  w-full py-6 border-none mt-2"
            />
          </div>
          <div className="my-2">
            <Label className="text-richblack-5 text-[16px]">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="xyz@gmail.com"
              className="bg-richblack-800 rounded-md text-richblack-5 w-full py-6 border-none mt-2"
            />
          </div>
          <div className="my-2">
            <Label className="text-richblack-5 text-[16px]">Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="9657000000"
              className="bg-richblack-800 rounded-md text-richblack-5 w-full py-6 border-none mt-2"
            />
          </div>
          <div className="my-2">
            <Label className="text-richblack-5 text-[16px]">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="password"
              className="bg-richblack-800 rounded-md text-richblack-5 w-full py-6 border-none mt-2"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-12 my-5">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1" className="text-richblack-5 text-[16px]">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2" className="text-richblack-5 text-[16px]">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label htmlFor="profile" className="text-richblack-5 text-[16px]">
                Profile
              </Label>
              <div className="relative">
                <Input
                  id="profile"
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="bg-richblack-800 text-white cursor-pointer px-4 py-2 rounded-md">
                    Choose File
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-[16px]" />{" "}
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-yellow-300 text-richblack-900 p-6 font-bold text-[16px] hover:bg-yellow-400"
            >
              Signup
            </Button>
          )}
          <span className="text-sm text-richblack-100">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
