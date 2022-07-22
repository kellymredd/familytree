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
            {member.firstName} {member.middleName} {member.lastName}
            {member.maidenName && `(${member.maidenName})`}
            {member.suffix && `, ${member.suffix ? "Jr." : "Sr."}`}
            {id && (
              <Link to={`${id}/edit`}>
                <i className="fa fa-pen"></i>
              </Link>
            )}
          </h2>
          <div className="profileDemographics">
            {member.dateOfBirth &&
              `${calcAge(
                member.dateOfBirth,
                member.dateOfDeath
              )} years old`}{" "}
            {member.dateOfBirth && " + "}
            {`${member.gender === 1 ? "Female" : "Male"} + ${
              member.status ? "Living" : "Deceased"
            }`}
            {/* {new Date(member.dateOfBirth).toLocaleDateString()} - $
            {new Date(member.dateOfDeath).toLocaleDateString()}`} */}
          </div>
        </div>
      </Template.Head>
      <Template.Body>
        <div className="row">
          <EventSection member={member} />
          <FamilySection member={member} />
        </div>
      </Template.Body>
    </Template>
  );
}
