import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
    box-sizing: border-box;
    color: #fff;
    &::-webkit-scrollbar {
		width: 5px;
    }
    &::-webkit-scrollbar-thumb {
		background-color: #fff;
		border-radius: 10px;
	}
  }
  body {
    background-color: #0a1929;
  }
  li {
    list-style: none;
  }
`;

export default GlobalStyle;
