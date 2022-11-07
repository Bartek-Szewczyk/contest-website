import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./files.scss";
import FileIcon from "../../assets/fileIcon";
import Loading from "../../components/loading/loading";

const FILES_QUERY = gql`
  {
    Files {
      items {
        _id
        file {
          _id
          url
        }
        file_name
      }
    }
  }
`;
function Files() {
  const { data, loading, error } = useQuery(FILES_QUERY);

  if (loading) return <Loading />;
  if (error) return <pre>{error.message}</pre>;
  return (
    <div className="filesWrapper">
      <div className="filesContainer">
        <h2 className="filesContainer__title">Pliki do Pobrania</h2>
        <div className="filesContainer__files">
          {data.Files.items.map((item, index) => (
            <div className="filesContainer__singleFile" key={index}>
              <FileIcon classProp="filesContainer__singleFile__icon animation_jump" />
              <a className="under" href={item.file[0].url} target="blank">
                <p className="filesContainer__singleFile__name">
                  {item.file_name}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Files;
