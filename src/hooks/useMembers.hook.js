import http from '../http/http';

export default function useMembers() {
  async function getMember(id) {
    const { status, data } = await http.get(`/api/member/${id}`);

    if (status !== 200) throw Error(body.message);

    return data;
  }

  async function editMember(id) {
    const { status, data } = await http.get(`/api/member/${id}/edit`);

    if (status !== 200) throw Error(body.message);

    return data;
  }

  async function getMembers() {
    const response = await http.get('/api/members');

    if (response.status !== 200) throw Error(body.message);

    return response.data;
  }

  async function create(member) {
    const response = await http.post('/api/member', member);

    if (response.status !== 200) throw Error(body.message);

    return response.data;
  }

  async function update(member) {
    const response = await http.put(`/api/member/${member.id}/edit`, member);

    if (response.status !== 200) throw Error(body.message);

    return response;
  }

  function saveMember({ member }) {
    return member.id ? update(member) : create(member);
  }

  async function deleteMember(id) {
    const response = await http.delete(`/api/member/${id}/edit`);

    if (response.status !== 200) throw Error(body.message);

    return response;
  }

  return {
    getMember,
    editMember,
    getMembers,
    saveMember,
    deleteMember,
  };
}
