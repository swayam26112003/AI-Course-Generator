import React from "react";
import { Clock } from "lucide-react";
import EditChapters from "./EditChapters";

function ChapterList({ course, onCourseUpdated }) {
  return (
    <div className="mt-5 p-4 sm:p-6 border rounded-xl shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        Edit Course Chapters
      </h2>

      <div className="space-y-4">
        {course?.courseOutput?.chapters?.map((chapter, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg flex flex-col sm:flex-row gap-4"
          >
            <div className="flex items-start sm:items-center">
              <h2
                className="bg-blue-500 h-9 w-9 sm:h-10 sm:w-10 text-white rounded-full
                           flex items-center justify-center font-bold flex-shrink-0"
              >
                {index + 1}
              </h2>
            </div>

            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <h3 className="text-base sm:text-lg font-semibold">
                  {chapter.chapterName}
                </h3>

                <EditChapters
                  course={course}
                  index={index}
                  onCourseUpdated={onCourseUpdated}
                />
              </div>

              <p className="text-sm text-gray-600 mt-1">
                {chapter.about}
              </p>

              <div className="flex items-center gap-1 text-blue-500 text-xs sm:text-sm mt-2">
                <Clock className="h-4 w-4" />
                <span>{chapter.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
