import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Template from "../shared/Template";
import httpFamilyService from "../hooks/familyService";
import httpUserService from "../hooks/userService";

export default function Tree() {
  const { id } = useParams();
  const { getFamilyTree } = httpFamilyService();
  const { getUser } = httpUserService();

  useEffect(() => {
    if (id) {
      getUser(id).then(async (response) => {
        const poop = await getFamilyTree({ contextMember: response.data() });
        console.log("pooop", poop);
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
