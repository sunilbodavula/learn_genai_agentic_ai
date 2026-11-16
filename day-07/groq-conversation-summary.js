import "dotenv/config";
import Groq from "groq-sdk";
import { createInterface } from "node:readline/promises";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function summarizeConversation(messages) {
  console.log("\nGenerating conversation summary");

  const completion = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL,
    messages: [
      {
        role: "system",
        content: `
          You are a conversation summarization assistant.

          You will receive:
          1. An existing conversation summary, if available.
          2. New conversation messages.

          Combine both into one updated summary.

          Summarize the conversation while preserving:
          - Important facts
          - User preferences 
          - Problems discussed
          - Desicions made
          - Relevant context for future questions

          Keep the summary concise and clear.
          Do not invent information.
          Do not discard important information from the existing summary.
        `
      },
      {
        role: "user",
        content: JSON.stringify({
          previousSummary: conversationSummary,
          newMessages: messages
        })
      }
    ],
    temperature: 0.2
  });

  const summary = completion.choices[0].message.content;

  console.log("\nSummary generated successfully")

  return summary;
}

async function manageConversationSummary(){
  const previousMessages = conversationHistory.slice(1);

  const completedTurns = previousMessages.length / 2;

  if(completedTurns < SUMMARY_TRIGGER_TURNS){
    return;
  }

  console.log("\nConversation limit reached.");

  const turnsToSummarize = previousMessages.slice(0, 4);

  const updatedSummary = await summarizeConversation(
    turnsToSummarize
  );

  conversationSummary = updatedSummary;

  conversationHistory.splice(1, 4);

  console.log("\nConversation summary updated.");
  console.log("Recent conversation history retained.");
}

const conversationHistory = [
  {
    role: "system",
    content: "You are a helpful assistant. Explain technical concepts simply and keep answers within 2 - 3 lines.",
  },
];

let conversationSummary = "";

const SUMMARY_TRIGGER_TURNS = 4;

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

function buildMessages(userQuestion){
  const systemMessage = conversationHistory[0];

  const currentUserMessage = {
    role: "user",
    content: userQuestion
  };

  const previousMessages = conversationHistory.slice(1);

  const selectedMessages = [];

  let estimatedTokens = estimateMessagesTokens([
    systemMessage,
    currentUserMessage
  ]);

  //include previous conversation summary
  const summaryMessage = conversationSummary
  ? {
    role: "system",
    content: `previous conversation summary: \n${conversationSummary}`
  }
  : null;

  if(summaryMessage){
    estimatedTokens += estimateMessagesTokens([summaryMessage]);
  };

  if(estimateTokens > MAX_INPUT_TOKENS){
    throw new Error(
      "System prompt, summary and user question exceed the token budget."
    );
  }

  for (let i = previousMessages.length - 2; i >= 0; i -= 2) {
    const turn = previousMessages.slice(i, i + 2);

    const turnTokens = estimateMessagesTokens(turn);

    if (estimatedTokens + turnTokens > MAX_INPUT_TOKENS) {
      break;
    }

    selectedMessages.unshift(...turn);

    estimatedTokens += turnTokens;
  }

  return [
    systemMessage,
    ...(summaryMessage ? [summaryMessage] : []),
    ...selectedMessages,
    currentUserMessage
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

        console.log("Messages sent:", messages.length);
        console.log(
            "Previous turns included:",
            (messages.length - 2) / 2
        );

        conversationHistory.push({
          role: "user",
          content: userQuestion,
        });

        conversationHistory.push({
          role: "assistant",
          content: answer || "No visible response received.",
        });

        await manageConversationSummary();

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