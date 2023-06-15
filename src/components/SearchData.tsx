import React from "react";
import {Input} from "antd";

const SearchData: React.FC<{ searchQuery: string, handleSearchQueryChange: (value: string) => void }> = ({ searchQuery, handleSearchQueryChange }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {/*<h3 style={{ marginRight: '8px', display: 'inline' }}>Search Data:</h3>*/}
            <Input.Search
                // style={{width: '50%'}}
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearchQueryChange(e.target.value)}
            />
        </div>
    );
};

export default SearchData;