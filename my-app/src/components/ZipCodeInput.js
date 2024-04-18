// ZipCodeInput.js
import React, { useState } from 'react';

const ZipCodeInput = ({ onZipCodeSubmit }) => {
    const [zipCode, setZipCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onZipCodeSubmit(zipCode);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter ZIP code"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ZipCodeInput;
