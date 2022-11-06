import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "./about.scss";
import Loading from "../../components/loading/loading";
import ArrowIcon from "../../assets/arrowIcon";
import Modal from "../../components/modal/modal";
import Lightbox from "react-spring-lightbox";
import NextIcon from "../../assets/nextIcon";
import PrevIcon from "../../assets/prevIcon";
import CloseIcon from "../../assets/closeIcon";

const ABOUT_QUERY = gql`
  {
    Posts {
      items {
        images {
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
  const [photoIndex, setPhotoIndex] = useState(1);
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  if (loading) return <Loading />;
  if (error) return <pre>{error.message}</pre>;

  const showPost = (data) => {
    setImages(
      data.images.map((item) => {
        return { src: item.url };
      })
    );
    setModalContent(data);
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  console.log(data);
  const openPhoto = (index) => {
    console.log(index);
    setPhotoIndex(index);
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const gotoPrevious = () => photoIndex > 0 && setPhotoIndex(photoIndex - 1);

  const gotoNext = () =>
    photoIndex + 1 < images.length && setPhotoIndex(photoIndex + 1);

  return (
    <div>
      <Modal show={showModal} handleClose={handleClose}>
        {/* {isOpen && ( */}
        <Lightbox
          isOpen={isOpen}
          onPrev={gotoPrevious}
          onNext={gotoNext}
          images={images}
          currentIndex={photoIndex}
          onClose={() => setIsOpen(false)}
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
          singleClickToZoom
          renderPrevButton={({ canPrev }) => (
            <PrevIcon
              onClick={gotoPrevious}
              classProp="imgIcon"
              disabled={!canPrev}
            />
          )}
          renderNextButton={({ canNext }) => (
            <NextIcon
              onClick={gotoNext}
              classProp="imgIcon"
              disabled={!canNext}
            />
          )}
          renderHeader={() => (
            <CloseIcon onClick={onClose} classProp="closeIcon" />
          )}
          // mainSrc={images[photoIndex]}
          // nextSrc={images[(photoIndex + 1) % images.length]}
          // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          // onCloseRequest={() => setIsOpen(false)}
          // onMovePrevRequest={() =>
          //   setPhotoIndex((photoIndex + images.length - 1) % images.length)
          // }
          // onMoveNextRequest={() =>
          //   setPhotoIndex((photoIndex + 1) % images.length)
          // }
        />
        {/* )} */}
        <div className="aboutContainer__modal">
          <p className="aboutContainer__modal__title">{modalContent?.title}</p>
          <div
            className="aboutContainer__modal__content"
            dangerouslySetInnerHTML={{
              __html: modalContent?.content?.[0]?.html,
            }}
          ></div>
          <div className="aboutContainer__modal__images">
            {modalContent?.images?.map((item, index) => (
              <img
                className="aboutContainer__modal__images__image"
                src={item.url}
                alt=""
                onClick={() => openPhoto(index)}
              />
            ))}
          </div>
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
    </div>
  );
}

export default About;
