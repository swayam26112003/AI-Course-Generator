import React, { useContext } from "react";
import { UserInputContext } from "@/_context/UserInputContext";
import CategoryList from "@/_shared/CategoryList";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } =
    useContext(UserInputContext);

  const handleCategoryChange = (Category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      Category,
    }));
  };

  return (
    <div className="px-4 sm:px-8 md:px-20">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
        Select Course Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-10">
        {CategoryList.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCategoryChange(item.name)}
            className={`flex flex-col items-center p-4 sm:p-5 border rounded-xl cursor-pointer transition-all duration-200
              hover:border-blue-500 hover:bg-blue-100
              ${
                userCourseInput?.Category === item.name
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-200"
              }`}
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain rounded-xl"
            />

            <h2 className="mt-2 text-sm sm:text-base font-medium text-center">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;
