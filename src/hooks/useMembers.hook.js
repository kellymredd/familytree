import http from "../http/http";

export default function useMembers() {
  function getMember(id) {
    return http.get({
      url: `/member/${id}`,
    });
  }

  async function getMembers() {
    const response = await http.get("/api/members");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
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
