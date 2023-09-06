import EventItem from "./EventItem";
import classes from "./EventList.module.css";
const EventList = (props) => {
  const { items } = props;
  return (
    <>
      <ul className={classes.list}>
        {items.map((item) => (
          <EventItem item={item} key={item.id} />
        ))}
      </ul>
    </>
  );
};

export default EventList;
