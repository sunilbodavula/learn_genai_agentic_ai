# GenAI and Agentic AI Learning

My practical learning journey from AI fundamentals
to building production-oriented AI applications.

## Day 1: Introduction

### What I learned
- Traditional programming follows programmed rules.
- Generative AI generates content from input and context.
- Agentic AI uses tools to pursue a goal.
- Rule-based programs can fail when their predefined
  rules do not cover an input.

### Hands-on practice
Created a JavaScript program to classify customer issues
using simple keyword-based rules.

### Progress
- [x] Created the learning repository
- [x] Practiced rule-based classification
- [ ] Connected to a real AI model
- [ ] Built an AI-powered application

## Day 2: How LLMs Generate Text

### What I learned
- LLM stands for Large Language Model.
- LLMs generate text by repeatedly predicting the next token.
- A token can be a word, part of a word, or punctuation.
- Generated text is not guaranteed to be factually correct.
- A hardcoded next-token lookup is a simulation, not a real LLM.

### Hands-on practice
Created a JavaScript program that simulates
step-by-step text generation using predefined mappings.

Experimented with an input that was not covered
by the predefined mappings.

### Progress
- [x] Learned the basic idea behind LLM text generation
- [x] Practiced a simplified generation loop
- [ ] Connected to a real AI model

## Day 3: Understanding Context

### What I learned
- Context provides information that helps an AI model answer a question.
- The same question can lead to different responses when the context changes.
- A context window limits the amount of information a model can process.
- Context can include instructions, conversation history,
  retrieved information, and the current question.
- AI applications should verify important facts using trusted systems.

### Hands-on practice
Created a JavaScript function to combine customer order
information and a question into a prompt.

Changed the order status to observe how the available
context changes.

### Progress
- [x] Learned the basic concept of context
- [x] Built a prompt-preparation function
- [x] Experimented with changing context
- [ ] Connected to a real AI model

## Day 4: Prompt Engineering Fundamentals

### What I learned
- Instructions tell the model how to respond.
- Context provides relevant information.
- Tasks specify what the model should do.
- Changing instructions can influence the response.
- Prompts can request structured output.
- Important information should be verified using trusted systems.

### Hands-on practice
Created a structured prompt builder using JavaScript.

Experimented with different instructions while
keeping the customer information and task unchanged.

### Progress
- [x] Understood the basic idea of prompt engineering
- [x] Separated instructions, context, and task
- [x] Experimented with different output requirements
- [ ] Connected to a real AI model

## Day 5: Understanding Tokens

### What I learned
- Tokens are the units of text processed by LLMs.
- A token can represent a complete word or part of a word.
- One word does not necessarily equal one token.
- More input information generally means more input tokens.
- Token consumption can affect API cost and latency.
- Context windows limit the information a model can process.
- Relevant context is better than unnecessary information.

### Hands-on practice
Created a JavaScript token usage estimator
using an approximate characters-per-token formula.

Experimented with adding and removing conversation history.

### Progress
- [x] Understood the basic concept of tokens
- [x] Learned why token usage matters
- [x] Created an approximate token estimator
- [ ] Used an actual model tokenizer
- [ ] Connected to a real AI model

## Day 6: Understanding Temperature

### What I learned
- Temperature influences token-selection probabilities.
- Lower temperature generally produces more predictable responses.
- Higher temperature generally produces more varied responses.
- Temperature does not guarantee factual correctness.
- Temperature is useful to tune based on the application requirement.

### Hands-on practice
Created a JavaScript simulation of temperature-based
probability adjustment and token selection.

Experimented with temperatures 0.5, 1, and 2.

### Progress
- [x] Understood the basic concept of temperature
- [x] Learned how temperature affects probabilities
- [x] Simulated token selection using JavaScript
- [ ] Experimented with temperature using a real LLM

## Learning Progress

### Day 07 – Conversation History with Ollama and Groq

**Topics Covered:**
- Integrated Ollama and Groq APIs with Node.js.
- Understood how LLM APIs process user messages.
- Implemented conversation history to maintain context across multiple interactions.
- Learned how to maintain message history using JavaScript arrays.
- Understood the roles of `system`, `user`, and `assistant` messages.

**Hands-on Implementation:**
- Updated `ollama-chat.js` to support conversation history.
- Updated `groq-test.js` to support conversation history.
- Tested multiple follow-up questions to verify that the AI could remember previous messages within the same conversation.

**Key Learning:**
Conversation history allows an LLM application to maintain context across multiple interactions by sending previous messages along with the latest user question.

### Day 08 – Sliding Window Conversation History

**Topics Covered:**
- Understood why continuously maintaining the entire conversation history can increase token consumption.
- Learned about sliding window conversation management.
- Explored how to retain recent conversation turns while removing older messages.
- Understood the importance of preserving the system prompt.

**Hands-on Implementation:**
- Created `groq-history-window.js`.
- Implemented a sliding window using `MAX_TURNS`.
- Configured the application to retain the latest three conversation turns.
- Preserved the system message while removing older conversation messages.
- Tested multiple questions to verify that older messages were removed as the conversation grew.

**Key Learning:**
Sliding window conversation management helps control the amount of conversation history sent to an LLM while retaining recent context.

### Day 09 – Token Estimation and Token Budget Management

**Topics Covered:**
- Understood what tokens are and why they matter in LLM applications.
- Learned the difference between input tokens, output tokens, and total tokens.
- Explored approximate token estimation using character length.
- Understood how token budgets help control the context sent to an LLM.
- Compared estimated token usage with actual token usage reported by Groq.

**Hands-on Implementation:**
- Created `groq-token-budget.js`.
- Implemented `estimateTokens()` to estimate tokens from text length.
- Implemented `estimateMessagesTokens()` to estimate tokens across multiple messages.
- Configured `MAX_INPUT_TOKENS` to control the estimated input token budget.
- Implemented `buildMessages()` to select recent conversation turns based on the available estimated token budget.
- Preserved the system prompt and current user question.
- Retrieved actual token usage from Groq's API response using `completion.usage`.
- Compared estimated input tokens with actual input tokens.

**Key Learning:**
Token budget management helps control how much conversation context is sent to an LLM. Character-based token estimation is approximate and can differ from the actual tokenizer used by the model.

**Important Observation:**
The estimated input token count was lower than the actual input token count during testing. This demonstrated why approximate token estimation should not be treated as an exact measurement.