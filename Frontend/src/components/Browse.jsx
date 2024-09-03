import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

// const randomJobs = [1, 2,45];

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => {
  //     dispatch(setSearchedQuery(""));
  //   };
  // }, []);
  

  return (
    <div className="bg-richblack-900 h-screen overflow-auto">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-bold text-xl my-8 text-richblack-5">
          Search Results ({allJobs.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
