import React from "react";
import { FaRegClock } from "react-icons/fa";

function ChapterListCard({ chapter, index }) {
  return (
    <div className="flex gap-3 items-start p-3 sm:p-4 border-b">
      
      <div className="flex-shrink-0">
        <div
          className="
            w-8 h-8 sm:w-9 sm:h-9
            rounded-full
            flex items-center justify-center
            text-sm font-semibold
            bg-current text-white
          "
        >
          {index + 1}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="font-medium text-sm sm:text-base truncate">
          {chapter.chapterName}
        </h2>

        <div className="flex items-center gap-2 text-xs sm:text-sm opacity-80 mt-1">
          <FaRegClock />
          <span>{chapter.duration}</span>
        </div>
      </div>
    </div>
  );
}

export default ChapterListCard;
