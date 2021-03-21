var reverseShells = {};
var language = false;
const ipInput = document.querySelector('#input-ip');
const portInput = document.querySelector('#input-port');
const output = document.querySelector('#output');
const langContainer = document.querySelector('#lang-container');
const copyState = document.querySelector("#copy-state");

fetch('revshell.json')
.then(res => res.json())
.then(data => {
    reverseShells = data;
    for (key in data) {
        langContainer.innerHTML += `<button onclick="chooseLang('${key}')" language="${key}">${key}</button>`
    }
})

const chooseLang = (lang) => {
    language = lang;
    document.querySelectorAll("#lang-container > button").forEach(btn => btn.classList.remove("click"))
    document.querySelector(`button[language=${lang}]`).classList.add("click")
    refresh();
} 

ipInput.addEventListener("input", () => {
    if (language) refresh();
})

portInput.addEventListener("input", () => {
    if (language) refresh();
})

const refresh = () => {
    output.innerHTML = '';
    reverseShells[language].forEach(reverse => {
        output.innerHTML += `<pre class="${language}"><code title="click to copy">${reverse.replace('<IP>',`${ipInput.value}`).replace('<PORT>',`${portInput.value}`)}</code></pre>`;
    })
    document.querySelectorAll('code').forEach(code => {
        hljs.highlightBlock(code);
        code.addEventListener('click', () => {
            navigator.clipboard.writeText(code.textContent);
            copyState.style.display = "block";
            setTimeout(() => { copyState.style.display = "none" }, 2000);
        })
    })
}
