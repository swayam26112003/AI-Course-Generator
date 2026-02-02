import React from "react";
import { FaRegClock } from "react-icons/fa";

function ChapterListCard({ chapter, index }) {
  return (
    <div
      className="
        flex gap-3 items-start p-3 sm:p-4 
        border-b hover:bg-gray-50 transition
      "
    >
      {/* Index */}
      <div className="flex-shrink-0">
        <h2
          className="
            bg-blue-400 text-white 
            w-8 h-8 sm:w-9 sm:h-9 
            rounded-full flex items-center justify-center 
            text-sm font-semibold
          "
        >
          {index + 1}
        </h2>
      </div>

      <div className="flex-1">
        <h2 className="font-medium text-sm sm:text-base leading-snug">
          {chapter.chapterName}
        </h2>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-400 mt-1">
          <FaRegClock className="flex-shrink-0" />
          <span>{chapter.duration}</span>
        </div>
      </div>
    </div>
  );
}

export default ChapterListCard;
