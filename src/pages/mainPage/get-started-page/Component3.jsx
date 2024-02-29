import { IoSearchSharp } from "react-icons/io5";
import PropTypes from 'prop-types';

export const Component3 = ({searchTerm,setSearchTerm,searchResults,setSearchResults,selectedCountries,setSelectedCountries}) => {

    const allCountries = [
        { value: 'US', label: 'United States of America', flag: 'https://static.preply.com/groot/country_flags/4x3/us.svg' },
        { value: 'IN', label: 'India', flag: 'https://static.preply.com/groot/country_flags/4x3/in.svg' },
        { value: 'GB', label: 'United Kingdom', flag: 'https://static.preply.com/groot/country_flags/4x3/gb.svg' },
        { value: 'CA', label: 'Canada', flag: 'https://static.preply.com/groot/country_flags/4x3/ca.svg' },
        { value: 'AU', label: 'Australia', flag: 'https://static.preply.com/groot/country_flags/4x3/au.svg' },
        { value: 'PK', label: 'Pakistan', flag: 'https://static.preply.com/groot/country_flags/4x3/pk.svg' },
    ];
    const handleCountryCheckboxChange = (value) => {
        setSelectedCountries((prevSelected) => {
            const isSelected = prevSelected.includes(value);
            if (isSelected) {
                return prevSelected.filter((country) => country !== value);
            } else {
                return [...prevSelected, value];
            }
        });
    };
    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        const results = allCountries.filter(country =>
            country.label.toLowerCase().includes(term.toLowerCase())
        );

        setSearchResults(results);
    };
    return (
        <div >
        <div className="search-bar">
            <IoSearchSharp className="search-icon" />
            <input
                type="text"
                placeholder="Search countries"
                autoComplete="off"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />
        </div>
        {searchTerm !== '' && (
            searchResults.map(({ value, label, flag }) => (
                <label key={value} className={`option ${selectedCountries.includes(value) ? 'act' : ''}`}>
                    <img src={flag} alt={label} width="24px" className="country-flag" />
                    {label}
                    <input
                        type="checkbox"
                        value={value}
                        checked={selectedCountries.includes(value)}
                        onChange={() => handleCountryCheckboxChange(value)}
                    />
                </label>
            ))
        )}
        {searchTerm === '' && (allCountries.map(({ value, label, flag }) => (
            <label key={value} className={`option ${selectedCountries.includes(value) ? 'act' : ''}`}>
                <img src={flag} alt={label} width="24px" className="country-flag" />
                {label}
                <input
                    type="checkbox"
                    value={value}
                    checked={selectedCountries.includes(value)}
                    onChange={() => handleCountryCheckboxChange(value)}
                />
            </label>
        )))}
    </div>
    );
};

Component3.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    searchResults: PropTypes.array.isRequired,
    setSearchResults: PropTypes.func.isRequired,
    selectedCountries: PropTypes.array.isRequired,
    setSelectedCountries: PropTypes.func.isRequired,
  };
