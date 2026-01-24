import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";  

/**
 * 
 * @param {object} course 
 * @param {function} onCourseUpdated 
 */
function EditCourseBasicinfo({ course, onCourseUpdated }) {
  const [title, setTitle] = useState(course?.courseOutput?.courseName);
  const [description, setDescription] = useState(course?.courseOutput?.description);
  
  const [isSaving, setIsSaving] = useState(false);
  
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async () => {
    if (!title || !description) {
      toast.error("Title and Description cannot be empty.");
      return;
    }

    setIsSaving(true);
    
    const updatedData = {
      name: title, 
      courseOutput: {
        ...course.courseOutput, 
        courseName: title,      
        description: description,  
      },
    };

    try {
      const res = await fetch( `${import.meta.env.VITE_API_BASE_URL}/course/update/${course.courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Course updated successfully!");
        if (onCourseUpdated) {
          onCourseUpdated(); 
        }
        setIsOpen(false); 
      } else {
        throw new Error(result.message || "Failed to update course");
      }
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (

    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="Edit Course Details">
          <FaEdit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Details</DialogTitle>
          <DialogDescription>
            Make changes to your course title and description here.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              rows={5}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isSaving}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCourseBasicinfo;