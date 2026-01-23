import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AddCourse() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name || "Guest");
  }, []);

  return (
    <div className="space-y-16">
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm">
        <div>
          <h2 className="text-2xl font-semibold">
            Welcome back,{" "}
            <span className="text-indigo-600">{userName}</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Harness the power of AI to design, personalize, and launch engaging
            courses effortlessly.
          </p>
        </div>

        <Link to="/create-course">
          <Button size="lg">+ Create AI Course</Button>
        </Link>
      </div>

      <section className="bg-gray-50 py-24 rounded-xl">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What You Need to Provide
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Just a few simple details are required. Our AI handles everything
            else.
          </p>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Course Category",
                desc: (
                  <>
                    Select a category such as <strong>Programming</strong>,{" "}
                    <strong>Health</strong>, or <strong>Creative</strong>.
                  </>
                ),
              },
              {
                title: "Course Topic",
                desc: "Enter the main topic like Python, Web Development, Yoga, or DSA.",
              },
              {
                title: "Course Description",
                desc: "Optionally describe flow, projects, theory, or real-world examples.",
              },
              {
                title: "Difficulty Level",
                desc: (
                  <>
                    Choose <strong>Beginner</strong>,{" "}
                    <strong>Intermediate</strong>, or <strong>Advanced</strong>.
                  </>
                ),
              },
              {
                title: "Course Duration",
                desc: "Select short, medium, or long duration.",
              },
              {
                title: "Number of Chapters",
                desc: "Specify chapters; AI distributes content automatically.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl border shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
             Edit Course Format Created by AI
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Create a complete, structured course in just a few steps.
          </p>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Generate Course Content",
                desc: "Click on Generate All Chapter Content to let AI create chapters and lessons.",
              },
              {
                step: "2",
                title: "AI Builds the Course",
                desc: "It is gonna take some time to Create Detailed chapters, duration, and learning flow are created .",
              },
              {
                step: "3",
                title: "Start Course",
                desc: "After Generating the Complete Course then Click on Start Button.",
              },
              {
                step: "4",
                title: "Download",
                desc: "Download the complete course for offline access.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border shadow-sm hover:shadow-md transition"
              >
                <div className="text-indigo-600 text-3xl font-bold">
                  {item.step}
                </div>
                <h3 className="mt-4 font-semibold text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddCourse;
