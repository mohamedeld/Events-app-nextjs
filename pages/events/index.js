import { useRouter } from "next/router";
import EventSearch from "../../components/events/EventSearch";
import EventList from "../../components/events/eventList";
import { getAllEvents } from "../../helpers/ApiUtils";

const AllEventsPage = (props) => {
  const router = useRouter();
  const { events } = props;
  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };
  return (
    <>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </>
  );
};
export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
export default AllEventsPage;
