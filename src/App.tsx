import React, { useState } from 'react';
import _ from 'lodash';
import './App.css';
import { Single } from './content/Single/Single';
import { Loader } from './components/Loader/Loader';
import Input from './components/Input';
import { Plural } from './content/Plural/Plural';
import { IShow } from './types';

export default function App(): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [shows, setShows] = useState<Array<IShow>>([]);
  const [show, setShow] = useState<IShow | null>(null);

  const onSearch = _.debounce(() => {
    setIsLoading(true);
    setShows([]);
    setShow(null);
    setError("");

    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then((r: Response) => r.json())
        .then((json: Array<{ show: IShow }>) => {
            setIsLoading(false);
            setShows(json.map((r) => r.show));
        })
        .catch(() => {
            setIsLoading(false);
            setError("Could not load shows.");
        });

  }, 500)

  const onQueryChange = (nextQuery: string) => {
      setQuery(nextQuery);
      setShows([]);
      setShow(null);
      setError("");
      onSearch();
  }

  const onSelectShow = (show: IShow) => {
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

  return (
      <div className="app">
          <div className="column">
              <div className="header">
                  <a href='/'><img className="logo" src='logo.png' alt="logo" /></a>
                  <form className="search">
                      <Input
                          clearable
                          onChange={(e: any) => onQueryChange(e)}
                          value={query}
                          type='search'
                          placeholder="Search a TV show..."
                      />
                  </form>
              </div>
              <div className="content">
                  {error && <div>{error}</div>}
                  <Loader isLoading={isLoading}>
                      {show ? (
                          <Single show={show} onCancel={() => setShow(null)}/>
                      ) : (
                          <Plural query={query} shows={shows} onSelectShow={onSelectShow} />
                      )}
                  </Loader>
              </div>
          </div>
    </div>
  );
}
