import React from 'react';
import b_ from 'b_';
import Icon from '../../../components/Icon';
import './style.scss';
import _ from 'lodash';

const b = b_.lock(`ShowCard`);

const ShowCard = ({
    image = '',
    onClick = _.noop,
    rating = null,
    year = null,
}) => (
    <div className={b()} onClick={onClick}>
        <div className={b(`bg`)}>
            <div
                className={b(`bg-image`)}
                style={image ? {  backgroundImage: `url(${image})` } : {  backgroundColor: `$black40Color` }}
            />
        </div>
        <div className={b(`wrapper`)}>
            {year && (
                <div className={b(`year`)}>
                    {_.slice(year, 0,4)}
                </div>
            )}
            {rating && (
                <div className={b(`rating`)}>
                    <Icon icon='star' size='small' />
                    {rating}
                </div>
            )}
        </div>
    </div>
);

export default ShowCard;
