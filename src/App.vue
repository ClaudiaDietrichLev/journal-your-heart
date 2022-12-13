<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view />
</template>

<style>
*,
*::after,
*::before {
  box-sizing: border-box;
}
/* latin */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(@/assets/fonts/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}
@font-face {
  font-family: "Fredoka One";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(@/assets/fonts/k3kUo8kEI-tA1RRcTZGmTlHGCaen8wf-.woff2)
    format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}
body {
  margin: 0;
  width: 500px;
}

 {
  margin: auto;
}

:root {
  --color-accent: #fa594e;
  --color-bg: #e5c5b6;
  --color-text: #2a252c;
  --color-accent-active: #f73029;
  --color-bg-active: #f9eae3;
  --color-white: white;

  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: var(--color-text);
  margin: 0;
}

h1,
h3 {
  font-family: "Fredoka One", cursive;
  text-align: center;
}

.visually-hidden {
  position: absolute;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  margin: -1px;
}
</style>
