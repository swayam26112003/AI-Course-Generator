import React, { useContext } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserInputContext } from '@/_context/UserInputContext';

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  return (
    <div className="py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-8 border border-gray-200">
        
        <div className="text-center">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 font-sans mb-2">
            🧠 Course Topic & Description
          </h2>
          <p className="text-gray-500 text-sm lg:text-base">
            Provide a topic and optional details to generate your personalized course.
          </p>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            📝 Topic
          </label>
          <p className="text-sm text-gray-500 mb-3">
            Enter the topic you want to generate a course for (e.g., Python Course, Yoga, Web Development, etc.)
          </p>
          <Input
            className="mt-2 w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            placeholder="Enter your course topic"
            defaultValue={userCourseInput?.topic}
            onChange={(e) => handleInputChange('topic', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            💡 Description (Optional)
          </label>
          <p className="text-sm text-gray-500 mb-3">
            Add a few lines describing what you’d like to include in the course. (e.g., beginner to advanced lessons, hands-on projects, etc.)
          </p>
          <Textarea
            className="mt-2 w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            rows={5}
            placeholder="Describe your course idea"
            defaultValue={userCourseInput?.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>

        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 italic">
            ✨ The more context you provide, the better your generated course will be!
          </p>
        </div>

      </div>
    </div>
  );
}

export default TopicDescription;

