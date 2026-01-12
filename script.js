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
    output +=  `\n\n- End of Notes -`;
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
    let reasonText = "";

    if (type.includes("Leave") || type.includes("Sick")) {
        reasonText = "Due to unavoidable personal circumstances, I am unable to fulfill my regular responsibilities during this period. This situation requires my immediate attention.";
    }

    else if (type.includes("Internship")) {
        reasonText = "This opportunity aligns closely with my academic and professional goals and will help me gain valuable practical experience relevant to my field of study.";
    }

    else if (type.includes("Project")) {
        reasonText = "This submission is an important part of my academic requirements, and I have put sincere effort into ensuring that the work meets the expected standards.";
    }

    else if (type.includes("Complaint")) {
        reasonText = "The issue has been causing repeated inconvenience, and despite earlier efforts, it has not yet been resolved satisfactorily.";
    }

    else if (type.includes("Request")) {
        reasonText = "This request is made after careful consideration, as it directly affects my responsibilities and commitments.";
    }

    else {
        reasonText = "This matter is important and requires your kind attention and consideration.";
    }

    const format = document.getElementById("letterFormat").values;
    const tone = document.getElementById("letterTone").value;
    const length = document.getElementById("letterLength").value;
    const language = document.getElementById("letterLanguage").value;
    const details = document.getElementById("letterInput").value.trim();

    if (!details) {
        alert("Please enter basic details");
        return;
    }

    let greeting = "";

    // FORMAT-BASED GREETINGS
    if (format === "Strict Official") {
        greeting = "Respected Sir/Madam,";
    }

    if (format === "Professional Corporate") {
        greeting = "Dear Sir/Madam,";
    }

    if (format === "Student Academic") {
        greeting = "Respected Sir/Madam,";
    }

    if (format === "Request-Focused") {
        greeting = "Dear Sir/Madam,";
    }

    if (format === "Explanation-Focused") {
        greeting = "Respected Sir/Madam,";
    }

    // TONE OVERRIDE
    if (tone === "Very Formal") greeting = "Respected Sir/Madam,";
    if (tone === "Formal") greeting = "Dear Sir/Madam,";
    if (tone === "Polite") greeting = "Dear Sir/Madam,";
    if (tone === "Neutral") greeting = "Hello,";

    let formatProfile = {
        opening: "",
        emphasis: "",
        closingLine: ""
    };

    if (format === "Strict Official") {
        formatProfile.opening = "I respectfully submit this for your kind consideration.";
        formatProfile.emphasis = "This matter is placed before you in accordance with official procedure.";
        formatProfile.closingLine = "Kindly accord the necessary approval.";
    }

    if (format === "Professional Corporate") {
        formatProfile.opening = "I hope this message finds you well.";
        formatProfile.emphasis = "This request is made in line with professional expectations.";
        formatProfile.closingLine = "I appreciate your time and consideration.";
    }

    if (format === "Student Academic") {
        formatProfile.opening = "I am writing this as a student seeking your guidance and approval.";
        formatProfile.emphasis = "This request is directly related to my academic responsibilities.";
        formatProfile.closingLine = "I shall be grateful for your support.";
    }

    if (format === "Request-Focused") {
        formatProfile.opening = "I am writing to formally request your assistance in this matter.";
        formatProfile.emphasis = "This request is important and requires your kind consideration.";
        formatProfile.closingLine = "I sincerely request you to consider this favorably.";
    }

    if (format === "Explanation-Focused") {
        formatProfile.opening = "I am writing to explain my situation in detail for clarity.";
        formatProfile.emphasis = "The background of this matter is essential to understand the request.";
        formatProfile.closingLine = "Thank you for taking the time to understand my situation.";
    }
    let body = "";
    // ---------- SHORT (2 FULL PARAGRAPHS) ----------
    if (length === "Short") {
        body = `${formatProfile.opening}

    I am writing this ${type.toLowerCase()} regarding ${details}. ${reasonText}

    ${formatProfile.emphasis}`;
    }

    // ---------- STANDARD (3 FULL PARAGRAPHS) ----------
    if (length === "Standard") {
        body = `${formatProfile.opening}

    I am writing this ${type.toLowerCase()} regarding ${details}. ${reasonText}

    ${formatProfile.emphasis} I request you to kindly review this matter at your convenience and take the necessary action as deemed appropriate.`;
    }

    // ---------- DETAILED (4 FULL PARAGRAPHS) ----------
    if (length === "Detailed") {
        body = `${formatProfile.opening}

    I am writing this ${type.toLowerCase()} regarding ${details}. ${reasonText}

    ${formatProfile.emphasis} This request is made after careful consideration, and I believe it is reasonable under the given circumstances.

    I assure you that I will fulfill all responsibilities and comply with any conditions associated with this request. I sincerely hope for your understanding and support.`;
    }

    // ---------- SIMPLE ENGLISH OVERRIDE ----------
    if (language === "Simple English") {
        body = `I am writing this letter about ${details}.

    ${reasonText}

    I kindly request you to consider my situation and help me with this request.`;
    }

    let closing = "";

    // FORMAT-BASED CLOSINGS
    if (format === "Strict Official") {
        closing = "Thanking you.\n\nYours faithfully,";
    }

    if (format === "Professional Corporate") {
        closing = "Thank you for your time and consideration.\n\nKind regards,";
    }

    if (format === "Student Academic") {
        closing = "Thanking you.\n\nYours sincerely,";
    }

    if (format === "Request-Focused") {
        closing = "I shall be grateful for your kind consideration.\n\nYours sincerely,";
    }

    if (format === "Explanation-Focused") {
        closing = "Thank you for your patience and understanding.\n\nYours sincerely,";
    }

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
