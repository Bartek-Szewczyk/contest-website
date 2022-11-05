import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./about.scss";
import Loading from "../../components/loading/loading";

const ABOUT_QUERY = gql`
  {
    Information {
      _id
      text
    }
  }
`;

function About() {
  const { data, loading, error } = useQuery(ABOUT_QUERY);

  if (loading) return <Loading />;
  if (error) return <pre>{error.message}</pre>;
  return (
    <div className="aboutWrapper">
      <div className="aboutContainer">
        <h2 className="aboutContainer__title">O Konkursie</h2>
        <p className="aboutContainer__text">{data.Information.text}</p>
      </div>
    </div>
  );
}

export default About;
