import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Template from "../shared/Template";
import EventSection from "./EventSection";
import FamilySection from "./FamilySection";
import useMembers from "../hooks/useMembers.hook";

const calcAge = (dob, dod) => {
  const calcDate = dod ? new Date(dod) : new Date();
  return Math.floor((calcDate - new Date(dob).getTime()) / 3.15576e10);
};

export default function ProfileScreen() {
  const [member, setMember] = useState({});
  const { getMember } = useMembers();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getMember(id)
        .then((response) => {
          setMember(response ?? {});
        })
        .catch((err) => console.log("Error fetching member: ", err));
    }
  }, [id]);

  // ADD SUSPENSE FOR LOADING MESSAGING....
  return (
    <Template>
      <Template.Head>
        <div className="profileInfo">
          <h2>
            {member.FirstName} {member.MiddleName} {member.LastName}{" "}
            {member.MaidenName && `(${member.MaidenName})`}{" "}
            {member.Suffix && `, ${member.Suffix}`}
            {id && (
              <Link to={`${id}/edit`}>
                <i className="fa fa-pen"></i>
              </Link>
            )}
          </h2>
          <div className="profileDemographics">
            {member.DOB && `${calcAge(member.DOB, member.DOD)} years old`}{" "}
            {member.DOB && " + "}
            {`${member.Gender} + ${member.Status}`}
            {/* {new Date(member.DOB).toLocaleDateString()} - $
            {new Date(member.DOD).toLocaleDateString()}`} */}
          </div>
        </div>
      </Template.Head>
      <Template.Body>
        <div className="row">
          <EventSection UserId={id} user={member} />
          <FamilySection user={member} />
        </div>
      </Template.Body>
    </Template>
  );
}
