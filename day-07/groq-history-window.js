
import "dotenv/config";
import Groq from "groq-sdk";
import { createInterface } from "node:readline/promises";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const conversationHistory = [
  {
    role: "system",
    content: "You are a helpful assistant. Explain technical concepts simply and keep answers within 2 - 3 lines.",
  },
];

const MAX_TURNS = 3;

function buildMessages(userQuestion) {
  const previousMessagesToKeep = (MAX_TURNS - 1) * 2; // Each turn has a user and assistant message

  const recentMessages = conversationHistory
    .slice(1)
    .slice(-previousMessagesToKeep);

    return [
      conversationHistory[0], // System message
      ...recentMessages,
      {
        role: "user",
        content: userQuestion,
      },
    ];
}

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
          messages: buildMessages(userQuestion),
          reasoning_effort: "low",
          reasoning_format: "hidden",
          max_completion_tokens: 800,
        });

        const answer = completion.choices[0].message.content;

        conversationHistory.push({
          role: "user",
          content: userQuestion,
        });

        conversationHistory.push({
          role: "assistant",
          content: answer || "No visible response received.",
        });

        const maxStoredMessages = MAX_TURNS * 2;

        const storedMessageCount = conversationHistory.length - 1; // Exclude system message

        if(storedMessageCount > maxStoredMessages){
          conversationHistory.splice(1, storedMessageCount - maxStoredMessages);
        }

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
