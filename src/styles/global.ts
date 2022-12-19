import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    :root {
        --background-primary: '#F9FAFC';
        --background-secondary: '#FAFAFA';
        --background-tertiary: '#F1F5F6';
     
        --color-primary: '#885FFF';
        --color-secondary: '#5215FC';
        --color-tertiary: '#410ED3';
        --color-quaternary: '#280886';
        --color-quinary: '#12043E';

        --color-success: '#00C851';
        --color-success-hover: '#007E33';
        --color-warning: '#FFBB33';
        --color-warning-hover: '#FF8800';
        --color-danger: '#FF3547';
        --color-danger-hover: '#CC0000';
        --color-info: '#33B4E4';
        --color-info-hover: '#0099CC';
    }
    body {
        font-family: 'Roboto', sans-serif;
        background: var(--background-primary);
        font-size: 16px;
        height: 100vh;
    }
    a {
        text-decoration: none;
        color: var(--color-secondary);
        transition: color 0.3s ease-in-out;
    }
    a:hover {
        color: var(--color-tertiary);
    }
    li {
        list-style: none;
    }
`;
