import http from "../http/http";

const LookupMappings = {
  status: ["Blank", "Deceased", "Living"],
  gender: ["Blank", "Female", "Male"],
};

export default function useMembers() {
  async function getMember(id) {
    const { status, data } = await http.get(`/api/member/${id}`);

    if (status !== 200) throw Error(body.message);

    return {
      ...data,
      Gender: LookupMappings.gender[data.Gender],
      Status: LookupMappings.status[data.Status],
    };
  }

  async function getMemberFamily(user) {
    const { Parents, Spouse, id = "" } = user;
    let parents, spouse, children, siblings;

    if (Parents?.length) {
      parents = await http.get(`/api/member/${id}/parents`);
      // parents = await userDbCollection.where("id", "in", Parents).get();
    }

    if (Spouse) {
      spouse = await http.get(`/api/member/${id}/spouse`);
      // spouse = await userDbCollection.where("id", "==", Spouse).get();
    }

    if (children) {
      children = await http.get(`/api/member/${id}/children`);
      // children = await userDbCollection
      // .where("Parents", "array-contains-any", [id])
      // .get();
    }

    if (user?.Parents?.length) {
      siblings = await http.get(`/api/member/${id}/siblings`);
      // siblings = await userDbCollection
      //   .where("Parents", "array-contains-any", [...user.Parents])
      //   //.where("id", "!=", user.id) // requires an index in the db
      //   .get();
    }

    const fam = await Promise.all([parents, spouse, children, siblings]);
    return fam.map((doc) => doc?.docs?.map((doc) => doc.data()));
  }

  async function getMembers() {
    const response = await http.get("/api/members");

    if (response.status !== 200) throw Error(body.message);

    return response.data;
  }

  function createMember() {
    return [];
  }

  function updateMember() {
    return [];
  }

  function saveMember() {
    return [];
  }

  function deleteMember() {
    return [];
  }

  return {
    getMember,
    getMembers,
    saveMember,
    deleteMember,
  };
}
