import React from "react";
import {Input} from "antd";

const SearchData: React.FC<{ searchQuery: string, handleSearchQueryChange: (value: string) => void }> = ({ searchQuery, handleSearchQueryChange }) => {
    return (
        <div>
            <h3>Search Data:</h3>
            <Input.Search
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearchQueryChange(e.target.value)}
            />
        </div>
    );
};

export default SearchData;