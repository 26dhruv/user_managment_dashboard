import { createContext, useContext, useState } from 'react';

// Create a context for query
const SearchQueryContext = createContext();

// Custom hook to use the queryContext
export const useQuery = () => {
  return useContext(SearchQueryContext);
};

// Context provider component to wrap around the app
export const SearchQueryProvider = ({ children }) => {
  const [query, setQuery] = useState('');

  

  return (
    <SearchQueryContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
};
