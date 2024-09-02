import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setminsalary, setmaxsalary, setSearchedQuery } from "@/redux/jobSlice";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Job Role",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary",
    array: ["0LPA - 5LPA", "5LPA - 8LPA", "8LPA - 10LPA"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  // Load the saved filter value when the component mounts
  useEffect(() => {
    const savedValue = localStorage.getItem("selectedFilter");
    if (savedValue) {
      setSelectedValue(savedValue);
    }
  }, []);

  const changeHandler = (value) => {
    // If the same item is clicked twice, clear the selection
    if (selectedValue === value) {
      setSelectedValue("");
      localStorage.removeItem("selectedFilter");
    } else {
      setSelectedValue(value);
      localStorage.setItem("selectedFilter", value);
    }
  };


  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
    if (selectedValue.includes("LPA")) {
      const [minSalaryStr, maxSalaryStr] = selectedValue
        .replace("LPA", "")
        .split(" - ");

      const minSalary = parseFloat(minSalaryStr.trim());
      const maxSalary = parseFloat(maxSalaryStr.trim());

      dispatch(setminsalary(minSalary));
      dispatch(setmaxsalary(maxSalary));
    }else{
      dispatch(setSearchedQuery(selectedValue));
    }
  }, [selectedValue]);

  return (
    <div className="w-full bg-[#1b1c1d11] p-4 rounded-md border border-richblack-700 overflow-auto">
      <h1 className=" text-[rgb(255,255,255)] font-bold text-lg sm:text-xl md:text-2xl">
        Filter Jobs
      </h1>
      <div className="bg-richblack-100">
        <hr className="mt-3 opacity-0" />
      </div>
      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="mt-2"
      >
        {fitlerData.map((data, index) => (
          <div key={index} className="mb-1">
            <h1 className="font-bold text-base sm:text-lg md:text-xl text-gray-100 mt-3">
              {data.fitlerType}
            </h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div
                  key={itemId}
                  className="flex items-center space-x-2 my-1 text-gray-300"
                >
                  <RadioGroupItem
                    className="bg-gray-700"
                    value={item}
                    id={itemId}
                    onClick={() => changeHandler(item)} // Handle double-click to remove the filter
                  />
                  <Label
                    htmlFor={itemId}
                    className="text-sm sm:text-base md:text-lg "
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
