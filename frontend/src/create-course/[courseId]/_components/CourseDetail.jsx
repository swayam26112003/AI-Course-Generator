import React from "react";
import { HiOutlineChartBar } from "react-icons/hi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoBookOutline } from "react-icons/io5";
import { FaRegPlayCircle } from "react-icons/fa";

function CourseDetail({ course }) {
  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="flex gap-2">
          <HiOutlineChartBar className="text-4xl text-blue-400" />
          <div>
            <h2 className="text-xs text-gray-500">Skill Level</h2>
            <h2 className="font-medium text-lg">{course?.level}</h2>
          </div>
        </div>

        <div className="flex gap-2">
          <AiOutlineClockCircle className="text-4xl text-blue-400" />
          <div>
            <h2 className="text-xs text-gray-500">Duration</h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.totalDurationSpecific}
            </h2>
          </div>
        </div>

        <div className="flex gap-2">
          <IoBookOutline className="text-4xl text-blue-400" />
          <div>
            <h2 className="text-xs text-gray-500">No. Of Chapters</h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.chapters?.length} Chapters
            </h2>
          </div>
        </div>

        <div className="flex gap-2">
          <FaRegPlayCircle className="text-4xl text-blue-400" />
          <div>
            <h2 className="text-xs text-gray-500">Video Included?</h2>
            <h2 className="font-medium text-lg">
              {course?.includeVideo ? "Yes" : "No"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;