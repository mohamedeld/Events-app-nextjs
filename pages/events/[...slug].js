import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/ApiUtils";
import EventList from "../../components/events/eventList";
import ResultsTitle from "../../components/events/ResultsTitle";

const FilterEventPage = (props) => {
  // const router = useRouter();
  // const filterData = router.query.slug;
  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }
  // const filterYear = filterData[0];
  // const filterMonth = filterData[1];

  // const numYear = +filterYear;
  // const numMonth = +filterMonth;
  if (props.hasError) {
    return <p>Invalid fliter. Please adjust your values</p>;
  }
  const filteredEvents = props.events;
  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>Not events found!</p>;
  }
  const date = new Date(props.date.year, props.date.month - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};
export async function getServerSideProps({ params }) {
  const filterData = params.slug;
  const filterYear = filterData[0];
  const filterMonth = filterData[1];

  const numYear = +filterYear;
  const numMonth = +filterMonth;
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2020 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
export default FilterEventPage;
