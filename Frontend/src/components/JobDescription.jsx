import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="bg-richblack-900 min-h-screen w-full overflow-hidden">
      <div className="flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-lg mt-36 bg-richblack-800 border border-richblack-700 px-4 py-5 rounded-lg sm:px-6 sm:py-6 md:max-w-xl lg:max-w-2xl lg:px-8 lg:py-8">
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-white sm:text-2xl">
                {singleJob?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="text-blue-700 font-bold" variant="ghost">
                  {singleJob?.position} Positions
                </Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">
                  {singleJob?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">
                  {singleJob?.salary}LPA
                </Badge>
              </div>
            </div>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`mt-4 md:mt-0 rounded-lg ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#7209b7] hover:bg-[#5f32ad]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
          <h1 className="border-b-2 border-gray-300 font-medium py-4 text-richblack-5">
            Job Description
          </h1>
          <div className="space-y-4">
            <div className="text-richblack-25">
              <h1 className="font-bold">
                Role:{" "}
                <span className="pl-4 font-normal text-gray-400">
                  {singleJob?.title}
                </span>
              </h1>
              <h1 className="font-bold">
                Location:{" "}
                <span className="pl-4 font-normal text-gray-400">
                  {singleJob?.location}
                </span>
              </h1>
              <h1 className="font-bold">
                Description:{" "}
                <span className="pl-4 font-normal text-gray-400">
                  {singleJob?.description}
                </span>
              </h1>
              <h1 className="font-bold">
                Experience:{" "}
                <span className="pl-4 font-normal text-gray-400">
                  {singleJob?.experienceLevel} yrs
                </span>
              </h1>
              <h1 className="font-bold">
                Salary:{" "}
                <span className="pl-4 font-normal text-gray-400">
                  {singleJob?.salary}LPA
                </span>
              </h1>
              <h1 className="font-bold">
                Total Applicants:{" "}
                <span className="pl-4 font-normal text-gray-400">
                  {singleJob?.applications?.length}
                </span>
              </h1>
              <h1 className="font-bold">
                Posted Date:{" "}
                <span className="pl-4 font-normal text-gray-400">
                  {singleJob?.createdAt.split("T")[0]}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
