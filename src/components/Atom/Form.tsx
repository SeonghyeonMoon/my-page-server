import styled from 'styled-components';

type FormProps = {
  children: JSX.Element | JSX.Element[] | string | string[];
};

const Form = ({ children }: FormProps) => {
  return <Container>{children}</Container>;
};

export default Form;

const Container = styled.div`
  border-radius: 10px;
  padding: 10px;
`;
