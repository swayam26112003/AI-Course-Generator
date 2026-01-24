const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
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
        description:
          "Optional code snippet. Must be formatted as a string containing HTML <pre><code>...</code></pre> tags. Can be an empty string if not applicable.",
      },
    },
    required: ["title", "description"],
  },
};

const genAI_Content = new GoogleGenerativeAI(apiKeyContent);
const contentModel = genAI_Content.getGenerativeModel({
  model: "gemini-flash-latest",

  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: CHAPTER_CONTENT_SCHEMA,
  },

  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],
});
async function generateWithRetry(prompt, retries = 3, delay = 2000) {
  try {
    return await contentModel.generateContent(prompt);
  } catch (err) {
    if (retries === 0) throw err;
    await new Promise((res) => setTimeout(res, delay));
    return generateWithRetry(prompt, retries - 1, delay * 1.5);
  }
}

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
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 'message'.",
      });
    }

    const result = await generateWithRetry(message);
    const response = result.response;
    const aiResponseText = response.text();

    let parsed;
    try {
      parsed = JSON.parse(aiResponseText);
    } catch (e) {
      console.error("Invalid JSON from AI:", aiResponseText);
      return res.status(502).json({
        success: false,
        message: "AI returned invalid structured data. Please retry.",
      });
    }

    return res.status(200).json({
      success: true,
      data: parsed,
    });

  } catch (error) {
    console.error("Error in generateChapterContent:", error.message);

    if (error.message?.includes("429")) {
      return res.status(429).json({
        success: false,
        message: "AI rate limit exceeded. Please wait and retry.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to generate chapter content.",
    });
  }
}


module.exports = { generateChapterContent };
