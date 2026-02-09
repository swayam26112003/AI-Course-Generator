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
      <AlertDialogContent
        className="
          w-[92vw]
          max-w-xs
          sm:max-w-sm
          md:max-w-md
          rounded-2xl
          p-4 sm:p-6
        "
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only">
            Loading
          </AlertDialogTitle>

          <div className="flex flex-col items-center gap-4 sm:gap-6 py-2 sm:py-4">
            <img
              src={rocket}
              alt="Loading rocket"
              className="
                w-16 h-16
                sm:w-20 sm:h-20
                md:w-24 md:h-24
                lg:w-28 lg:h-28
                object-contain
              "
            />

            <AlertDialogDescription
              className="
                text-center
                text-xs sm:text-sm md:text-base
                text-gray-600
                px-2 sm:px-4
              "
            >
              Please wait… AI is working on your course 🚀
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialog;
