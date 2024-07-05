import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 444;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 600px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.h2`
  margin: 0 0 20px 0;
`;

const ModalOption = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #f5f5f5;
  }
`;

const OptionIcon = styled.div`
  margin-right: 10px;
`;

const OptionText = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const BackButton = styled.button`
  padding: 10px;
  background: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #bbb;
  }
`;

const SaveButton = styled.button`
  padding: 10px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #45a049;
  }
`;

const FormField = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const CustomOffer = ({ onClose, recieverId ,senderId}) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [description, setDescription] = useState('');
    const [totalMonths, setTotalMonths] = useState('');
    const [price, setPrice] = useState('');
    const [paymentFrequency, setPaymentFrequency] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if(!recieverId){
            toast.error('Please select the chat again. Reciever Id is Missing.');
            return;
        }
        if(!senderId){
            toast.error('Please login again. Sender Id is Missing.');
            return;
        }
        if (!description || !totalMonths || !price || (selectedOption === 'Milestones' && !paymentFrequency)) {
          toast.error('Please fill in all the fields.');
          return;
        }
        const formData = {
            senderId,
          recieverId,
          description,
          totalMonths,
          price,
          paymentFrequency: selectedOption === 'Milestones' ? paymentFrequency : 'Single-Payment'
        };
        console.log(formData);
        setIsSaving(true);
        try {
            const response = await axios.post('http://localhost:8080/CustomOffer', formData);
            console.log('Offer saved:', response.data);
            toast.success('Offer saved successfully!');
            resetFields();
            onClose();
          } catch (error) {
            console.error('Error saving offer:', error);
            toast.error('Failed to save offer.',error);
          }finally {
            setIsSaving(false);
          }
      };

    const renderOptionSelection = () => (
        <>
            <ModalHeader>Choose how you want to get paid</ModalHeader>
            <p>Get paid in full once the project is completed, or break it into smaller chunks, called milestones, to get paid as you go.</p>
            <ModalOption onClick={() => setSelectedOption('Single Payment')}>
                <OptionIcon>💰</OptionIcon>
                <OptionText>
                    <strong>Single payment</strong>
                    <p>Get paid in full after each order is completed.</p>
                </OptionText>
            </ModalOption>
            <ModalOption onClick={() => setSelectedOption('Milestones')}>
                <OptionIcon>🏆</OptionIcon>
                <OptionText>
                    <strong>Milestones</strong>
                    <p>Work in gradual steps and get paid for each completed milestone.</p>
                </OptionText>
            </ModalOption>
            <BackButton onClick={() => { resetFields(); onClose(); }}>Cancel</BackButton>
        </>
    );

    const resetFields = () => {
        setDescription('');
        setTotalMonths('');
        setPrice('');
        setPaymentFrequency('');
        setSelectedOption('');
      };
    const renderForm = () => (
        <>
            <ModalHeader>Create {selectedOption === 'Single Payment' ? 'Single Payment' : 'Milestone'}</ModalHeader>
            <FormField>
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormField>
            <FormField>
                <label>Total Months:</label>
                <input type="number" value={totalMonths} onChange={(e) => setTotalMonths(e.target.value)} />
            </FormField>
            <FormField>
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </FormField>
            {selectedOption === 'Milestones' && (
                <FormField>
                    <label>Payment MileStone:</label>
                    <select value={paymentFrequency} onChange={(e) => setPaymentFrequency(e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </FormField>
            )}
            <ButtonContainer>
                <BackButton onClick={resetFields}>Back</BackButton>
                <SaveButton onClick={handleSave} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</SaveButton>
            </ButtonContainer>
        </>
    );

    return (

        <>
            <ToastContainer />
            <ModalBackdrop>
                <ModalContainer>
                    {selectedOption ? renderForm() : renderOptionSelection()}
                </ModalContainer>
            </ModalBackdrop>
        </>
    );
};

CustomOffer.propTypes = {
    onClose: PropTypes.func.isRequired,
    recieverId: PropTypes.string.isRequired,
    senderId: PropTypes.string.isRequired
};

export default CustomOffer;
