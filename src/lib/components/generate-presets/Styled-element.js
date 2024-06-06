import styled from "styled-components";

export const PresetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const PreHeader = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  div {
    display: flex;
    gap: 5px;
    flex-direction: column;

    input,
    select {
      width: 200px;
      padding: 5px;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  button {
    padding: 10px;
    cursor: pointer;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 5px;
  }
  button:nth-child(1) {
    background-color: #5bc185;
    &:hover {
      background-color: #4a9e6e;
    }
  }

  button:nth-child(2) {
    background-color: #4796c1;
    &:hover {
      background-color: #3b7a9e;
    }
    &:disabled {
      background-color: #3b7a9e;
      not-allowed;
    }

  }
  button:nth-child(3) {
    background-color: #e76d6d;
    &:hover {
      background-color: #c95a5a;
    }
    &:disabled {
      background-color: #c95a5a;
      not-allowed;
    }

  }
`;

export const PreviewContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const ArrayPreview = styled.pre`
  background-color: #f5f5f5;
  color: #000;
  padding: 10px;
  border-radius: 5px;
  min-width: 300px;
  overflow: auto;
  max-height: 200px;
  overflow-y: auto;
  white-space: pre-wrap;
`;
