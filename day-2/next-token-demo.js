const nextToken = {
"The": " customer",
"The customer": " needs",
"The customer needs": " help.",
}

function generateText(start, maxSteps = 5){
	let text = start;

	console.log(`Starting text: "${text}"`);

	for (let step = 1; step <= maxSteps; step++){
		const token = nextToken[text];

		if(token === undefined){
			console.log("No next token defined.");
			break;
		}

		text += token;

		console.log(`Step ${step}: Added "${token}" -> "${text}"`);
	}

	return text;
}

const result = generateText("The");

console.log("\nFinal Response:", result);