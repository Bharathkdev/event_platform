"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteEvent } from "@/lib/actions/event.actions";
import { strings } from "@/constants/strings";

export const DeleteConfirmation = ({ eventId }: { eventId: string }) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image
          src="/assets/icons/delete.svg"
          alt="edit"
          width={20}
          height={20}
        />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {strings.EventCard.alertDialogTitle}
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            {strings.EventCard.alertDialogSubtitle}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            {strings.EventCard.alertDialogCancel}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteEvent({ eventId, path: pathname });
              })
            }
          >
            {isPending
              ? strings.EventCard.alertDialogDeleting
              : strings.EventCard.alertDialogDelete}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
