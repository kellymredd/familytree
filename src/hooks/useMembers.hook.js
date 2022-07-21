import http from "../http/http";

// const LookupMappings = {
//   status: ["Blank", "Deceased", "Living"],
//   gender: ["Blank", "Female", "Male"],
// };

export default function useMembers() {
  async function getMember(id) {
    const { status, data } = await http.get(`/api/member/${id}`);

    if (status !== 200) throw Error(body.message);

    return data;
  }

  async function getMembers() {
    const response = await http.get("/api/members");

    if (response.status !== 200) throw Error(body.message);

    return response.data;
  }

  async function createMember(member) {
    const response = await http.post("/api/member", member);

    if (response.status !== 200) throw Error(body.message);

    return response.data;
  }

  async function updateMember(member) {
    const response = await http.put(`/api/member/${member.id}`, member);

    if (response.status !== 200) throw Error(body.message);

    return response;
  }

  function saveMember({ member }) {
    return member.id ? updateMember(member) : createMember(member);
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
