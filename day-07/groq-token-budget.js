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

const MAX_TURNS = 10;
const MAX_INPUT_TOKENS = 180;

function estimateTokens(text){
  return Math.ceil(text.length / 4);
}

function estimateMessagesTokens(messages){
  return messages.reduce((total, message) => {
    return total + estimateTokens(message.content) + 4;
  }, 0);
}

function buildMessages(userQuestion) {
  const systemMessage = conversationHistory[0];

  const currentUserMessage = {
    role: "user",
    content: userQuestion
  };

  const previousMessages = conversationHistory.slice(1);

  const selectedMessages = [];

  let estimatedTokens = estimateMessagesTokens([systemMessage, currentUserMessage]);

  if(estimatedTokens > MAX_INPUT_TOKENS){
    throw new Error("System prompt and user question exceed the token budget.")
  };

  for(let i = previousMessages.length - 2; i >= 0; i -= 2){
    const turn = previousMessages.slice(i, i + 2);

    const turnTokens = estimateMessagesTokens(turn);

    if(estimatedTokens + turnTokens > MAX_INPUT_TOKENS){
      break;
    }

    selectedMessages.unshift(...turn);

    estimatedTokens += turnTokens;
  }

  return [
    systemMessage,
    ...selectedMessages,
    currentUserMessage
  ]

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

      const messages = buildMessages(userQuestion);

      const estimatedInputTokens = estimateMessagesTokens(messages);

      try {
        console.log("\nThinking...\n");

        const completion = await groq.chat.completions.create({
          model: process.env.GROQ_MODEL,
          messages: messages,
          reasoning_effort: "low",
          reasoning_format: "hidden",
          max_completion_tokens: 800,
        });

        const answer = completion.choices[0].message.content;

        const usage = completion.usage;

        console.log("\nToken Usage:");

        console.log(
            "Estimated input tokens:",
            estimatedInputTokens
        );

        console.log(
            "Actual input tokens:",
            usage?.prompt_tokens
        );

        console.log(
            "Output tokens:",
            usage?.completion_tokens
        );

        console.log(
            "Total tokens:",
            usage?.total_tokens
        );

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
