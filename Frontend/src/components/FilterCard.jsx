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

  // Load the saved filter value and salary range when the component mounts
  useEffect(() => {
    const savedValue = localStorage.getItem("selectedFilter");
    const savedMinSalary = localStorage.getItem("minSalary");
    const savedMaxSalary = localStorage.getItem("maxSalary");

    if (savedValue) {
      setSelectedValue(savedValue);
      if (savedMinSalary && savedMaxSalary) {
        dispatch(setminsalary(parseFloat(savedMinSalary)));
        dispatch(setmaxsalary(parseFloat(savedMaxSalary)));
      } else {
        dispatch(setSearchedQuery(savedValue));
      }
    }
  }, [dispatch]);

  const changeHandler = (value) => {
    if (selectedValue === value) {
      setSelectedValue("");
      localStorage.removeItem("selectedFilter");
      localStorage.removeItem("minSalary");
      localStorage.removeItem("maxSalary");
    } else {
      setSelectedValue(value);
      localStorage.setItem("selectedFilter", value);

      if (value.includes("LPA")) {
        const [minSalaryStr, maxSalaryStr] = value
          .replace("LPA", "")
          .split(" - ");

        const minSalary = parseFloat(minSalaryStr.trim());
        const maxSalary = parseFloat(maxSalaryStr.trim());

        localStorage.setItem("minSalary", minSalary);
        localStorage.setItem("maxSalary", maxSalary);

        dispatch(setminsalary(minSalary));
        dispatch(setmaxsalary(maxSalary));
      } else {
        dispatch(setSearchedQuery(value));
        localStorage.removeItem("minSalary");
        localStorage.removeItem("maxSalary");
      }
    }
  };

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
