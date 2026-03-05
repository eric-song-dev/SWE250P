# SWE 250P LAB A — Practice M2

## 1. Testing Environment

| Item                      | Details                         |
|---------------------------|---------------------------------|
| **Node.js Version**       | v22.19.0                        |
| **npm Version**           | 11.11.0                         |
| **Operating System**      | macOS 26.3 (Tahoe)              |
| **Computer Architecture** | ARM64 (Apple M-series)          |
| **Browser**               | Google Chrome 134.0.6998.89     |
| **Test URL**              | http://localhost:3000            |

---

## 2. Description of the Web Server Code

### server.js
The web server is built using Node.js's built-in `http` module—no external dependencies are needed.

When a request arrives, the server:
1. Uses the `fs` (file system) module to read `index.html` from disk.
2. Uses the `path` module to construct the file path in an OS-independent way.
3. Sets the `Content-Type` header to `text/html` so the browser renders the response as a web page.
4. Sends the HTML content back with a `200 OK` status, or responds with `500` if the file cannot be read.

### index.html
A simple, self-contained static HTML page with inline CSS styling. It displays a welcome message and credits the course.

---

## 3. How to Run

```bash
cd M2
npm install
npm start
```

Then open **http://localhost:3000** in your browser.

---

## 4. Cross-Browser / Cross-User Testing Considerations

To ensure this web page works for the majority of users:

1. **Standard HTTP & HTML**: The server uses the standard `http` module and the page uses only basic HTML5 and CSS3 features, which are supported by all modern browsers (Chrome, Firefox, Safari, Edge).
2. **No external dependencies**: The server relies solely on Node.js built-in modules (`http`, `fs`, `path`), so it runs on any system with Node.js installed (Windows, macOS, Linux).
3. **Responsive design**: The page uses `viewport` meta tag and flexible CSS (`max-width`, `min-height: 100vh`) to display correctly on different screen sizes.
4. **Character encoding**: UTF-8 is explicitly declared in the HTML `<meta>` tag, ensuring correct text rendering across locales.
5. **Port 3000**: Using port 3000 avoids requiring administrator/root privileges (needed for port 80), making it easier to run on any machine.

---

## 5. Source Code

| File            | Description                              |
|-----------------|------------------------------------------|
| `server.js`     | Node.js web server source code           |
| `index.html`    | Static HTML webpage served by the server |
| `package.json`  | NPM project configuration               |
| `README.md`     | This documentation file                  |
