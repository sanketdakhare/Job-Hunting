import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Data Analyst",
  "Mobile Developer",
];

const CategoryCarousel = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Carousel className="w-full ">
        <CarouselContent className="gap-0">
          {category.map((cat, index) => (
            <CarouselItem key={index} className="w-full basis-1/2 md:basis-1/3 lg-basis-1/4  ">
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full bg-richblack-700 text-richblack-5"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"t />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
