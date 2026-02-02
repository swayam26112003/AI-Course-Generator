import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { HiOutlinePuzzle } from "react-icons/hi";
import { Link } from "react-router-dom";
import EditCourseBasicinfo from "./EditCourseBasicinfo";

function CourseBasicInfo({ course, onCourseUpdated }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileSelected = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl capitalize break-words">
              {course?.courseOutput?.courseName || "Untitled Course"}
            </h2>

            <EditCourseBasicinfo
              course={course}
              onCourseUpdated={onCourseUpdated}
            />
          </div>

          <p className="text-xs sm:text-sm text-gray-500 mt-3">
            {course?.courseOutput?.description || "No description available."}
          </p>

          <h2 className="font-medium mt-3 flex gap-2 items-center text-blue-400 text-sm sm:text-base">
            <HiOutlinePuzzle className="flex-shrink-0" />
            {course?.category || "Uncategorized"}
          </h2>

          <Link to={`/create-course/${course?.courseId}/start`}>
            <Button className="w-full sm:w-auto mt-5 px-8">
              Start
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
