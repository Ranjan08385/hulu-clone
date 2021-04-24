import Head from "next/head";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Nav from "../components/Nav";
// const Results = dynamic(import("../components/Results"), { ssr: false });
// const requests = dynamic(import("../utils/request"), { ssr: false });
import Results from "../components/Results";
import requests from "../utils/request";

export default function Home({ results }) {
  console.log("Movies", results);
  return (
    <div>
      <Head>
        <title>Hulu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Nav />
      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  console.log("url data", genre);
  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests?.fetchTrending?.url
    }`
  ).then((res) => res.json());

  return {
    props: {
      results: request.results,
    },
  };
}
