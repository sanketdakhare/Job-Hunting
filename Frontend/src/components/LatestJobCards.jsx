import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-4 md:p-5 rounded-md shadow-lg bg-richblack-800 border border-richblack-700 cursor-pointer"
    >
      <div>
        <h1 className="text-lg md:text-xl font-medium text-white">
          {job?.company?.name}
        </h1>
        <p className="text-xs md:text-sm text-richblack-100">India</p>
      </div>
      <div>
        <h1 className="text-md md:text-lg font-bold my-2 text-[#c1bbbb]">
          {job?.title}
        </h1>
        <p className="text-xs md:text-sm text-richblack-100">
          {job?.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge
          className="text-blue-700 font-bold text-xs md:text-sm"
          variant="ghost"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className="text-[#f63e15] font-bold text-xs md:text-sm"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="text-[#a239e9] font-bold text-xs md:text-sm"
          variant="ghost"
        >
          {job?.salary}LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
