import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/home/home";
import video from "./assets/video.mp4";
import Footer from "./pages/footer/footer";
import Contact from "./pages/contact/contact";
import Books from "./pages/books/books";
import Files from "./pages/files/files";
import About from "./pages/about/about";
import { Helmet } from "react-helmet";
import icon from "./assets/logo.png";

const client = new ApolloClient({
  uri: "https://graphql.prepr.io/523851c92aa233426d454cc96c3e4485672cea26e59bf08847bdc5cf31427618",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Helmet>
        <title>Wiem, gdzie mieszkam</title>
        <meta name="description" content="strona konkursu" />
      </Helmet>
      <Home />
      <About />
      <Files />
      <Books />
      <Contact />
      <Footer />
      <video className="videoTag" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
    </ApolloProvider>
  </React.StrictMode>
);
