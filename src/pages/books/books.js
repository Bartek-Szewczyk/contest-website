import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./books.scss";
import BookIcon from "../../assets/bookIcon";
import Loading from "../../components/loading/loading";

const Books_QUERY = gql`
  {
    Books {
      items {
        name {
          ... on Text {
            html
          }
        }
      }
    }
  }
`;

function Books() {
  const { data, loading, error } = useQuery(Books_QUERY);

  if (loading) return <Loading />;
  if (error) return <pre>{error.message}</pre>;
  return (
    <div className="booksWrapper">
      <div className="booksContainer">
        <h2 className="booksContainer__title">Literatura</h2>
        {data.Books.items.map((item) => (
          <div className="booksContainer__singleBook">
            <BookIcon classProp="booksContainer__bookIcon" />
            <div
              className="booksContainer__book"
              dangerouslySetInnerHTML={{ __html: item.name[0].html }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
