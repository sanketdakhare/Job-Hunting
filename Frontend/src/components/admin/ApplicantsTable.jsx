import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    console.log("called");
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="overflow-auto">
      <Table className="w-full">
        <TableCaption className="text-richblack-5">
          A list of your recent applied users
        </TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-richblack-900">
            <TableHead className="text-richblack-5 text-sm sm:text-base md:text-lg">
              FullName
            </TableHead>
            <TableHead className="text-richblack-5 text-sm sm:text-base md:text-lg">
              Email
            </TableHead>
            <TableHead className="text-richblack-5 text-sm sm:text-base md:text-lg">
              Contact
            </TableHead>
            <TableHead className="text-richblack-5 text-sm sm:text-base md:text-lg">
              Resume
            </TableHead>
            <TableHead className="text-richblack-5 text-sm sm:text-base md:text-lg">
              Date
            </TableHead>
            <TableHead className="text-right text-richblack-5 text-sm sm:text-base md:text-lg">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr key={item._id} className="text-sm sm:text-base md:text-lg">
                <TableCell className="text-richblack-100">
                  {item?.applicant?.fullname}
                </TableCell>
                <TableCell className="text-richblack-100">
                  {item?.applicant?.email}
                </TableCell>
                <TableCell className="text-richblack-100">
                  {item?.applicant?.phoneNumber}
                </TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell className="text-richblack-100">
                  {item?.applicant.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right cursor-pointer text-richblack-100">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-richblack-800 border-none">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer text-richblack-25"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
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

export default ApplicantsTable;
