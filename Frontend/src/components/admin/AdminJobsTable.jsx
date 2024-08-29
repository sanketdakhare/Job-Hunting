import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("called");
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);
  return (
    <div className="overflow-x-auto overflow-auto">
      <Table className="min-w-full ">
        <TableCaption className="text-richblack-5">
          A list of your recent posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-richblack-900">
            <TableHead className="text-richblack-25">Company Name</TableHead>
            <TableHead className="text-richblack-25">Role</TableHead>
            <TableHead className="text-richblack-25">Date</TableHead>
            <TableHead className="text-right text-richblack-25">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <tr key={job._id}>
              <TableCell className="text-richblack-100 whitespace-nowrap">
                {job?.company?.name}
              </TableCell>
              <TableCell className="text-richblack-100 whitespace-nowrap">
                {job?.title}
              </TableCell>
              <TableCell className="text-richblack-100 whitespace-nowrap">
                {job?.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="text-right cursor-pointer whitespace-nowrap">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-richblack-100" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-richblack-800 text-richblack-5 border-none">
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
