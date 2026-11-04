const instructions = `
You are a customer support assistant.

Follow these rules:
1. Be polite and professional.
2. Use simple English.
3. Keep the response short.
4. Do not invent information.
5. If information is missing, clearly mention it.
`;

const customerContext = {
    customerName: "Sunil",
    orderId: 1052,
    expectedDelivery: "November 2",
    currentStatus: "Shipped",
    currentDate: "November 4"
};

const task = `
Explain the current order status to the customer.
And also explain what they should do if the order 
does not arrive.
`;

function buildPrompt(instructions, context, task){
    return `
    INSTRUCTIONS:
    ${instructions}

    CUSTOMER INFORMATION:
    Customer Name: ${context.customerName}
    Order Id: ${context.orderId}
    Expected Delivery: ${context.expectedDelivery}
    Current Status: ${context.currentStatus}
    Today's Date: ${context.currentDate}

    TASK:
    ${task}
    `;
};

const prompt = buildPrompt(
    instructions,
    customerContext,
    task
);

console.log(prompt);