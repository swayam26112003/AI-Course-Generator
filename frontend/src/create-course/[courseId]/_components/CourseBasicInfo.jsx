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
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-3xl capitalize">
              {course?.courseOutput?.courseName || "Untitled Course"}
            </h2>
    
            <EditCourseBasicinfo
              course={course}
              onCourseUpdated={onCourseUpdated}
            />
          </div>

          <p className="text-sm text-gray-500 mt-3">
            {course?.courseOutput?.description || "No description available."}
          </p>

          <h2 className="font-medium mt-2 flex gap-2 items-center text-blue-400">
            <HiOutlinePuzzle /> {course?.category || "Uncategorized"}
          </h2>

          <Link to={`/create-course/${course?.courseId}/start`}>
            <Button className="w-full mt-5 gap-0.5">Start</Button>
          </Link>
        </div>

 
      </div>
    </div>
  );
}

export default CourseBasicInfo;