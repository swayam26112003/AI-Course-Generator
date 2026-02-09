import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import { Menu } from "lucide-react";

function CourseStart() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/course/${courseId}`,
        );
        const data = await res.json();

        if (data.success) {
          setCourse(data.data);
          if (data.data?.courseOutput?.chapters?.length > 0) {
            setSelectedChapter(data.data.courseOutput.chapters[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId]);

  if (loading) return <div>Loading your course...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-white">
        <h2 className="font-semibold text-lg truncate">
          {course?.courseOutput?.courseName}
        </h2>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-md border"
        >
          <Menu />
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:static z-50 md:z-auto
          top-0 left-0 h-full w-64
          bg-blue-50 border-r shadow-sm
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h2 className="font-medium text-lg bg-blue-400 p-3 text-white">
          {course?.courseOutput?.courseName}
        </h2>

        <div className="overflow-y-auto h-full">
          {course?.courseOutput?.chapters.map((chapter, index) => (
            <div
              key={chapter.chapterName}
              onClick={() => {
                setSelectedChapter(chapter);
                setIsSidebarOpen(false);
              }}
              className={`cursor-pointer transition-colors
    ${
      selectedChapter?.chapterName === chapter?.chapterName
        ? "bg-blue-500 text-white"
        : "text-gray-800 hover:bg-blue-100"
    }
  `}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {selectedChapter ? (
          <ChapterContent chapter={selectedChapter} />
        ) : (
          <p>Loading chapter content...</p>
        )}
      </div>
    </div>
  );
}

export default CourseStart;
