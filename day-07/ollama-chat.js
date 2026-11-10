import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const rl = readline.createInterface({
    input: stdin,
    output: stdout,
});

const model = "llama3.2:3b";

async function main(){
    console.log("Ollama Chat Application");
    console.log("Model: ", model);
    console.log("Type 'exit' to quit. \n");

    while (true){
        const question = await rl.question("You: ");

        if(question.trim().toLowerCase() === "exit"){
            console.log("Goodbye!");
            break;
        }

        if(!question.trim()){
            console.log("Please enter a question.");
        }

        try {
            const response = await fetch(
                "http://localhost:11434/api/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: [
                            {
                                role: "user",
                                content: question,
                            },
                        ],
                        stream: false,
                    }),
                }
            );

            if(!response.ok){
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();

            console.log("\nAI:", data.message.content, "\n");
        }catch(error){
            console.error("\nError:", error.message);
            console.log("Check whether ollama is running.\n");
        }
    }

    rl.close();
}

main().catch((error) => {
    console.error("Application error:", error);
    rl.close();
});