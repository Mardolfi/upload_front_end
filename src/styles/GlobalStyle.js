import { createGlobalStyle } from "styled-components";
import 'react-circular-progressbar/dist/styles.css'

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        font-family: Arial, Helvetica, sans-serif;
        background: #7159C1;
    }
`

export default GlobalStyle;