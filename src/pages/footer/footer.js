import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./footer.scss";
import InstagramIcon from "../../assets/instagramIcon";
import FacebookIcon from "../../assets/facebookIcon";
import YouTubeIcon from "../../assets/youtubeIcon";
import Loading from "../../components/loading/loading";

const FOOTER_QUERY = gql`
  {
    Partners {
      items {
        name
        link
      }
    }
    Socials {
      _id
      instagram {
        url
      }
      facebook {
        url
      }
      youtube {
        url
      }
    }
    Medias {
      items {
        logo {
          url
        }
        link
      }
    }
  }
`;

function Footer() {
  const { data, loading, error } = useQuery(FOOTER_QUERY);

  if (loading) return <Loading />;
  if (error) return <pre>{error.message}</pre>;

  return (
    <div className="footerWrapper">
      <div className="footerContainer">
        <div className="footerContainer__mainContent">
          <div className="footerContainer__mainContent__flex">
            <p className="footerContainer__mainContent__flex__title">
              Patronat medialny
            </p>
            {data.Medias.items.map((item) => (
              <a href={item.link} target="blank">
                <img className="pp" src={item.logo[0].url} alt="" />
              </a>
            ))}
          </div>
          <div className="footerContainer__mainContent__flex">
            <p className="footerContainer__mainContent__flex__title">
              Partnerzy
            </p>
            {data.Partners.items.map((item) => (
              <ul className="footerContainer__mainContent__flex__list">
                <li>
                  <a
                    href={item.link}
                    target="blank"
                    className="footerContainer__mainContent__flex__list__link"
                  >
                    {item.name}
                  </a>
                </li>
              </ul>
            ))}
          </div>
          <div className="footerContainer__mainContent__flex">
            <p className="footerContainer__mainContent__flex__title">
              Znajdz Nas!
            </p>
            <div className="footerContainer__mainContent__flex__icons">
              {data.Socials.facebook && (
                <a
                  href={data.Socials.facebook.url}
                  target="blank"
                  className="footerContainer__mainContent__flex__icon"
                >
                  <FacebookIcon classProp="facebook" />
                </a>
              )}
              {data.Socials.instagram && (
                <a
                  href={data.Socials.instagram.url}
                  target="blank"
                  className="footerContainer__mainContent__flex__icon"
                >
                  <InstagramIcon classProp="instagram" />
                </a>
              )}
              {data.Socials.youtubel && (
                <a
                  href={data.Socials.youtube.url}
                  target="blank"
                  className="footerContainer__mainContent__flex__icon"
                >
                  <YouTubeIcon classProp="icon" />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="footerContainer__copyright">
          Copyright © 2022 Software Development Bartłomiej Szewczyk
        </div>
      </div>
    </div>
  );
}

export default Footer;
