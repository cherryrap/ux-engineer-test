export interface IShow {
    id: string;
    name: string;
    summary: string;
    language: string;
    image: {
        original: string;
        medium: string;
    };
    genres: [];
    rating: {
        average: number;
    };
    premiered: string;
    _embedded?: {
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
