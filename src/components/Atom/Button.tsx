import styled from 'styled-components';

type ButtonProps = {
  content: string;
  fullWidth?: boolean;
  isSub?: boolean;
  onClick: () => void;
};

const Button = ({ content, fullWidth }: ButtonProps) => {
  return <StyledButton fullWidth={fullWidth}>{content}</StyledButton>;
};

export default Button;

const StyledButton = styled.button<{ fullWidth?: boolean }>`
  border: none;
  border-radius: 7px;
  background-color: #000;
  color: #fff;
  padding: 12px;
  ${({ fullWidth }) => fullWidth && 'width: 100%; & + & {margin-top: 10px;}'}
  font-weight: bold;
  cursor: pointer;
`;
