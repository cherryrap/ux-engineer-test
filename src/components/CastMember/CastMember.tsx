import React from "react";

interface ICastMemberProps {
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

export const CastMember: React.FC<ICastMemberProps> = ({ character, person }) => (
    <div className="cast-member">
        <div className="cast-member-image">
            {person.image && <img src={person.image.medium} alt="" />}
        </div>
        <strong>{person.name}</strong>&nbsp;as&nbsp;
        {character.name}
    </div>
);
