import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs, searchedQuery, maxsalary,minsalary } = useSelector(
    (store) => store.job
  );
  const [filterJobs, setFilterJobs] = useState(allJobs);


  useEffect(()=>{
    if(minsalary && maxsalary){
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.salary >= minsalary && job.salary<= maxsalary
        );
      });
      setFilterJobs(filteredJobs);
    }else{
      setFilterJobs(allJobs);
    }
  },[allJobs,searchedQuery,maxsalary,minsalary])


  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase()) 
          //job.salary >= minsalary && job.salary<= maxsalary
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }

  }, [allJobs, searchedQuery]);

  return (
    <div className="bg-richblack-900 min-h-screen overflow-hidden">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex flex-col md:flex-row gap-5 w-full">
          <div className="w-full md:w-1/4 lg:w-1/5">
            <FilterCard />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pb-5">
              {filterJobs.length <= 0 ? (
                <span className="text-white font-bold flex justify-center items-center h-full text-[25px]">
                  Job not found
                </span>
              ) : (
                filterJobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};
export default Jobs;
