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
    <div className="py-8 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-8 text-center">
          Select Course Category
        </h2>

        {/* ✅ MOBILE-FIRST CENTERED GRID */}
        <div className="flex justify-center">
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              gap-4 sm:gap-6
              w-full
              max-w-md sm:max-w-2xl
            "
          >
            {CategoryList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCategoryChange(item.name)}
                className={`flex flex-col items-center justify-center
                  p-5
                  w-full
                  border rounded-2xl
                  cursor-pointer
                  transition-all duration-200
                  hover:border-blue-500 hover:bg-blue-100
                  active:scale-95
                  ${
                    userCourseInput?.Category === item.name
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-200"
                  }`}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
                <h2 className="mt-4 text-sm sm:text-base font-medium text-center">
                  {item.name}
                </h2>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default SelectCategory;
