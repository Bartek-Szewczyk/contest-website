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
      title {
        ... on Text {
          html
          text
        }
      }
      description
    }
  }
`;

function Home() {
  const { data, loading, error } = useQuery(TitleSite_QUERY);

  if (loading) return <Loading />;
  if (error) return <pre>{error.message}</pre>;

  const getContent = (content) => {
    const textArray = [];
    if (content) {
      content.forEach((item) => {
        textArray.push(item.html);
      });
    }
    return textArray.join("");
  };
  return (
    <div className="homeWrapper">
      <div className="homeContainer">
        <div className="homeContainer__textWrapper">
          <h1
            className="homeContainer__title"
            dangerouslySetInnerHTML={{
              __html: getContent(data.TitleSite.title),
            }}
          ></h1>
          <p className="homeContainer__subtitle">
            {data.TitleSite.description}
          </p>
        </div>
        <a href="https://starysacz.um.gov.pl/" target="blank">
          <img src={logo2} alt="herb" className="homeContainer__logo" />
        </a>
        <a href="https://lo.stary.sacz.pl/" target="blank">
          <img src={logo} className="homeContainer__logo2" alt="logo" />
        </a>
      </div>
    </div>
  );
}

export default Home;
