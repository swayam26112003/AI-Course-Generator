const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const apiKey = process.env.NODE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("CRITICAL: NODE_GEMINI_API_KEY is not set in .env file.");
}

const COURSE_LAYOUT_SCHEMA = {
  type: "OBJECT",
  properties: {
    courseName: { type: "STRING" },
    description: { type: "STRING" },
    category: { type: "STRING" },
    topic: { type: "STRING" },
    level: { type: "STRING" },
    totalDurationSpecific: { type: "STRING" },
    totalDurationSummary: { type: "STRING" },
    chapters: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          chapterName: { type: "STRING" },
          about: { type: "STRING" },
          duration: { type: "STRING" },
        },
        required: ["chapterName", "about", "duration"],
      },
    },
  },
  required: [
    "courseName", "description", "category", "topic", "level",
    "totalDurationSpecific", "totalDurationSummary", "chapters",
  ],
};

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
  
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: COURSE_LAYOUT_SCHEMA,
  },
  safetySettings: [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  ],
});

async function generateCourseLayout(req, res) {
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      message: "Server is missing API key configuration.",
    });
  }

  try {
    const { message } = req.body; 

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 'message' in request body.",
      });
    }
    
    const result = await model.generateContent(message);
    const response = result.response;
    
    const aiResponseText = response.text();

    const parsed = JSON.parse(aiResponseText); 

    res.status(200).json({
      success: true,
      data: parsed,
    });

  } catch (error) {
    console.error("Error in generateCourseLayout:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to generate course layout.",
      error: error.message,
    });
  }
}

module.exports = { generateCourseLayout };