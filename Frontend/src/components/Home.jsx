import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {

  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   // Call useGetAllJobs every time the component is mounted or the location changes
  //   useGetAllJobs();
  // }, [location]);

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div className="bg-richblack-900">
      <Navbar />
      <main className="px-4 md:px-8 lg:px-16">
        <HeroSection />
        <section className="my-8">
          <CategoryCarousel />
        </section>
        <section className="my-8">
          <LatestJobs />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
