import PropTypes from 'prop-types';

export const Component2 = ({englishLevel, setEnglishLevel}) => {

    const handleEnglishLevelChange = (level) => {
        setEnglishLevel(level);
    };
    return (
        <div >
        <label className={`option ${englishLevel === 'Just starting' ? 'act' : ''}`}>
            I&apos;m just starting
            <input
                type="radio"
                name="englishLevelOptions"
                value="Just starting"
                checked={englishLevel === 'Just starting'}
                onChange={() => handleEnglishLevelChange('Just starting')}
            />
        </label>

        <label className={`option ${englishLevel === 'Know the basics' ? 'act' : ''}`}>
            I know the basics
            <input
                type="radio"
                name="englishLevelOptions"
                value="Know the basics"
                checked={englishLevel === 'Know the basics'}
                onChange={() => handleEnglishLevelChange('Know the basics')}
            />
        </label>

        <label className={`option ${englishLevel === 'Conversational' ? 'act' : ''}`}>
            I&apos;m conversational
            <input
                type="radio"
                name="englishLevelOptions"
                value="Conversational"
                checked={englishLevel === 'Conversational'}
                onChange={() => handleEnglishLevelChange('Conversational')}
            />
        </label>

        <label className={`option ${englishLevel === 'Fluent in most situations' ? 'act' : ''}`}>
            I&apos;m fluent in most situations
            <input
                type="radio"
                name="englishLevelOptions"
                value="Fluent in most situations"
                checked={englishLevel === 'Fluent in most situations'}
                onChange={() => handleEnglishLevelChange('Fluent in most situations')}
            />
        </label>
    </div>
    );
};


Component2.propTypes = {
    englishLevel: PropTypes.any.isRequired,
    setEnglishLevel: PropTypes.func.isRequired,
  };
