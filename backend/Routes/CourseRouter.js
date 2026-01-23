const express = require("express");
const CourseModel = require("../Models/CourseModel.js");

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const {
      id,
      topic,
      level,
      category,
      includeVideo,
      courseOutput,
      createdBy,
      userName,
      duration,
    } = req.body;

    let userTotalMinutes = 0;
    if (duration) {
      const numericValue = parseInt(duration);
      userTotalMinutes = duration.toLowerCase().includes("hour")
        ? numericValue * 60
        : numericValue;
    } else {
      userTotalMinutes = courseOutput.chapters.length * 15;
    }

    const numChapters = courseOutput.chapters.length;
    const minutesPerChapter = Math.floor(userTotalMinutes / numChapters) || 15;

    const transformedChapters = courseOutput.chapters.map((chapter, index) => {
      let name =
        chapter.chapterName ||
        chapter.chapter_name ||
        chapter.chapterTitle ||
        chapter.title ||
        chapter.name ||
        chapter["Chapter Name"];

      const isIndexBasedName = (name) => {
        if (!name) return true;

        const lower = name.toLowerCase();
        return /^chapter\s*\d+/i.test(lower) || lower.length < 6;
      };

      const generateTitleFromAbout = (about, index) => {
        if (!about) return `Chapter ${index + 1}`;

        const sentence = about.replace(/\n/g, " ").split(".")[0].trim();

        if (sentence.length < 10) {
          return `Chapter ${index + 1}`;
        }

        return sentence.charAt(0).toUpperCase() + sentence.slice(1);
      };
      if (isIndexBasedName(name)) {
        name = generateTitleFromAbout(chapter.about, index);
      }

      let dur = chapter.duration || chapter.Duration;
      if (
        !dur ||
        dur.toLowerCase().includes("0 minute") ||
        dur.toLowerCase() === "n/a"
      ) {
        dur = `${minutesPerChapter} Minutes`;
      }

      return {
        chapterName: name,
        about: chapter.about || chapter.About || "No description provided.",
        duration: dur,
      };
    });

    const transformedCourseOutput = {
      ...courseOutput,
      chapters: transformedChapters,
    };

    let totalDurationSpecific = `${userTotalMinutes} Minutes`;
    if (userTotalMinutes >= 60) {
      const hours = Math.floor(userTotalMinutes / 60);
      const mins = userTotalMinutes % 60;
      totalDurationSpecific = `${hours} Hour${hours > 1 ? "s" : ""}${
        mins > 0 ? ` ${mins} Mins` : ""
      }`;
    }

    transformedCourseOutput.totalDurationSpecific = totalDurationSpecific;
    transformedCourseOutput.totalDurationSummary =
      duration || `${userTotalMinutes} Minutes`;

    const newCourse = new CourseModel({
      courseId: id,
      name:
        courseOutput.courseName ||
        courseOutput.topic ||
        topic ||
        "Untitled Course",

      level,
      category,
      includeVideo,
      courseOutput: transformedCourseOutput,
      createdBy,
      userName,
    });

    await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course layout saved successfully!",
      data: newCourse,
    });
  } catch (error) {
    console.error("Error saving course layout:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});
router.get("/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await CourseModel.findOne({ courseId: courseId });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

router.put("/update/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const updates = req.body;

    const course = await CourseModel.findOne({ courseId: courseId });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    if (updates.name) course.name = updates.name;

    if (updates.courseOutput) {
      course.courseOutput = updates.courseOutput;

      course.markModified("courseOutput");
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully!",
      data: course,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      console.error("Validation Error:", error.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.message,
      });
    }

    console.error("Error updating course:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

router.post("/save-chapter-content", async (req, res) => {
  try {
    const { courseId, chapterName, textContent, videos } = req.body;

    if (!courseId || !chapterName || !textContent || !videos) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required data." });
    }

    const course = await CourseModel.findOne({ courseId });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found." });
    }

    const chapterIndex = course.courseOutput.chapters.findIndex(
      (chap) => chap.chapterName === chapterName,
    );

    if (chapterIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Chapter not found." });
    }
    let contentArray = textContent;

    if (
      typeof textContent === "object" &&
      textContent !== null &&
      !Array.isArray(textContent)
    ) {
      if (textContent.chapterDetails) {
        contentArray = textContent.chapterDetails;
      } else if (textContent.content_blocks) {
        contentArray = textContent.content_blocks;
      } else if (textContent.chapter_details) {
        contentArray = textContent.chapter_details;
      }
    }

    if (!Array.isArray(contentArray)) {
      console.error(
        " Final contentArray is NOT an array. Original data:",
        JSON.stringify(textContent),
      );
      return res.status(400).json({
        success: false,
        message:
          "Invalid format for textContent. Expected an array or a known object wrapper (like chapterDetails or content_blocks).",
      });
    }

    const formattedContent = contentArray.map((block) => ({
      title: block.title || "Untitled Section",
      description: block.description || "No description provided.",
      codeExample:
        block.codeExample || block["Code Example"] || block.Code_Example || "",
    }));

    if (!Array.isArray(videos)) {
      return res.status(400).json({
        success: false,
        message: "Invalid format for videos. Expected an array.",
      });
    }
    const videoIds = videos.map((video) => video.id.videoId);

    course.courseOutput.chapters[chapterIndex].content = formattedContent;
    course.courseOutput.chapters[chapterIndex].videos = videoIds;

    course.markModified("courseOutput.chapters");
    await course.save();

    res
      .status(200)
      .json({ success: true, message: "Chapter content saved successfully." });
  } catch (error) {
    console.error(" Error saving chapter content:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
});

module.exports = router;
