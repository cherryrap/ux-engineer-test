import React from "react";

interface ILoaderProps {
    isLoading: boolean;
    children: React.ReactChild;
}

export const Loader: React.FC<ILoaderProps> = ({ isLoading, children }) => {
    return isLoading ? <div>Loading...</div> : <>{children}</>;
};
