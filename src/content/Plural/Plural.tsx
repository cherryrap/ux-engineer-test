import React, { useState } from 'react';
import './styles.css';
import _ from 'lodash';
import { IShow } from '../../types';
import ShowCard from './ShowCard';
import Input from '../../components/Input';
import { OPTIONS } from './constants.js';

interface IPluralProps {
    shows: Array<IShow>;
    onSelectShow: (show: IShow) => void;
    query: string;
}

export const Plural: React.FC<IPluralProps> = ({ shows, onSelectShow, query }) => {
    const [sorter, setSorter] = useState<string>('yearAs');

    const path = _.get(_.find(OPTIONS, [`value`, sorter]), `path`) || 'premiered';
    const sortBy = _.get(_.find(OPTIONS, [`value`, sorter]), `sortBy`) || 'asc';
    const resultsMessage = _.isEmpty(shows) ?
        `We are sorry but there are no results for "${query}"` :
        `${shows.length} results ` + (query ? `for "${query}"` : ``);
            // sorter with years does not work as years need to be taken from a string.
         // I'd do it with _.reduce or _.map / going over the array of objects and adding "year" as separate attribute
    return (
        <div className="plural">
            {!_.isEmpty(shows) && (
                <div className="sorters">
                    <Input
                        noLabel
                        onChange={(value: string) => setSorter(value)}
                        options={OPTIONS}
                        placeholder='Year ascending'
                        select
                        value={sorter}
                    />
                </div>
            )}
            <div className="description">{resultsMessage}</div>
            <div className="shows">
                {_.map(_.sortBy(shows, path, sortBy), (show) => (
                    <ShowCard
                        key={show.id}
                        image={show.image?.medium}
                        onClick={() => onSelectShow(show)}
                        rating={show.rating.average}
                        year={show.premiered}
                    />
                ))}
            </div>
        </ div>
    );
}
