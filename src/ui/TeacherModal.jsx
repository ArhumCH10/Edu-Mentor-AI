import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 9px;
  box-shadow: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  padding: 2rem 3rem;
  transition: all 0.5s;
  width: auto; /* Adjust width as needed */
  max-height: 90vh; /* Adjust based on your preference */
  overflow-y: auto; /* Enables scrolling */
`;


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 5px;
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: #f3f4f6;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: #6b7280;
  }
`;

export default function Modal({ children, onClose }) {

  return createPortal(
    <Overlay onClick={onClose}> 
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <Button onClick={onClose}> {/* Use the passed onClose function */}
          <HiXMark />
        </Button>
        <div>
          {children}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired, // Ensure onClose is required
};