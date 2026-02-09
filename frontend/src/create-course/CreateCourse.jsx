import React, { useEffect, useState, useContext } from "react";
import {
  HiMiniSquares2X2,
  HiLightBulb,
  HiClipboardDocumentCheck,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "@/_context/UserInputContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import LoadingDialog from "./_components/LoadingDialog";

const formatCourseDataForAPI = (
  userInput,
  parsedOutput,
  courseId,
  email,
  userName,
) => {
  const normalizedChapters = (
    parsedOutput.chapters ||
    parsedOutput.Chapters ||
    []
  ).map((chapter, index) => {
    let chapterName =
      chapter.chapterName ||
      chapter.chapter_title ||
      chapter.Chapter_Name ||
      chapter.title ||
      chapter.name;

    if (!chapterName || /^chapter\s*\d+/i.test(chapterName)) {
      if (chapter.about) {
        chapterName = chapter.about
          .replace(/\n/g, " ")
          .split(".")[0]
          .slice(0, 80)
          .trim();
      } else {
        chapterName = `Chapter ${index + 1}`;
      }
    }

    return {
      chapterName,
      about: chapter.about || chapter.About || "No description provided.",
      duration:
        chapter.duration ||
        chapter.Duration ||
        `${chapter.duration_minutes || 15} Minutes`,
    };
  });

  const formattedCourseOutput = {
    courseName:
      parsedOutput.courseName ||
      parsedOutput["Course Name"] ||
      parsedOutput.course_name ||
      userInput?.topic,

    description:
      parsedOutput.description ||
      parsedOutput.Description ||
      "No description provided.",

    category:
      parsedOutput.category || parsedOutput.Category || userInput?.Category,

    topic: parsedOutput.topic || parsedOutput.Topic || userInput?.topic,

    level: parsedOutput.level || parsedOutput.Level || userInput?.level,

    totalDurationSummary:
      parsedOutput.totalDurationSummary ||
      parsedOutput.Total_Duration_Summary ||
      userInput?.duration ||
      "N/A",

    totalDurationSpecific:
      parsedOutput.totalDurationSpecific ||
      parsedOutput.Total_Duration_Specific ||
      userInput?.duration ||
      "N/A",

    chapters: normalizedChapters,
  };

  return {
    id: courseId,
    topic: userInput?.topic,
    level: userInput?.level,
    category: userInput?.Category,
    duration: userInput?.duration,
    includeVideo: userInput?.includeVideo ?? true,
    courseOutput: formattedCourseOutput,
    createdBy: email,
    userName,
  };
};

function CreateCourse() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const [loading, setLoading] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("userName");

    setEmail(storedEmail || "user@example.com");
    setUserName(storedName || "Guest");
  }, []);

  const StepperOptions = [
    { id: 1, name: "Category", icon: <HiMiniSquares2X2 /> },
    { id: 2, name: "Topic & Desc", icon: <HiLightBulb /> },
    { id: 3, name: "Options", icon: <HiClipboardDocumentCheck /> },
  ];

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  const GenerateCourseLayout = async () => {
    setLoading(true);

    const FINAL_PROMPT = `
      Generate a course tutorial with the following details:
      - Topic: ${userCourseInput?.topic}
      - Category: ${userCourseInput?.Category}
      - Level: ${userCourseInput?.level}
      - Duration: ${userCourseInput?.duration}
      - Number of Chapters: ${userCourseInput?.noOfChapters}
      - Description: ${userCourseInput?.description}
    `;

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/ai/generate-course`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: FINAL_PROMPT }),
      },
    );

    const data = await response.json();
    console.log("Generated Response:", data);

    if (data.success) {
      const parsed = data.data;
      setGeneratedCourse(parsed);
      const courseId = uuidv4();

      const apiData = formatCourseDataForAPI(
        userCourseInput,
        parsed,
        courseId,
        email,
        userName,
      );

      const saveResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/course/save`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(apiData),
        },
      );

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json();
        throw new Error(`Failed to save course: ${errorData.message}`);
      }

      navigate(`/create-course/${courseId}`);
    } else {
      console.error("AI generation failed:", data.message || data.error);
      if (data.rawText) {
        console.error("AI returned this invalid text:", data.rawText);
      }
    }

    setLoading(false);
  };

  const checkStatus = () => {
    if (!userCourseInput || Object.keys(userCourseInput).length === 0) {
      return true;
    }
    if (activeIndex === 0 && !userCourseInput.Category) {
      return true;
    }
    if (activeIndex === 1 && !userCourseInput.topic) {
      return true;
    }
    if (
      activeIndex === 2 &&
      (!userCourseInput.level ||
        !userCourseInput.duration ||
        !userCourseInput.noOfChapters)
    ) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <LoadingDialog loading={loading} />
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-blue-600 font-bold">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div key={item.id} className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`p-3 rounded-full 
                    ${
                      activeIndex >= index
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-500"
                    }
                  `}
                >
                  {item.icon}
                </div>
                <h2
                  className={`hidden md:block text-sm mt-2 
                    ${activeIndex >= index ? "text-black" : "text-gray-500"}
                  `}
                >
                  {item.name}
                </h2>
              </div>
              {index !== StepperOptions.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] rounded-full 
                    ${activeIndex - 1 >= index ? "bg-black" : "bg-gray-300"}
                  `}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {activeIndex == 0 ? (
          <SelectCategory />
        ) : activeIndex == 1 ? (
          <TopicDescription />
        ) : (
          <SelectOption />
        )}
      </div>

      <div
        className="
  flex flex-col sm:flex-row
  items-center justify-center
  gap-4 sm:gap-10
  mt-10
"
      >
        <Button
          size="lg"
          disabled={activeIndex === 0}
          onClick={() => setActiveIndex(activeIndex - 1)}
          className="w-full sm:w-auto"
        >
          Previous
        </Button>

        {activeIndex < 2 && (
          <Button
            disabled={checkStatus()}
            size="lg"
            onClick={() => setActiveIndex(activeIndex + 1)}
            className="w-full sm:w-auto"
          >
            Next
          </Button>
        )}

        {activeIndex == 2 && (
          <Button
            disabled={checkStatus() || loading}
            size="lg"
            onClick={GenerateCourseLayout}
            className="w-full sm:w-auto"
          >
            {loading ? "Generating..." : "Generate Course Layout"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default CreateCourse;
