import React from "react";
import {Input} from "antd";

const SearchData: React.FC<{ searchQuery: string, handleSearchQueryChange: (value: string) => void }> = ({ searchQuery, handleSearchQueryChange }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input.Search
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearchQueryChange(e.target.value)}
            />
        </div>
    );
};

export default SearchData;