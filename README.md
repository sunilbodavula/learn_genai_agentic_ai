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