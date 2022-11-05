import React from "react";
import "./constact.scss";
import { useQuery, gql } from "@apollo/client";
import EmailIcon from "../../assets/emailIcon";
import SchoolIcon from "../../assets/schooleIcon";
import PhoneIcon from "../../assets/phoneIcon";
import UserIcon from "../../assets/userIcon";

const CONTACT_QUERY = gql`
  {
    Contact {
      _id
      email
      place
      localization
      place_phone
      person
      person_phone
    }
  }
`;

function Contact() {
  const { data, loading, error } = useQuery(CONTACT_QUERY);

  if (loading) return null;
  if (error) return <pre>{error.message}</pre>;
  return (
    <div className="contactWrapper">
      <div className="contactContainer">
        <h2 className="contactContainer__title">Kontakt</h2>
        <div className="contactContainer__info">
          <a
            className="contactContainer__info__text"
            href={`mailto: ${data.Contact.email}`}
          >
            <EmailIcon classProp="contactContainer__info__text__icon" />
            Email kontaktowy: {data.Contact.email}
          </a>
        </div>
        <div className="contactContainer__info">
          <a
            className="contactContainer__info__text"
            target="blank"
            href={data.Contact.localization}
          >
            <SchoolIcon classProp="contactContainer__info__text__icon" />
            {data.Contact.place}
          </a>
          <a
            className="contactContainer__info__text"
            href={`callto: ${data.Contact.place_phone}`}
          >
            <PhoneIcon classProp="contactContainer__info__text__icon" />
            {data.Contact.place_phone}
          </a>
        </div>
        <div className="contactContainer__info">
          <p className="contactContainer__info__text">
            <UserIcon classProp="contactContainer__info__text__icon" />
            Koordynator konkursu: {data.Contact.person}
          </p>
          <a
            className="contactContainer__info__text"
            href={`callto: ${data.Contact.person_phone}`}
          >
            <PhoneIcon classProp="contactContainer__info__text__icon" />
            {data.Contact.person_phone}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
