import "./App.css";
import { useQuery, gql } from "@apollo/client";

const FILMS_QUERY = gql`
  {
    Information(id: "8a554694-5c6e-4636-ba15-ceb67974a34c") {
      _id
      title
      content
      asset {
        _id
        url
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(FILMS_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return <div>{data.Information.title}</div>;
}

export default App;
