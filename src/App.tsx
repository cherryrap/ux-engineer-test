import React from "react";
import "./App.css";
import { Show } from './components/Show/Show';
import { Loading } from './components/Loading/Loading';
import { ShowList } from './components/ShowList/ShowList';
import { IShow } from "./types";

export default function App(): JSX.Element {
  const [query, setQuery] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [hasSearched, setHasSearched] = React.useState<boolean>(false);
  const [shows, setShows] = React.useState<Array<IShow>>([]);
  const [show, setShow] = React.useState<IShow | null>(null);

  function onQueryChange(nextQuery: string): void {
    setHasSearched(false);
    setQuery(nextQuery);
    setShows([]);
    setShow(null);
    setError("");
  }

  function onSearch(): void {
    setHasSearched(false);
    setIsLoading(true);
    setShows([]);
    setShow(null);
    setError("");

    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then((r: Response) => r.json())
      .then((json: Array<{ show: IShow }>) => {
        setHasSearched(true);
        setIsLoading(false);
        setShows(json.map((r) => r.show));
      })
      .catch(() => {
        setIsLoading(false);
        setError("Could not load shows.");
      });
  }

  function onSelectShow(show: IShow): void {
    setIsLoading(true);
    setError("");

    fetch(`https://api.tvmaze.com/shows/${show.id}?embed=cast`)
      .then((r: Response) => r.json())
      .then((json: IShow) => {
        setIsLoading(false);
        setShow(json);
      })
      .catch(() => {
        setIsLoading(false);
        setError("Could not load show details.");
      });
  }
  let resultsNumber = 0;
  if (hasSearched && query) resultsNumber = shows.length;

  return (
    <div className="app">
      <h1>TV Database</h1>
      <form className="search">
        <input
          autoFocus
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Enter the name of a TV show..."
        />
        <button type="button" onClick={onSearch}>Search</button>
      </form>

      {error && <div>{error}</div>}

      <div>
        <Loading isLoading={isLoading}>
          {show ? (
            <Show
                show={show}
                onCancel={() => setShow(null)}
            />
          ) : (
              <ShowList
                  resultsNumber={resultsNumber}
                  query={query}
                  shows={shows}
                  onSelectShow={onSelectShow}
              />
          )}
        </Loading>
      </div>
    </div>
  );
}
