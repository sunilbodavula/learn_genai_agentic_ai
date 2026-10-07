const {
  buildClassificationPrompt
} = require("./promptBuilder");

const {
  mockAI
} = require("./classifier");

const customer = "John";

const issues = [
    "My payment was deducted but the order was not created.",
  "I cannot log into my account",
  "My account has been locked",
  "My package is five days late",
  "The product arrived broken",
  "I want my money back"
];

const randomIssue = issues[Math.floor(Math.random() * issues.length)];

const prompt = buildClassificationPrompt(
  customer,
  randomIssue
);

console.log("Generated Prompt:");
console.log(prompt);

const result = mockAI(randomIssue);

console.log("\nAI Result:");
console.log(result);