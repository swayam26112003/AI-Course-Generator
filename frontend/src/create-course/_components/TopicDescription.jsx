import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserInputContext } from "@/_context/UserInputContext";

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } =
    useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="py-6 sm:py-10 px-3 sm:px-6 md:px-10">
      <div
        className="
          max-w-xl sm:max-w-2xl lg:max-w-3xl
          mx-auto
          bg-white
          shadow-lg
          rounded-2xl
          p-4 sm:p-6 md:p-8
          space-y-5 sm:space-y-8
          border border-gray-200
        "
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-2">
            🧠 Course Topic & Description
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500">
            Provide a topic and optional details to generate your personalized course.
          </p>
        </div>

        {/* Topic */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            📝 Topic
          </label>
          <p className="text-xs sm:text-sm text-gray-500 mb-3">
            Enter the topic you want to generate a course for (e.g., Python, Yoga, Web Development).
          </p>
          <Input
            className="w-full h-11 sm:h-12 md:h-14 text-sm sm:text-base border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            placeholder="Enter your course topic"
            defaultValue={userCourseInput?.topic}
            onChange={(e) => handleInputChange("topic", e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            💡 Description (Optional)
          </label>
          <p className="text-xs sm:text-sm text-gray-500 mb-3">
            Add a few lines describing what you’d like to include (projects, level, goals, etc.).
          </p>
          <Textarea
            className="w-full min-h-[100px] sm:min-h-[120px] md:min-h-[150px] text-sm sm:text-base border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            rows={4}
            placeholder="Describe your course idea"
            defaultValue={userCourseInput?.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>

        {/* Footer Note */}
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-[11px] sm:text-xs text-gray-400 italic">
            ✨ The more context you provide, the better your generated course will be!
          </p>
        </div>
      </div>
    </div>
  );
}

export default TopicDescription;
