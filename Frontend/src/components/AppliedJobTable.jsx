import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption className="text-white mb-3">
          A list of your applied jobs
        </TableCaption>
        <TableHeader >
          <TableRow className="hover:bg-richblack-800">
            <TableHead className="text-richblack-5">Date</TableHead>
            <TableHead className="text-richblack-5">Job Role</TableHead>
            <TableHead className="text-richblack-5">Company</TableHead>
            <TableHead className="text-right text-richblack-5">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-richblack-800">
          {allAppliedJobs.length <= 0 ? (
            <TableRow className="hover:bg-richblack-800">
              <TableCell
                colSpan={4}
                className="text-richblack-25 text-center py-4 "
              >
                You haven't applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell className="text-richblack-25">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="text-richblack-25">
                  {appliedJob.job?.title}
                </TableCell>
                <TableCell className="text-richblack-25">
                  {appliedJob.job?.company?.name}
                </TableCell>
                <TableCell className="text-right text-richblack-25">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-400"
                        : appliedJob.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
