import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { strings } from "@/constants/strings";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: 1 });

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            {strings.Profile.myTicketsTitle}
          </h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">{strings.Profile.exploreEventsButton}</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={orderedEvents}
          emptyTitle={strings.Profile.emptyPurchasedEventsTitle}
          emptyStateSubtext={strings.Profile.emptyPurchasedEventsSubtitle}
          collectionType="My_Tickets"
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            {strings.Profile.eventsOrganizedTitle}
          </h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">
              {strings.Profile.createEventTitle}
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle={strings.Profile.emptyCreatedEventsTitle}
          emptyStateSubtext={strings.Profile.emptyCreatedEventsSubtitle}
          collectionType="Events_Organized"
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default ProfilePage;
