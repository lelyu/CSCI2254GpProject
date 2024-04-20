import React, { useState } from 'react';
import "../css/ZipCodeInput.css";

const ZipCodeInput = ({ onZipCodeSubmit }) => {
    const [zipCode, setZipCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onZipCodeSubmit(zipCode);
    };

    return (
        <div className="zip-container">

            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <label>What is your zipcode?</label>
                <input
                    type="text"
                    id="zipCodeInput"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter Your ZIP code"
                    className="form-control mb-3"
                />
                <button type="submit" class="btn btn-outline-success">Submit</button>
            </form>

        </div>
    );
};

export default ZipCodeInput;
