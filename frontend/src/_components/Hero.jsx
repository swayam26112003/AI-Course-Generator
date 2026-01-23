import React from "react";
import { useNavigate } from "react-router-dom";  
import { Button } from "@/components/ui/button";  
import robot from "../assets/robot.png";
function Hero() {
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              AI Course Generator
              <strong className="block text-blue-600">
                Custom Learning Path Powered by AI
              </strong>
            </h1>

            <p className="mt-4 text-gray-900 sm:text-lg">
              Turn your knowledge into interactive, structured, and personalized
              courses with the power of AI.
            </p>

            <div className="mt-6">
              <Button size="lg" onClick={() => navigate("/signup")}>
                Get Started
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <p className="text-sm text-gray-600">
                Trusted by educators, creators & professionals worldwide
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={robot}
              alt="AI Robot Illustration"
              className="w-[380px] md:w-[450px] rounded-full object-cover drop-shadow-2xl
                transition-transform duration-700 ease-out
                hover:scale-105 hover:-rotate-1
                animate-robot-float"
            />
          </div>
        </div>
      </section>

 
    </>
  );
}

export default Hero;
