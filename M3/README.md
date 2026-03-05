# SWE 250P LAB A — Practice M3

## 1. Testing Environment

| Item                      | Details                         |
|---------------------------|---------------------------------|
| **Node.js Version**       | v22.19.0                        |
| **npm Version**           | 11.11.0                         |
| **Operating System**      | macOS 26.3 (Tahoe)              |
| **Computer Architecture** | ARM64 (Apple M-series)          |
| **Browser**               | Google Chrome 134.0.6998.89     |

---

## 2. React Features Used

1. **Class-based React components** — `class CourseCard extends React.Component` with constructor, render method
2. **JSX syntax** — HTML-like tags written inside JavaScript, transpiled by Babel to `React.createElement()` calls
3. **`React.createElement()`** — demonstrated separately in `basic.html` without JSX, to show what JSX compiles to
4. **`defaultProps`** — provides fallback values for optional props (e.g., "No description available")
5. **`propTypes`** — runtime validation of prop types using the PropTypes library
6. **`setState()`** — triggers component re-render after updating internal data (button click appends ✓ to title)
7. **`ReactDOM.render()`** — mounts the React component tree into a real DOM element

---

## 3. Cross-Browser Testing Considerations

The application uses React 16 loaded via CDN (unpkg.com), which is compatible with all modern browsers including Chrome, Firefox, Safari, and Edge. The JSX code is pre-transpiled by Babel (targeting the last 3 browser versions and Safari 6+), so no browser-side compilation is required. The HTML pages use only standard HTML5 and CSS3 features. To verify cross-browser compatibility, one can open the HTML files in different browsers and confirm that all components render correctly, the "Mark Visited" button interaction works (title text updates), and the console shows no errors.

---

## 4. How to Build and Test

```bash
cd M3

# Install Babel dependencies
npm install

# Transpile JSX to JavaScript
npx babel main.jsx --out-file main.js

# Test the no-JSX version (Chapter 3 approach)
open basic.html

# Test the JSX version (Chapter 4 approach)
open index.html
```

---

## 5. Source Code Files

| File            | Description                                                |
|-----------------|------------------------------------------------------------|
| `basic.html`    | Self-contained React demo using `React.createElement()`   |
| `main.jsx`      | JSX source code with class components and React features   |
| `main.js`       | Babel-transpiled output (auto-generated from main.jsx)     |
| `index.html`    | Host HTML that loads React CDN + transpiled main.js        |
| `.babelrc`      | Babel configuration for JSX and ES6+ transpilation         |
| `package.json`  | NPM project configuration with Babel dependencies          |
| `README.md`     | This documentation file                                    |
