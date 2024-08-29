import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const colorHandler = () => {};

  return (
    <div className="text-center px-4 md:px-8 lg:px-16">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-richblack-800 text-richblack-5 font-medium my-4">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-richblack-700">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-richblack-25">Dream Jobs</span>
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-richblack-5 mt-2 mb-1 font-bold">
          Every step you take brings you closer to the opportunity that will
          change your life—keep pushing forward, <br />
          your dream job is waiting for you!
        </p>
        <div className="flex justify-center">
          <div className="flex w-full md:w-4/5 lg:w-3/5 mb-5 bg-richblack-800 shadow-lg pl-3 rounded-full items-center gap-4 mx-auto mt-5 hover:border">
            <input
              type="text"
              placeholder="Find your dream jobs"
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none border-none w-full bg-richblack-800 text-richblack-5 p-4 rounded-full"
            />
            <Button
              onClick={searchJobHandler}
              className="rounded-r-full bg-richblack-800 hover:bg-richblack-800"
            >
              <Search className="h-5 w-5 text-richblack-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
