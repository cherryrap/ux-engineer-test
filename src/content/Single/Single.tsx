import React from 'react';
import { CastCard } from './CastCard/CastCard';
import './styles.css';
import { IShow } from '../../types';
import _ from 'lodash';

interface IShowProps {
    show: IShow;
    onCancel: () => void;
}

export const Single: React.FC<IShowProps> = ({ show, onCancel }) => {
    const cast = _.get(show, '_embedded.cast');

    return (
        <div className="singular">
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
                        {_.map(cast, ({ character, person }, index) => (
                            <li key={index}>
                                <CastCard character={character} person={person} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
