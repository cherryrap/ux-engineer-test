import React from "react";
import b_ from 'b_';

import './style.scss';
const b = b_.lock(`Loader`);

interface ILoaderProps {
    isLoading: boolean;
    children: React.ReactChild;
}

export const Loader: React.FC<ILoaderProps> = ({ isLoading, children }) => {
    return isLoading ? (
            <div className={b(`logo-wrapper`)}>
                <div className={b(`logo`)} />
            </div>
        )
        : <>{children}</>;
};
