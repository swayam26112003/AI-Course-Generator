import React from "react";
import rocket from "../../assets/rocket.gif";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="w-[90vw] max-w-sm sm:max-w-md rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only">
            Loading
          </AlertDialogTitle>

          <div className="flex flex-col items-center gap-4 py-4">
            <img
              src={rocket}
              alt="Loading rocket"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
            />

            <AlertDialogDescription className="text-center text-sm sm:text-base text-gray-600 px-2">
              Please wait… AI is working on your course 🚀
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialog;
