import React, { createContext, useEffect, useState } from 'react';

const AUTO_SCROLL = 'auto-scroll';

export const DataContext = createContext({
	networkError: '',
	setNetworkError: (networkError: string) => {}
});

interface Props 
{
    children:any
}

export const DataContextProvider: React.FC<Props> = ({ children }) => {
	const [networkError, setNetworkError] = useState('dd');


	const appContext = {
		networkError,
		setNetworkError: (networkError: string) => setNetworkError(networkError)
	};

	return <DataContext.Provider value={appContext}>{children}</DataContext.Provider>;
};

export const { Consumer } = DataContext;
