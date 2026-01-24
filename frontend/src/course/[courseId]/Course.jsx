import CourseBasicInfo from '@/create-course/[courseId]/_components/CourseBasicInfo';
import CourseDetail from '@/create-course/[courseId]/_components/CourseDetail';
import React from 'react'
import { useEffect, useState } from "react";  
import { useParams, Link } from "react-router-dom";  
import { apiFetch } from "@/lib/api";

function Course() {
  const { courseId } = useParams();  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/course/${courseId}`);
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

  if (loading) {
    return <p>Loading your new course...</p>;
  }

  if (!course) {
    return <p>Error: Could not find your course.</p>;
  }
  return (
    <div>
      <div className='px-10 p-10 md:px-20 lg:px-44'>
         <CourseBasicInfo course={course} />
         <CourseDetail course={course} />
         <ChapterList course={course}/>
      </div>
    </div>
  )
}

export default Course
