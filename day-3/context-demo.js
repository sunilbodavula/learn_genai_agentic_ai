const customerContext = {
    orderId: 1052,
    expectedDelivery: "November 2",
    currentStatus: "Shipped",
    currentDate: "November 3"
};

const customerQuestion = 
    "Why hasn't my order been delivered?";

function buildPrompt(context, question){
    return `
    You are a customer support assistant.

    Customer information:
    Order ID: ${context.orderId}
    Expected delivery: ${context.expectedDelivery}
    Current status: ${context.currentStatus}
    Today's date: ${context.currentDate}

    Customer question: ${question}

    Explain the situation using only the information provided.
    If information is missing, say what needs to be checked.
    `;
}

const prompt = buildPrompt(
    customerContext,
    customerQuestion
);

console.log(prompt);
