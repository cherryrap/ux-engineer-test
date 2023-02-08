import React from "react";

interface IShow {
    id: string;
    name: string;
    summary: string;
    image: {
        original: string;
        medium: string;
    };
    premiered: string;
    _embedded: {
        cast: [];
    };
}

interface IShowListProps {
    shows: Array<IShow>;
    onSelectShow: (show: IShow) => void;
    resultsNumber: number;
    query: string;
}

export const ShowList: React.FC<IShowListProps> = ({ shows, onSelectShow, resultsNumber, query }) => (
    <>
        <div className="results-meta">
            {resultsNumber} results for "{query}"
        </div>
        <div className="show-list">
            {shows.map((show) => (
                <div
                    key={show.id}
                    className="show-preview"
                    onClick={() => onSelectShow(show)}
                >
                    {show.image && <img src={show.image.medium} alt="" />}
                    <span>{show.name}</span>
                </div>
            ))}
        </div>
    </>
);
