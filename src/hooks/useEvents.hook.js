import http from "../http/http";

export default function useEvents() {
  async function getEvents(id) {
    const { status, data } = await http.get(`/api/events/${id}`);

    if (status !== 200) throw Error(body.message);

    return data;
  }

  async function getEvent(id) {
    const { status, data } = await http.get(`/api/event/${id}`);

    if (status !== 200) throw Error(body.message);

    return data;
  }

  async function create({ event, member }) {
    const { status, data } = await http.post(`/api/event`, { event, member });

    if (status !== 200) throw Error(body.message);

    return data;
  }

  async function update({ event, member }) {
    const { status, data } = await http.put(`/api/event/${event.id}`, {
      event,
      member,
    });

    if (status !== 200) throw Error(body.message);

    return data;
  }

  function saveEvent({ event, member }) {
    return event.id ? update({ event, member }) : create({ event, member });
  }

  async function deleteEvent({ eventId, member }) {
    // POST so we can send all the datas
    const { status, data } = await http.post(`/api/event/delete`, {
      eventId,
      member,
    });

    if (status !== 200) throw Error(body.message);

    return data;
  }

  return {
    getEvent,
    getEvents,
    saveEvent,
    deleteEvent,
  };
}
