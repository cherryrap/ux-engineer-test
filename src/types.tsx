export interface IShow {
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

export interface ICastMember {
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
