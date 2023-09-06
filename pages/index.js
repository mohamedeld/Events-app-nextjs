import EventList from "../components/events/eventList";
import { getFeaturedEvents } from "../helpers/ApiUtils";
export default function Home({ events }) {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const items = await getFeaturedEvents();
  return {
    props: {
      events: items,
    },
    revalidate: 1800,
  };
}
