import ReactSlider from 'react-slider'
import styled from 'styled-components';
import PropTypes from 'prop-types';




const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 25px;
    margin-top: 10px;
    margin-bottom: 30px;
`;


const StyledThumb = styled.div`
    height: 25px;
    line-height: 25px;
    width: 25px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    cursor: grab;
`;

const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props => (props.index === 2 ? '#ddd' : props.index === 1 ? '#0f0' : '#ddd')};
    border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

export const Component5 = ({minPrice,maxPrice,setMinPrice,setMaxPrice}) => {
    
    const handleSliderChange = (values) => {
        setMinPrice(values[0]);
        setMaxPrice(values[1]);
    };

    return (
        <>
        
            <div  style={{ marginLeft: '0px'}}>
            <div style={{ fontWeight: 'bold', fontSize: '18px' , marginBottom: '7rem' }}>
                    Price per 50-min lesson:
                    </div>
                        <div className="values" style={{  marginLeft: '40%', fontWeight: 'bold', fontSize: '18px' }}>
                            {`$ ${minPrice} - $ ${maxPrice}`}
                        </div>
                        <StyledSlider
                            defaultValue={[minPrice, maxPrice]}
                            renderTrack={Track}
                            renderThumb={Thumb}
                            pearling
                            minDistance={1}
                            onChange={handleSliderChange}
                        />
                    </div>
              

        </>);
};

Component5.propTypes = {
    minPrice: PropTypes.array.isRequired,
    maxPrice: PropTypes.array.isRequired,
    setMinPrice: PropTypes.func.isRequired,
    setMaxPrice: PropTypes.func.isRequired,
  };
