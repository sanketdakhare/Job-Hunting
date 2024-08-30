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
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
    <div className="bg-richblack-800 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={submitHandler}
          autoComplete="off"
          className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 border border-richblack-700 shadow-2xl rounded-md p-4 sm:p-6 lg:p-8 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-richblack-5">Login</h1>
          <div className="my-2">
            <Label className="text-richblack-5 text-[16px]">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="xyz@gmail.com"
              className="bg-richblack-800 rounded-[0.5rem] py-6 text-richblack-5 w-full  border-none mt-2"
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
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full py-6 border-none mt-2"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label
                  htmlFor="r1"
                  className=" text-richblack-5 text-[16px] mb-1 leading-[1.375rem]"
                >
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
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-[16px]" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-yellow-300 text-richblack-900 font-bold p-5 text-[16px] hover:bg-yellow-400"
            >
              Login
            </Button>
          )}
          <div className="mt-4">
            <span className="text-sm text-richblack-100">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600">
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
