import React from 'react'
import rocket from '../../assets/rocket.gif'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"

function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only">Loading</AlertDialogTitle> 
          
          <div className="flex flex-col items-center py-2">
            <img src={rocket} width={100} height={100} alt="Loading rocket" />
            <AlertDialogDescription className="text-center mt-2">
              Please wait... AI is working on your Course
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default LoadingDialog

