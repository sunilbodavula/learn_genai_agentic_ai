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