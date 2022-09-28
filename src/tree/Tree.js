import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Template from '../shared/Template';
import httpFamilyService from '../hooks/familyService';
import useMembers from '../hooks/useMembers.hook';

export default function Tree() {
  const { id } = useParams();
  const { getFamilyTree } = httpFamilyService();
  const { getMember } = useMembers();

  useEffect(() => {
    if (id) {
      getMember({ id }).then(async (response) => {
        const poop = await getFamilyTree({ contextMember: response.data() });
        console.log('pooop', poop);
      });
    }
  }, [id, getUser, getFamilyTree]);

  return (
    <Template>
      <Template.Head>
        <div className="profileInfo">whatevers</div>
      </Template.Head>
      <Template.Body>stuff</Template.Body>
    </Template>
  );
}
