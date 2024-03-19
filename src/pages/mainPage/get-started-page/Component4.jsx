import { FiSun, FiMoon, FiSunset, FiCoffee, FiSunrise, FiCloudDrizzle } from 'react-icons/fi';
import PropTypes from 'prop-types';

export const Component4 = ({selectedTimes,setSelectedTimes,selectedDays,setSelectedDays}) => {

    const handleTimeSelection = (time) => {
        if (selectedTimes.includes(time)) {
            setSelectedTimes(selectedTimes.filter((selectedTime) => selectedTime !== time));
        } else {
            setSelectedTimes([...selectedTimes, time]);
        }
    };

    const handleDaySelection = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };
    return (
        <div className="time-filter-block" >
        <div className="filter-label">Times</div>
        <div className="block">
            <div className="layout-flex">
                <p className="text">Morning</p>
                <div className="layout-grid">
                    <button
                        className={`time-item ${selectedTimes.includes('3-6') ? 'selected' : ''}`}
                        onClick={() => handleTimeSelection('3-6')}
                    >
                        <FiCloudDrizzle />
                        <span>3-6</span>
                    </button>
                    <button
                        className={`time-item ${selectedTimes.includes('6-9') ? 'selected' : ''}`}
                        onClick={() => handleTimeSelection('6-9')}
                    >
                        <FiSunrise />
                        <span>6-9</span>
                    </button>
                </div>
            </div>
            <div className="layout-flex">
                <p className="text">Daytime</p>
                <div className="layout-grid">
                    <button
                        className={`time-item ${selectedTimes.includes('9-12') ? 'selected' : ''}`}
                        onClick={() => handleTimeSelection('9-12')}
                    >
                        <FiSun />
                        <span>9-12</span>
                    </button>
                    <button
                        className={`time-item ${selectedTimes.includes('12-15') ? 'selected' : ''}`}
                        onClick={() => handleTimeSelection('12-15')}
                    >
                        <FiSunset />
                        <span>12-15</span>
                    </button>
                    <button
                        className={`time-item ${selectedTimes.includes('15-18') ? 'selected' : ''}`}
                        onClick={() => handleTimeSelection('15-18')}
                    >
                        <FiCoffee />
                        <span>15-18</span>
                    </button>
                </div>
            </div>
            <div className="layout-flex">
                <p className="text">Evening and night</p>
                <div className="layout-grid">
                    <button
                        className={`time-item ${selectedTimes.includes('18-21') ? 'selected' : ''}`}
                        onClick={() => handleTimeSelection('18-21')}
                    >
                        <FiSunset />
                        <span>18-21</span>
                    </button>
                    <button
                        className={`time-item ${selectedTimes.includes('21-24') ? 'selected' : ''}`}
                        onClick={() => handleTimeSelection('21-24')}
                    >
                        <FiMoon />
                        <span>21-24</span>
                    </button>
                    <button
                        className={`time-item ${selectedTimes.includes('0-3') ? 'selected' : ''}`}
                        onClick={() => handleTimeSelection('0-3')}
                    >
                        <FiCloudDrizzle />
                        <span>0-3</span>
                    </button>
                </div>
            </div>

        </div>
        <div className="day-filter-block">
            <div className="filter-label">Days</div>
            <div className="chip-wrapper">
                <button
                    className={`day-item ${selectedDays.includes('Sun') ? 'selected' : ''}`}
                    onClick={() => handleDaySelection('Sun')}
                >
                    <span>Sun</span>
                </button>
                <button
                    className={`day-item ${selectedDays.includes('Mon') ? 'selected' : ''}`}
                    onClick={() => handleDaySelection('Mon')}
                >
                    <span>Mon</span>
                </button>
                <button
                    className={`day-item ${selectedDays.includes('Tues') ? 'selected' : ''}`}
                    onClick={() => handleDaySelection('Tues')}
                >
                    <span>Tues</span>
                </button>
                <button
                    className={`day-item ${selectedDays.includes('Wed') ? 'selected' : ''}`}
                    onClick={() => handleDaySelection('Wed')}
                >
                    <span>Wed</span>
                </button>
                <button
                    className={`day-item ${selectedDays.includes('Thurs') ? 'selected' : ''}`}
                    onClick={() => handleDaySelection('Thurs')}
                >
                    <span>Thurs</span>
                </button>
                <button
                    className={`day-item ${selectedDays.includes('Fri') ? 'selected' : ''}`}
                    onClick={() => handleDaySelection('Fri')}
                >
                    <span>Fri</span>
                </button>
                <button
                    className={`day-item ${selectedDays.includes('Sat') ? 'selected' : ''}`}
                    onClick={() => handleDaySelection('Sat')}
                >
                    <span>Sat</span>
                </button>
            </div>
        </div>
    </div>
    );
};


Component4.propTypes = {
    selectedTimes: PropTypes.number.isRequired,
    selectedDays: PropTypes.number.isRequired,
    setSelectedTimes: PropTypes.func.isRequired,
    setSelectedDays: PropTypes.func.isRequired,
  };
