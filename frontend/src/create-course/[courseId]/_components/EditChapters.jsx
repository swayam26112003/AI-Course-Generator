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
        chapterName,
        about,
        duration,
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/course/update/${course.courseId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseOutput: {
              ...course.courseOutput,
              chapters: newChapters,
            },
          }),
        }
      );

      const result = await res.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to update chapter");
      }

      toast.success("Chapter updated successfully!");
      onCourseUpdated?.();
      setIsOpen(false);
    } catch (error) {
      toast.error(error.message);
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

      <DialogContent className="w-[95vw] max-w-lg sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            Make changes to your chapter details.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-start">
            <label className="sm:text-right text-sm font-medium">
              Title
            </label>
            <Input
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              className="sm:col-span-3"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-start">
            <label className="sm:text-right text-sm font-medium">
              About
            </label>
            <Textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
              className="sm:col-span-3"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-start">
            <label className="sm:text-right text-sm font-medium">
              Duration
            </label>
            <Input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="sm:col-span-3"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
          <DialogClose asChild>
            <Button variant="outline" disabled={isSaving} className="w-full sm:w-auto">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full sm:w-auto"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditChapters;
