import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";

function CourseStart() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/${courseId}`);
        const data = await res.json();
        if (data.success) {
          setCourse(data.data);
          if (data.data?.courseOutput?.chapters?.length > 0) {
            setSelectedChapter(data.data.courseOutput.chapters[0]);
          }
        } else {
          console.error("Course not found:", data.message);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  if (loading) {
    return <div>Loading your course...</div>;
  }

  return (
    <div className="flex">
      <div className="md:w-64 hidden md:block h-screen bg-blue-50 border-r shadow-sm overflow-y-auto">
        <h2 className="font-medium text-lg bg-blue-400 p-3 text-white">
          {course?.courseOutput?.courseName}
        </h2>
        <div>
          {course?.courseOutput?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer p-3 text-sm 
                          hover:bg-blue-400 hover:text-white
                          ${selectedChapter?.chapterName === chapter?.chapterName && "bg-blue-500 text-white"}`}
              onClick={() => setSelectedChapter(chapter)}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6 h-screen overflow-y-auto">
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