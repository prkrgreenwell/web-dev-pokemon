import React, { useEffect, useState } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState<string | null>(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(
    "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
  );
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
    if (currentPageUrl) {
      axios
        .get(currentPageUrl, {
          cancelToken: source.token,
        })
        .then((res) => {
          setLoading(false);
          setNextPageUrl(res.data.next);
          setPrevPageUrl(res.data.previous);
          setPokemon(res.data.results.map((p: { name: "string" }) => p.name));
        });
    }

    return () => {
      source.cancel();
    };
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return "Loading...";

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} />
    </>
  );
}
