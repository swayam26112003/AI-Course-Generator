const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const apiKeyContent = process.env.NODE_GEMINI_API_KEY_2;

if (!apiKeyContent) {
  console.error("CRITICAL: NODE_GEMINI_API_KEY_2 is not set in .env file.");
}

const CHAPTER_CONTENT_SCHEMA = {
  type: "ARRAY",
  items: {
    type: "OBJECT",
    properties: {
      title: { type: "STRING" },
      description: { type: "STRING" },

      codeExample: { 
        type: "STRING", 
        description: "Optional code snippet. Must be formatted as a string containing HTML <pre><code>...</code></pre> tags. Can be an empty string if not applicable." 
      },
    },
    required: ["title", "description"],
  },
};

const genAI_Content = new GoogleGenerativeAI(apiKeyContent);
const contentModel = genAI_Content.getGenerativeModel({
  model: "gemini-3-flash-preview",
  
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: CHAPTER_CONTENT_SCHEMA,
  },
  
  safetySettings: [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  ],
});

async function generateChapterContent(req, res) {
  if (!apiKeyContent) {
    return res.status(500).json({
      success: false,
      message: "Server is missing API key configuration for content.",
    });
  }

  try {
    const { message } = req.body; 

    if (!message) {
      return res.status(400).json({ success: false, message: "Please provide a valid 'message'." });
    }

    const result = await contentModel.generateContent(message);
    const response = result.response;
    
    const aiResponseText = response.text();
    const parsed = JSON.parse(aiResponseText);

    res.status(200).json({ success: true, data: parsed });
    
  } catch (error) {
    console.error("Error in generateChapterContent:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to generate chapter content.",
      error: error.message
    });
  }
}

module.exports = { generateChapterContent };