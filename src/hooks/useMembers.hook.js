import http from "../http/http";

const LookupMappings = {
  status: ["Blank", "Deceased", "Living"],
  gender: ["Blank", "Female", "Male"],
};

export default function useMembers() {
  async function getMember(id) {
    const { status, data } = await http.get(`/api/members/${id}`);

    if (status !== 200) throw Error(body.message);

    return {
      ...data,
      Gender: LookupMappings.gender[data.Gender],
      Status: LookupMappings.status[data.Status],
    };
  }

  async function getMembers() {
    const response = await http.get("/api/members");
    //"https://reddfamilytree.herokuapp.com/api/members"
    // const body = await response.json();

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
