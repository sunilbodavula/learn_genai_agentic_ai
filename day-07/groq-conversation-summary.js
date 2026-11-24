import "dotenv/config";
import Groq from "groq-sdk";
import { createInterface } from "node:readline/promises";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function summarizeConversation(messages) {
  throw new Error("Simulated summarization failure");
  console.log("\nGenerating conversation summary");

  const completion = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL,
    messages: [
      {
        role: "system",
        content: `
          You are a conversation memory manager.

          Your task is to create or update a concise summary
          that will help an AI assistant remember important
          information from previous conversations.

          You will receive:
          1. An existing conversation summary, if available.
          2. New conversation messages.

          Combine the existing summary and new messages
          into one updated summary.

          Organize the summary into these sections:

          1. User Information
            - Name and relevant background.

          2. Technologies and Skills
            - Technologies the user is learning or using.

          3. Learning Goals
            - Explicit goals stated by the user.

          4. User Preferences
            - Preferred explanation style and learning approach.

          5. Important Decisions and Progress
            - Decisions, completed tasks, and current progress.

          Important rules:
          - Prioritize information explicitly provided by the user.
          - Preserve important details from the existing summary.
          - Do not confuse assistant suggestions with user goals.
          - Do not invent missing information.
          - Do not mark a section as unspecified if the information
            appears in either the existing summary or new messages.
          - Keep the summary concise but sufficiently detailed.
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

function validateSummary(summary){
  if(typeof summary !== "string"){
    throw new TypeError("Summary must be a string.");
  }

  const cleanedSummary = summary.trim();

  if(cleanedSummary.length === 0){
    throw new Error("Generated summary is empty.");
  }

  const MAX_SUMMARY_CHARS = 2000;

  if(cleanedSummary.length > MAX_SUMMARY_CHARS){
    throw new Error("Generated Summary exceeds the allowed length.");
  }

  return cleanedSummary;
}

async function manageConversationSummary(){
  const previousMessages = conversationHistory.slice(1);

  const completedTurns = previousMessages.length / 2;

  if(completedTurns < SUMMARY_TRIGGER_TURNS){
    return;
  }

  console.log("\nConversation limit reached.");

  const turnsToSummarize = previousMessages.slice(0, 8);

  try{
    const rawSummary = await summarizeConversation(
      turnsToSummarize
    );

    const updatedSummary = validateSummary(rawSummary);

    conversationSummary = updatedSummary;

    console.log("\nUpdated Conversation Summary:");
    console.log(conversationSummary);

    conversationHistory.splice(1, 8);

    console.log("\nConversation summary updated.");
    console.log("Older conversation messages compacted into summary.");
  }catch(error){
    console.error("\nMemory update failed:", error.message);

    console.log("Existing summary and conversation history retained.");
  }
}

const conversationHistory = [
  {
  role: "system",
  content: `
    You are a helpful technical learning assistant.

    Explain technical concepts in simple language.
    Prefer practical examples when explaining concepts.
    Break complex topics into small, manageable steps.
    Keep responses concise unless more detail is required.
    Do not assume information that the user has not provided.
  `,
}
];

let conversationSummary = "";

const SUMMARY_TRIGGER_TURNS = 4;

const MAX_INPUT_TOKENS = 1000;

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

  if(estimatedTokens > MAX_INPUT_TOKENS){
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

        const previousTurnsIncluded =
          messages.filter(message => message.role === "user").length - 1;
          
        console.log("Previous turns included:", previousTurnsIncluded);

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