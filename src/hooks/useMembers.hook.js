import http from "../http/http";

const api = "/api/members"; // matches folder/file.js naming

export default function useMembers() {
  function getMember(id) {
    return http.get({
      url: `/member/${id}`,
    });
  }

  async function getMembers() {
    const response = await http.get(api);
    // const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return response;
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
