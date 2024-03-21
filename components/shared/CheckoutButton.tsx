"use client";

import { strings } from "@/constants/strings";
import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {/**Cannot buy past events */}
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          {strings.EventDetails.noTicketsTitle}
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild size="lg" className="button rounded-full">
              <Link href="/sign-in">
                {strings.EventDetails.getTicketsButton}
              </Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
