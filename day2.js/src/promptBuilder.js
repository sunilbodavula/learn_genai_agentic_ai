function buildClassificationPrompt(customer, issue) {
  return `
You are a customer-support classification system.

Classify the issue into exactly one category.

Allowed categories:
- PAYMENT_FAILED
- PAYMENT_DEDUCTED_ORDER_FAILED
- ORDER_CANCELLED
- REFUND_REQUEST
- LOGIN_PROBLEM
- ACCOUNT_LOCKED
- SHIPPING_DELAY
- PRODUCT_DAMAGED
- REFUND_REQUEST
- OTHER

Customer:
${customer}

Issue:
${issue}

Return JSON with:
{
  "category": "...",
  "priority": "...",
  "reason": "..."
}
`;
}

module.exports = { buildClassificationPrompt };