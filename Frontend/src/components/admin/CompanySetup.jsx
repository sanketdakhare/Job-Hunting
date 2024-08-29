import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="bg-richblack-900 h-screen overflow-auto sm:h-screen">
      <Navbar />
      <div className="max-w-xl  mx-auto  p-4 sm:p-6 md:p-8 lg:p-10 rounded-md">
        <form
          onSubmit={submitHandler}
          className=" bg-[#4b92bb11] border  border-richblack-800  shadow-2xl rounded-md p-4 sm:p-6 md:p-8 lg:p-10 my-2"
        >
          <div className="flex flex-col mt-[-25px] sm:flex-row items-center gap-5 p-4 sm:p-6 md:p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              //variant="outline"
              className="flex items-center gap-2 text-richblack-5 bg-richblack-700 border-none font-semibold hover:bg-richblack-200"
            >
              <ArrowLeft />
              <span className="font-bold">Back</span>
            </Button>
            <h1 className="font-bold text-lg sm:text-xl text-white">
              Company Setup
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-richblack-25">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="bg-richblack-800 text-richblack-5 border border-richblack-700 mt-2"
              />
            </div>
            <div>
              <Label className="text-richblack-25">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="bg-richblack-800 text-richblack-5 border border-richblack-700 mt-2"
              />
            </div>
            <div>
              <Label className="text-richblack-25">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="bg-richblack-800 text-richblack-5 border border-richblack-700 mt-2"
              />
            </div>
            <div>
              <Label className="text-richblack-25">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="bg-richblack-800 text-richblack-5 border border-richblack-700 mt-2"
              />
            </div>
            <div >
              <Label className="text-richblack-25">Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="bg-richblack-800 text-richblack-5 border border-richblack-700 mt-2 cursor-pointer"
                />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-yellow-300 mt-8 mb-[-6px] text-richblack-900 font-bold hover:bg-yellow-400 "
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
