import styled from "styled-components";

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  background: #fff;
  border: none;
  box-shadow: 0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 24px rgba(51, 51, 51, 0.24);
border-radius: 4px;
  width:100%;
`;

function input({value, onChange}) {
  return <Input type='text' onChange={onChange} value={value}/>;
}

export default input;

