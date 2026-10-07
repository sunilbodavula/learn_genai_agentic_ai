function mockModel(prompt) {
  const normalizedPrompt = prompt.toLowerCase();

  if (normalizedPrompt.includes("summarize")) {
    return "This text is about learning artificial intelligence through practical development.";
  }

  if (normalizedPrompt.includes("explain")) {
    return "Generative AI creates new content from instructions and context.";
  }

  return "I received your prompt and generated a response.";
}

const userPrompt = process.argv.slice(2).join(" ");

if (!userPrompt) {
  console.log("Please provide a prompt.");
  console.log('Example: node day1.js "Explain Generative AI"');
  process.exit(1);
}

console.log("User prompt:", userPrompt);
console.log("Model response:", mockModel(userPrompt));