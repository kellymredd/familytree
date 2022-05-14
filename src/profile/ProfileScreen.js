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
  const [profile, setProfile] = useState({});
  const { getMember } = useMembers();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getMember({ id })
        .then((response) => {
          setProfile(response.data() ?? {});
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
            {profile.FirstName} {profile.MiddleName} {profile.LastName}{" "}
            {profile.MaidenName && `(${profile.MaidenName})`}{" "}
            {profile.Suffix && `, ${profile.Suffix}`}
            {id && (
              <Link to={`${id}/edit`}>
                <i className="fa fa-pen"></i>
              </Link>
            )}
          </h2>
          <div className="profileDemographics">
            {profile.DOB && `${calcAge(profile.DOB, profile.DOD)} years old`}{" "}
            {profile.DOB && " + "}
            {`${profile.Gender} + ${profile.Status}`}$
            {/* {new Date(profile.DOB).toLocaleDateString()} - $
            {new Date(profile.DOD).toLocaleDateString()}`} */}
          </div>
        </div>
      </Template.Head>
      <Template.Body>
        <div className="row">
          <EventSection UserId={id} user={profile} />
          <FamilySection user={profile} />
        </div>
      </Template.Body>
    </Template>
  );
}
