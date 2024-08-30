import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-between md:flex-row md:justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-600 text-[40px]">
            Job<span className="text-richblack-5 text-[40px]">Portal</span>
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-6 items-center justify-center md:justify-end">
          <ul className="text-richblack-100 flex flex-row gap-2 md:flex-row gap-x-0 md:gap-x-6 mb-4 md:mb-0">
            {user && user.role === "recruiter" ? (
              <div className="flex gap-5 ">
                <li>
                  <Link to="/admin/companies" className="hover:text-gray-500 text-[16px]">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-gray-500 text-[16px] ">
                    Jobs
                  </Link>
                </li>
              </div>
            ) : (
              <div  className="flex gap-4">
                <li>
                  <Link to="/" className="hover:text-gray-500 text-[16px] ">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-gray-500 text-[16px] ">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-gray-500 text-[16px] ">
                    Browse
                  </Link>
                </li>
              </div>
            )}
          </ul>
          {!user ? (
            <div className="flex flex-row md:flex-row gap-4 items-center">
              <Link to="/login">
                <Button className="bg-richblack-900 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 hover:bg-richblack-700 text-[16px] ">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-richblack-900 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 hover:bg-richblack-700 text-[16px] ">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-richblack-800 border-2 border-richblack-700">
                <div>
                  <div className="flex gap-2 mb-4">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white">
                        {user?.fullname}
                      </h4>
                      <p className="text-sm text-muted-foreground text-richblack-5">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col text-richblack-25">
                    {user && user.role === "student" && (
                      <div className="flex items-center gap-2 mb-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile" className="text-richblack-100">
                            View Profile
                          </Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button
                        onClick={logoutHandler}
                        variant="link"
                        className="text-richblack-100"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
