import React, { useState, useEffect } from "react";
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
 * @param {number} index  
 * @param {function} onCourseUpdated 
 */
function EditChapters({ course, index, onCourseUpdated }) {
  const [chapterName, setChapterName] = useState("");
  const [about, setAbout] = useState("");
  const [duration, setDuration] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const chapter = course?.courseOutput?.chapters[index];

 
  useEffect(() => {
    if (chapter) {
      setChapterName(chapter.chapterName);
      setAbout(chapter.about);
      setDuration(chapter.duration);
    }
  }, [chapter, isOpen]);  

  const handleSave = async () => {
    if (!chapterName || !about || !duration) {
      toast.error("All fields are required.");
      return;
    }

    setIsSaving(true);

    try {
      const newChapters = [...course.courseOutput.chapters];

      newChapters[index] = {
        ...newChapters[index],  
        chapterName: chapterName,
        about: about,
        duration: duration,
      };

      const updatedData = {
        courseOutput: {
          ...course.courseOutput,
          chapters: newChapters,
        },
      };

      const res = await fetch(
        `http://localhost:8080/course/update/${course.courseId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await res.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to update chapter");
      }

      toast.success("Chapter updated successfully!");
      if (onCourseUpdated) {
        onCourseUpdated();  
      }
      setIsOpen(false);  
    } catch (error) {
      console.error("Error saving chapter:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Edit Chapter">
          <FaEdit className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            Make changes to your chapter details here.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="chapterName" className="text-right">
              Title
            </label>
            <Input
              id="chapterName"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="about" className="text-right">
              About
            </label>
            <Textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="col-span-3"
              rows={5}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="duration" className="text-right">
              Duration
            </label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isSaving}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditChapters;