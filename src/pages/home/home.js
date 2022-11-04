import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./home.scss";

const TitleSite_QUERY = gql`
  {
    TitleSite {
      _id
      title
      description
    }
  }
`;

function Home() {
  const { data, loading, error } = useQuery(TitleSite_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div className="homeWrapper">
      <div className="homeContainer">
        <div className="homeContainer__textWrapper">
          <h1 className="homeContainer__title">{data.TitleSite.title}</h1>
          <p className="homeContainer__subtitle">
            {data.TitleSite.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
