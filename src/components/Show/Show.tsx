import React from "react";
import { CastMember } from '../CastMember/CastMember';

import { IShow } from "../../types";

interface IShowProps {
    show: IShow;
    onCancel: () => void;
}

export const Show: React.FC<IShowProps> = ({ show, onCancel }) => {
    console.log('Show', show);
    const cast = show._embedded.cast;

    return (
        <>
            <div className="show-back">
                <button onClick={onCancel}>Back to list</button>
            </div>
            <div className="show">
                <div className="show-image">
                    {show.image && <img src={show.image.original} alt="" />}
                </div>
                <div className="show-details">
                    <h2>{show.name}</h2>
                    <div className="show-meta">
                        {show.premiered ? "Premiered " + show.premiered : "Yet to premiere"}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: show.summary }} />
                    <h3>Cast</h3>
                    <ul className="cast">
                        {cast.map(({ character, person }, index) => (
                            <li key={index}>
                                <CastMember character={character} person={person} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
