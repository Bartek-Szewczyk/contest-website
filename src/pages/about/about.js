import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "./about.scss";
import Loading from "../../components/loading/loading";
import ArrowIcon from "../../assets/arrowIcon";
import Modal from "../../components/modal/modal";

const ABOUT_QUERY = gql`
  {
    Posts {
      items {
        imagines {
          url
        }
        title
        content {
          ... on Text {
            html
            text
          }
        }
        _created_on
      }
    }
  }
`;

function About() {
  const { data, loading, error } = useQuery(ABOUT_QUERY);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  if (loading) return <Loading />;
  if (error) return <pre>{error.message}</pre>;

  const showPost = (data) => {
    setModalContent(data);
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <Modal show={showModal} handleClose={handleClose}>
        <div className="aboutContainer__modal">
          <p className="aboutContainer__modal__title">{modalContent?.title}</p>
          <div
            className="aboutContainer__modal__content"
            dangerouslySetInnerHTML={{
              __html: modalContent?.content?.[0]?.html,
            }}
          ></div>
        </div>
      </Modal>
      <div className="aboutWrapper">
        <div className="aboutContainer">
          <h2 className="aboutContainer__title">Aktualności</h2>
          {data.Posts.items.map((item) => (
            <div className="aboutContainer__postWrapper">
              <div
                className="aboutContainer__post"
                onClick={() => showPost(item)}
              >
                <p className="aboutContainer__post__title">{item.title}</p>
                <p className="aboutContainer__post__content">
                  {item.content[0].text.substring(0, 90)}
                  {item.content[0].text.length >= 90 ? "..." : ""}
                  <ArrowIcon classProp="aboutContainer__post__icon more_jump" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default About;
