import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-richblack-900 h-screen overflow-auto">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-richblack-800 border border-richblack-700 rounded-xl my-5 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center gap-4 mb-5 md:mb-0">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl text-white">
                {user?.fullname}
              </h1>
              <p className="text-richblack-5">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right bg-richblack-800 border-richblack-700 hover:bg-gray-700 mt-5 md:mt-0"
            variant="outline"
          >
            <Pen className="text-white " />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail className="text-white" />
            <span className="text-richblack-5">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact className="text-white" />
            <span className="text-richblack-5">{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="text-white text-lg">Skills</h1>
          <div className="flex flex-wrap items-center gap-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className={"text-white bg-richblack-900 mt-2"}
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold text-white">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto rounded-xl bg-richblack-800 border border-richblack-700 mt-5 mb-10 p-4 md:p-6">
        <h1 className="font-bold text-lg text-white">Applied Jobs</h1>
        {/* Applied Job Table */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
