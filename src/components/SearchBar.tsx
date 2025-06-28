import React from 'react';

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
  type="text"
  placeholder="Search products..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full sm:w-96 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
  
    />
  );
};

export default SearchBar;
