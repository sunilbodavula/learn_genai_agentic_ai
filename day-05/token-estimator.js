const instructions = `
You are a customer support assistant.
Use simple  English.
Be polite and professional.
Do not invent information.
`;

const customerContext = `
    Customer Name: Sunil
    Ticket Id: 1052
    Issue: Unable to login
    Account Status: Unknown
`;

const question = `
Why am I unable to login?
`;

function estimateTokens(text){
    return Math.ceil(text.length / 4);
}

const prompt = `
${instructions}
${customerContext}
${question}
`;

const characterCount = prompt.length;

const estimatedTokens = estimateTokens(prompt);

console.log("Prompt:", prompt);

console.log("Character Count:", characterCount);

console.log("Estimated Tokens:", estimatedTokens);

