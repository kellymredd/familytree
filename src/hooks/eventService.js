import rootsProject from "../config/config";
const { eventsDbCollection, SafeGET } = rootsProject();

const httpEventService = () => {
  const saveEvent = async (entity, user) => {
    const { id } = entity;

    if (!id) {
      const eid = await eventsDbCollection.add(entity);

      if (entity.Type.toLowerCase() === "marriage" && user?.Spouse) {
        // add event to spouse's events, too
        saveEvent({ ...entity, UserId: user.Spouse });
      }

      return { ...entity, id: eid.id };
    }
    return await eventsDbCollection.doc(id).update(entity);
  };

  const listEvents = async (id) => {
    if (!SafeGET) {
      return [];
    }

    // TODO: get events by `UserId`
    const snapshot = await eventsDbCollection
      .where("UserId", "==", id.toString())
      //.orderBy("Date", "desc")
      .get();

    return snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  };

  function getEvent(id) {
    if (!SafeGET) {
      return [];
    }

    return eventsDbCollection.doc(id).get();
  }

  function deleteEvent(id) {
    return eventsDbCollection.doc(id).delete();
  }

  return {
    saveEvent,
    getEvent,
    listEvents,
    deleteEvent
  };
};

export default httpEventService;
