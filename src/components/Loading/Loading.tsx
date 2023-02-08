import React from "react";

interface ILoadingProps {
    isLoading: boolean;
    children: React.ReactChild;
}

export const Loading: React.FC<ILoadingProps> = ({ isLoading, children }) => {
    console.log('Loading', isLoading);
    return isLoading ? <div>Loading...</div> : <>{children}</>;
};
