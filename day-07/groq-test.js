
import "dotenv/config";
import Groq from "groq-sdk";
import { createInterface } from "node:readline/promises";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  try {
    while (true) {
      const userQuestion = await rl.question(
        "\nEnter your question (or type exit): "
      );

      // Exit condition
      if (userQuestion.trim().toLowerCase() === "exit") {
        console.log("Goodbye!");
        break;
      }

      // Validate input
      if (!userQuestion.trim()) {
        console.log("Please enter a valid question.");
        continue;
      }

      try {
        console.log("\nThinking...\n");

        const completion = await groq.chat.completions.create({
          model: process.env.GROQ_MODEL,
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant. Explain technical concepts simply.",
            },
            {
              role: "user",
              content: userQuestion,
            },
          ],
          reasoning_effort: "low",
          reasoning_format: "hidden",
          max_completion_tokens: 800,
        });

        const answer = completion.choices[0].message.content;

        console.log("\nAI Response:\n");
        console.log(answer || "No visible response received.");

      } catch (error) {
        console.error("\nAPI Error:", error.message);
      }
    }
  } finally {
    rl.close();
  }
}

main();
