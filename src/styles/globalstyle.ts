import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    &::-webkit-scrollbar {
		width: 5px;
    }
    &::-webkit-scrollbar-thumb {
		border-radius: 10px;
	}
  }
  li {
    list-style: none;
  }
  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
