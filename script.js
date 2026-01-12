/* ================================
   COMMON UTILITIES
================================ */

// Copy text to clipboard
function copyText(textareaId) {
    const textarea = document.getElementById(textareaId);
    textarea.select();
    document.execCommand("copy");
    alert("Copied to clipboard");
}

// Download as TXT
function downloadTXT(content, filename) {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Download as PDF (simple browser print)
function downloadPDF(content) {
    const win = window.open("", "", "width=800,height=600");
    win.document.write(`<pre style="font-family:Arial;white-space:pre-wrap;">${content}</pre>`);
    win.document.close();
    win.print();
}

/* ================================
   SMART NOTES FORMATTER
================================ */

document.getElementById("generateNotes").addEventListener("click", () => {
    const input = document.getElementById("notesInput").value.trim();
    if (!input) {
        alert("Please paste some text");
        return;
    }

    const mode = document.getElementById("notesMode").value;
    const subject = document.getElementById("notesSubject").value;
    const length = document.getElementById("notesLength").value;

    let output = `📘 ${subject} — ${mode}\n\n`;

    const sentences = input
        .replace(/\n+/g, " ")
        .split(".")
        .map(s => s.trim())
        .filter(s => s.length > 20);

    let limit = 5;
    if (length === "Medium") limit = 8;
    if (length === "Detailed") limit = 12;

    sentences.slice(0, limit).forEach((line, index) => {
        if (mode === "Bullet-Only Notes") {
            output += `• ${line}.\n`;
        } else if (mode === "Short Revision Notes") {
            output += `- ${line}.\n`;
        } else if (mode === "Teacher Explanation Style") {
            output += `${index + 1}. ${line}. This is important for understanding concepts clearly.\n\n`;
        } else {
            output += `• ${line}.\n`;
        }
    });

    output += `\n🔑 Key Points:\n• Definitions\n• Examples\n• Important terms highlighted during revision`;

    document.getElementById("notesOutput").value = output;
});

// Notes output actions
document.querySelector("#notes-tool .output-actions").addEventListener("click", (e) => {
    const content = document.getElementById("notesOutput").value;
    if (!content) return;

    if (e.target.innerText === "Copy") {
        copyText("notesOutput");
    }
    if (e.target.innerText === "Download TXT") {
        downloadTXT(content, "smart-notes.txt");
    }
    if (e.target.innerText === "Download PDF") {
        downloadPDF(content);
    }
});

/* ================================
   LETTER & EMAIL GENERATOR
================================ */

document.getElementById("generateLetter").addEventListener("click", () => {
    const type = document.getElementById("letterType").value;
    const tone = document.getElementById("letterTone").value;
    const length = document.getElementById("letterLength").value;
    const language = document.getElementById("letterLanguage").value;
    const details = document.getElementById("letterInput").value.trim();

    if (!details) {
        alert("Please enter basic details");
        return;
    }

    let greeting = "Respected Sir/Madam,";
    if (tone === "Polite") greeting = "Dear Sir/Madam,";
    if (tone === "Neutral") greeting = "Hello,";

    let body = `I am writing this ${type.toLowerCase()} regarding ${details}.`;

    if (length === "Detailed") {
        body += " I kindly request you to consider this matter carefully and provide the necessary approval at your convenience.";
    }

    if (language === "Simple English") {
        body = `I am writing this letter about ${details}. Please consider my request.`;
    }

    let closing = "Thanking you.\n\nYours sincerely,";

    const output =
`${greeting}

${body}

${closing}
[Your Name]`;

    document.getElementById("letterOutput").value = output;
});

// Letter output actions
document.querySelector("#letter-tool .output-actions").addEventListener("click", (e) => {
    const content = document.getElementById("letterOutput").value;
    if (!content) return;

    if (e.target.innerText === "Copy") {
        copyText("letterOutput");
    }
    if (e.target.innerText === "Edit") {
        document.getElementById("letterOutput").focus();
    }
    if (e.target.innerText === "Download PDF") {
        downloadPDF(content);
    }
});
