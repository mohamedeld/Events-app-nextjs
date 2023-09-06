export async function getAllEvents() {
  const response = await fetch(
    "https://nextjscourse-7dcff-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}
export async function getEventById(eventId) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === eventId);
}

export async function getFilteredEvents(filterData) {
  const { year, month } = filterData;
  let allEvents = await getAllEvents();
  let filteredData = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredData;
}
