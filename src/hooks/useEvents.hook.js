import http from '../http/http';

export default function useEvents() {
  async function getEvents(id) {
    const { status, data } = await http.get(`/api/events/${id}`);

    if (status !== 200) throw Error(status);

    return data;
  }

  async function getEvent(id) {
    const { status, data } = await http.get(`/api/event/${id}`);

    if (status !== 200) throw Error(status);

    return data;
  }

  async function create(event) {
    const { status, data } = await http.post('/api/event', event);

    if (status !== 200) throw Error(status);

    return data;
  }

  async function update(event) {
    const { status } = await http.put(`/api/event/${event.id}`, event);

    if (status !== 200) throw Error(status);

    return true;
  }

  function saveEvent(event) {
    return event.id ? update(event) : create(event);
  }

  async function deleteEvent(payload) {
    // POST so we can send all the datas
    const { status, data } = await http.post('/api/event/delete', payload);

    if (status !== 200) throw Error('Could not delete this event'); // body.message

    return data;
  }

  return {
    getEvent,
    getEvents,
    saveEvent,
    deleteEvent,
  };
}
