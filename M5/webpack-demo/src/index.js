// Simple arithmetic demo
let a = 2;
let b = 5;
let c = a * b;

// Display result in the page
document.addEventListener("DOMContentLoaded", function () {
    const output = document.getElementById("output");
    if (output) {
        output.innerHTML = `
            <div class="result-card">
                <h2>Webpack Bundle Output</h2>
                <p>This content is rendered by JavaScript bundled with Webpack.</p>
                <p><strong>Calculation:</strong> ${a} × ${b} = <span class="highlight">${c}</span></p>
                <p><strong>Bundle file:</strong> dist/main.js</p>
                <p class="note">The source file <code>src/index.js</code> was processed by Webpack
                   into a single minified bundle at <code>dist/main.js</code>.</p>
            </div>
        `;
    }
});

console.log("Hello world from your main file!");
console.log(`Calculation: ${a} × ${b} = ${c}`);
