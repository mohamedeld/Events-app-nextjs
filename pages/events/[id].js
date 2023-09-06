import React from "react";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import { getEventById, getFeaturedEvents } from "../../helpers/ApiUtils";

const EventDetailPage = ({ selectedEvent }) => {
  const event = selectedEvent;
  if (!event) {
    return <p>no event found!</p>;
  }
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};
export async function getStaticProps({ params }) {
  const event = await getEventById(params.id);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}
export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map((event) => ({ params: { id: event.id } }));

  return {
    paths: paths,
    fallback: true,
  };
}
export default EventDetailPage;
