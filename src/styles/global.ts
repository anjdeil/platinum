import { createGlobalStyle } from "styled-components";
import { montserrat } from "./theme";

const GlobalStyle = createGlobalStyle`
 * {
    padding: 0;
    margin: 0;
    scrollbar-width: 4px;    

    @media (min-width: 1024px) {
        scrollbar-width: 8px;
    }
}

input[type=search]::-ms-clear {
    display: none;
    width: 0;
    height: 0;
}

input[type=search]::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
    display: none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}

html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    scrollbar-gutter: stable; 
}

body {
    margin: 0;
     font-family: ${montserrat.style.fontFamily}, sans-serif;
}

main {
    display: block;
}

h1 {
    font-size: 2em;
    margin: 0.67em 0;
}

hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
}

pre {
    font-family: monospace, monospace;
    font-size: 1em;
}


a {
    background-color: transparent;
}

abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
}

b,
strong {
    font-weight: bolder;
}

code,
kbd,
samp {
    font-family: monospace, monospace;
    font-size: 1em;
}

small {
    font-size: 80%;
}

sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}

sub {
    bottom: -0.25em;
}

sup {
    top: -0.5em;
}

img {
    border-style: none;
}

button,
input,
optgroup,
select,
textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
}

button,
input {
    /* 1 */
    overflow: visible;
}

button,
select {
    text-transform: none;
}

button,
[type="button"],
[type="reset"],
[type="submit"] {
    -webkit-appearance: button;
}

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
}

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
}
button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
}

fieldset {
    padding: 0.35em 0.75em 0.625em;
}

legend {
    box-sizing: border-box;
}
fieldset {
    padding: 0.35em 0.75em 0.625em;
}

legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
}

progress {
    vertical-align: baseline;
}

textarea {
    overflow: auto;
}

[type="radio"] {
    box-sizing: border-box;
    padding: 0;
}

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
    height: auto;
}

[type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
}

[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
}

::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
}

details {
    display: block;
}

summary {
    display: list-item;
}

template {
    display: none;
}

[hidden] {
    display: none;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #113760;
  border-radius: 6.5px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-button {
  display: none;
}

`;

export default GlobalStyle;
