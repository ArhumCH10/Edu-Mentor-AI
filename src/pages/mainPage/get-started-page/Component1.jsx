import PropTypes from 'prop-types';

export const Component1 = ({ selectedOption, setSelectedOption }) => {

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        
    };
    return (
        <div >
            <label className={`option ${selectedOption === 'Career and business' ? 'act' : ''}`}>
                💼 Career and business
                <input
                    type="radio"
                    name="options"
                    value="Career and business"
                    checked={selectedOption === 'Career and business'}
                    onChange={() => handleOptionChange('Career and business')}
                />
            </label>

            <label className={`option ${selectedOption === 'Lessons for kids' ? 'act' : ''}`}>
                👶 Lessons for kids
                <input
                    type="radio"
                    name="options"
                    value="Lessons for kids"
                    checked={selectedOption === 'Lessons for kids'}
                    onChange={() => handleOptionChange('Lessons for kids')}
                />
            </label>

            <label className={`option ${selectedOption === 'Living abroad' ? 'act' : ''}`}>
                ✈️ Living abroad
                <input
                    type="radio"
                    name="options"
                    value="Living abroad"
                    checked={selectedOption === 'Living abroad'}
                    onChange={() => handleOptionChange('Living abroad')}
                />
            </label>

            <label className={`option ${selectedOption === 'Exams and course work' ? 'act' : ''}`}>
                📘 Exams and course work
                <input
                    type="radio"
                    name="options"
                    value="Exams and course work"
                    checked={selectedOption === 'Exams and course work'}
                    onChange={() => handleOptionChange('Exams and course work')}
                />
            </label>

            <label className={`option ${selectedOption === 'Culture, travel and hobby' ? 'act' : ''}`}>
                🌏 Culture, travel and hobby
                <input
                    type="radio"
                    name="options"
                    value="Culture, travel and hobby"
                    checked={selectedOption === 'Culture, travel and hobby'}
                    onChange={() => handleOptionChange('Culture, travel and hobby')}
                />
            </label>
        </div>
    );
};


Component1.propTypes = {
    selectedOption: PropTypes.any.isRequired,
    setSelectedOption: PropTypes.func.isRequired,
  };
