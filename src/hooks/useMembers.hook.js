import http from "../http/http";

export default function useMembers() {
  function getMember(id) {
    return http.get({
      url: `/member/${id}`,
    });
  }

  function getMembers() {
    return http.get("/api/members");
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
