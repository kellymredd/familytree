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

  async function create({ event, spouseId }) {
    const { status, data } = await http.post(`/api/event`, { event, spouseId });

    if (status !== 200) throw Error(body.message);

    return data;
  }

  async function update({ event, spouseId }) {
    const { status, data } = await http.put(`/api/event/${event.id}`, {
      event,
      spouseId,
    });

    if (status !== 200) throw Error(body.message);

    return data;
  }

  function saveEvent({ event, spouseId }) {
    return event.id ? update({ event, spouseId }) : create({ event, spouseId });
  }

  async function deleteEvent(payload) {
    // POST so we can send all the datas
    const { status, data } = await http.post(`/api/event/delete`, payload);

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
