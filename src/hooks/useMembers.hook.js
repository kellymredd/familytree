import http from "../http/http";

const api = "/api/members"; // matches folder/file.js naming

export default function useMembers() {
  async function getMember(id) {
    const response = await http.get(`/api/members/${id}`);

    if (response.status !== 200) throw Error(body.message);

    return response.data;
  }

  async function getMembers() {
    const response = await http.get("/api/members");
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
