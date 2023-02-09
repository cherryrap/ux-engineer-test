import React from 'react';

import './styles.css';

interface ICastCardProps {
    person: {
        name: string;
        image: {
            medium: string;
        };
    };
    character: {
        name: string;
    };
}

export const CastCard: React.FC<ICastCardProps> = ({ character, person }) => (
    <div className='cast-member'>
        <div className='cast-member-image'>
            {person.image && <img src={person.image.medium} alt="" />}
        </div>
        <strong>{person.name}</strong>&nbsp;as&nbsp;
        {character.name}
    </div>
);
