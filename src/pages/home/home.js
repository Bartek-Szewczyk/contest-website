import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./home.scss";
import Loading from "../../components/loading/loading";
import logo2 from "../../assets/logo2.png";
import logo from "../../assets/logo.png";

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

  if (loading) return <Loading />;
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
        <img src={logo2} className="homeContainer__logo" alt="herb" />
        <img src={logo} className="homeContainer__logo2" alt="logo" />
      </div>
    </div>
  );
}

export default Home;
