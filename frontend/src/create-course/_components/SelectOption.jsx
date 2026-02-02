import React, { useContext } from "react";
import { UserInputContext } from "@/_context/UserInputContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

function SelectOption() {
  const { userCourseInput, setUserCourseInput } =
    useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="py-6 sm:py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-5 sm:p-8 border border-gray-200">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
            ⚙️ Course Configuration
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm lg:text-base mt-2">
            Customize your course options — choose difficulty, duration, and chapters.
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Difficulty */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              🎯 Difficulty Level
            </label>
            <Select
              onValueChange={(value) => handleInputChange("level", value)}
              defaultValue={userCourseInput?.level}
            >
              <SelectTrigger className="h-12 sm:h-14 text-sm sm:text-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl">
                <SelectValue placeholder="Select difficulty level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advance">Advance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              ⏳ Course Duration
            </label>
            <Select
              onValueChange={(value) => handleInputChange("duration", value)}
              defaultValue={userCourseInput?.duration}
            >
              <SelectTrigger className="h-12 sm:h-14 text-sm sm:text-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 Hour">1 Hour</SelectItem>
                <SelectItem value="2 Hours">2 Hours</SelectItem>
                <SelectItem value="More than 3 Hours">
                  More than 3 Hours
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Chapters */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              📚 No. of Chapters
            </label>
            <Input
              type="number"
              className="h-12 sm:h-14 text-sm sm:text-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl"
              value={userCourseInput?.noOfChapters || ""}
              placeholder="Enter number of chapters"
              onChange={(event) =>
                handleInputChange("noOfChapters", event.target.value)
              }
            />
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 sm:mt-10 border-t border-gray-100 pt-4 sm:pt-6">
          <p className="text-[11px] sm:text-xs text-gray-400 italic">
            💡 Tip: Choosing accurate options improves course quality.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SelectOption;
