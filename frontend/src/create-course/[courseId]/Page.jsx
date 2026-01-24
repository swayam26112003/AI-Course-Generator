import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import LoadingDialog from "../_components/LoadingDialog";
import { Loader2 } from "lucide-react";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function CourseLayout() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isChapterLoading, setIsChapterLoading] = useState(false);
  const [generatedContentMap, setGeneratedContentMap] = useState({});
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/course/${courseId}`,
        );
        const data = await res.json();
        if (data.success) {
          setCourse(data.data);
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

  if (loading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found.</p>;

  /**
   * @param {object} chapter
   */

  const generateChapterContent = async (chapter) => {
    const courseName = course?.courseOutput?.courseName;
    const chapterName = chapter.chapterName;

    try {
      const textPrompt = `
Explain the concept in detail for the following:
Topic: "${courseName}"
Chapter: "${chapterName}"

The explanation should be written in Hinglish (a mix of Hindi and English).
If applicable, provide a code example formatted as an HTML <pre><code> block.
`;

      const videoQuery = `${courseName} ${chapterName} tutorial`;

      const textResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/ai/generate-chapter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: textPrompt }),
        },
      );

      if (!textResponse.ok) {
        throw new Error("Failed to fetch AI content");
      }

      const textData = await textResponse.json();

      await sleep(6000);

      const videoResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/ai/get-videos?q=${encodeURIComponent(videoQuery)}`,
      );

      if (!videoResponse.ok) {
        throw new Error("Failed to fetch videos");
      }

      const videoData = await videoResponse.json();

      if (textData.success && videoData.success) {
        const savePayload = {
          courseId,
          chapterName,
          textContent: textData.data,
          videos: videoData.data,
        };

        await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/course/save-chapter-content`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(savePayload),
          },
        );

        setGeneratedContentMap((prev) => ({
          ...prev,
          [chapterName]: {
            textContent: textData.data,
            videos: videoData.data,
          },
        }));

        console.log(`Generated content for chapter: ${chapterName}`);
      }
    } catch (error) {
      console.error(
        `Error generating content for ${chapterName}:`,
        error.message,
      );
    }
  };

  const GenerateAllChapterContent = async () => {
    setIsChapterLoading(true);

    const chapters = course?.courseOutput?.chapters;
    if (!chapters) {
      console.error("No chapters found in course.");
      setIsChapterLoading(false);
      return;
    }

    for (const chapter of chapters) {
      if (!chapter.content || chapter.content.length === 0) {
        console.log(`Generating content for ${chapter.chapterName}...`);
        await generateChapterContent(chapter);
        await sleep(40000);
      }
    }
    setIsChapterLoading(false);
  };
  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <LoadingDialog loading={isChapterLoading} />
      <h2 className="font-bold text-center text-4xl">Course Layout</h2>
      {/* Basic Info */}
      <CourseBasicInfo course={course} />
      {/* course detail */}
      <CourseDetail course={course} />
      {/* List of Lessons */}
      <ChapterList course={course} />

      <Button
        onClick={GenerateAllChapterContent}
        className="my-10 w-xl"
        disabled={isChapterLoading}
      >
        {isChapterLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        {isChapterLoading
          ? "Generating All Content..."
          : "Generate All Chapter Content"}
      </Button>
    </div>
  );
}

export default CourseLayout;
