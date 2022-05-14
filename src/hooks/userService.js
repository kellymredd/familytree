import rootsProject from "../config/config";
const { userDbCollection, SafeGET } = rootsProject();

function updateParentsOfSiblings({ contextMember, id }) {
  if (contextMember?.Parents?.length) {
    userDbCollection
      .where("Parents", "array-contains-any", [...contextMember?.Parents])
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const child = doc.data();
          //if (child.id !== id) {
          userDbCollection
            .doc(child.id)
            .update({ Parents: [...child.Parents, id] });
          //}
        });
      });

    // updateParentsSpouse({ contextMember, id });
  }
}

function updateParentsSpouse({ contextMember, id }) {
  // this assumes the contextMember is a child
  userDbCollection.doc(contextMember.Parents[0]).update({ Spouse: id });
  // userDbCollection.doc(contextMember.id).update({ Spouse: id });
}

function updateChildrenOfParents({ contextMember, id }) {
  // update kids
  //if (contextMember?.Parents?.length) {
  userDbCollection
    .where("Parents", "array-contains", contextMember.id)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const child = doc.data();
        userDbCollection
          .doc(child.id)
          .update({ Parents: [...child.Parents, id] });
      });
    });
  //}

  // update other parent
  // if (contextMember.Parents.length === 1) {
  //   updateParentsSpouse({ contextMember, id });
  // }
}

// TODO: What happens when, for example, a Parent is added or deleted?
// TODO: CRUD to delete a member (should also cascade the delete to other members records)
// weird things happen when adding a sibling - Existing `parents spouse` don't update and siblings `Parents` don't update
const httpUserService = () => {
  const createUser = async ({ entity }) => {
    const { memberType, contextMember, Type, ...rest } = entity;
    const newUser = await userDbCollection.add(rest);
    if (memberType.toLowerCase() === "spouse") {
      // udpate context members' kids with a new parent
      updateChildrenOfParents({ contextMember, id: newUser.id });
      // add entity as spouse to context member
      updateUser({ entity: { ...contextMember, Spouse: newUser.id } });
    } else if (memberType.toLowerCase() === "parents") {
      // if 0 parents we know they have no siblings yet
      //(business rule says you can't add siblings w/o at least 1 parent)
      if (!contextMember.Parents.length) {
        updateUser({ entity: { ...contextMember, Parents: [newUser.id] } });
      } else {
        updateParentsOfSiblings({ contextMember, id: newUser.id });
      }

      // if contextMember only has 1 parent, update that parent with their spouse
      if (contextMember?.Parents?.length === 1) {
        updateParentsSpouse({ contextMember, id: newUser.id });
      }
    }

    // update new user with new id prop
    userDbCollection.doc(newUser.id).set({ ...rest, id: newUser.id });
    const docRef = userDbCollection.doc(newUser.id);
    const doc = await docRef.get();
    return doc.data();
  };

  const updateUser = async ({ entity }) => {
    const { memberType = "", contextMember = {}, ...rest } = entity;

    return await userDbCollection.doc(rest.id).update(rest);
  };

  const saveUser = async (entity) => {
    if (!entity.id) {
      return createUser({ entity });
    } else {
      return updateUser({ entity });
    }
  };

  // Save family members
  const saveUserOrig = async (entity) => {
    const { id, memberType, contextMember, ...rest } = entity;
    let uid;

    if (!id) {
      uid = await userDbCollection.add(rest);

      // update the parents of contextMember's children
      // and update contextMember's spouse
      if (memberType.toLowerCase() === "spouse") {
        userDbCollection
          .where("Parents", "array-contains", contextMember.id)
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              const child = doc.data();
              userDbCollection
                .doc(child.id)
                .update({ Parents: [...child.Parents, uid.id] });
            });
          });

        // and update contextmember's Spouse prop as well
        saveUser({ ...contextMember, Spouse: uid.id });
      } else if (memberType.toLowerCase() === "parent") {
        // when adding a parent update contextmember's siblings as well
        if (contextMember?.Parents.length >= 1) {
          userDbCollection
            .where("Parents", "array-contains-any", [...contextMember?.Parents])
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                const child = doc.data();
                if (child.id !== uid) {
                  userDbCollection
                    .doc(child.id)
                    .update({ Parents: [...child.Parents, uid.id] });
                }
              });
            });
        }

        // when adding a parent update the existing parent's spouse field
        // if contextMember only has 1 parent, update that parent with new parent id
        if (contextMember.Parents.length === 1) {
          userDbCollection
            .doc(contextMember.Parents[0])
            .update({ Spouse: uid.id });
        }

        saveUser({
          ...contextMember,
          Parents: [...contextMember.Parents, uid.id],
        });
      }

      // finally, add the new user/family member
      const finalId = uid ? uid.id : id;
      userDbCollection.doc(finalId).set({ ...rest, id: finalId });

      // GET the newly saved member and return for display
      const docRef = userDbCollection.doc(finalId);
      const doc = await docRef.get();
      return doc.data();
    }
    // else just update the existing member
    return await userDbCollection.doc(`${id}`).update(entity);
  };

  const listUsers = async () => {
    if (!SafeGET) {
      return [{ LastName: "This application is currently shut off." }];
    }

    const snapshot = await userDbCollection.orderBy("LastName", "desc").get();
    return snapshot.docs.map((doc) => doc.data());
  };

  function getUser(id) {
    if (!SafeGET) {
      return Promise.resolve();
    }
    return userDbCollection.doc(id).get();
  }

  function deleteUser(id) {
    return userDbCollection.doc(id).delete();
  }

  const userSelectOptions = async () => {
    const snapshot = await userDbCollection.orderBy("LastName", "desc").get();
    return snapshot.docs.map((doc) => doc.data());
  };

  return {
    saveUser: () => Promise.resolve([]),
    getUser: () => Promise.resolve([]),
    listUsers,
    deleteUser: () => Promise.resolve([]),
    userSelectOptions: () => Promise.resolve([]),
  };
};

export default httpUserService;
