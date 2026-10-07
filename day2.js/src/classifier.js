function mockAI(prompt) {
  if (prompt.includes("payment was deducted")) {
    return {
      category: "PAYMENT_DEDUCTED_ORDER_FAILED",
      priority: "HIGH",
      reason: "Payment was completed but the order was not created."
    };
  }else if (prompt.includes("login issue") || prompt.includes("cannot log in") || prompt.includes("cannot log into my account")) {
    return {
      category: "LOGIN_PROBLEM",
      priority: "MEDIUM",
      reason: "User is experiencing issues with login."
    };
  }else if (prompt.includes("account locked") || prompt.includes("account has been locked")) {
    return {
        category: "ACCOUNT_LOCKED",
        priority: "HIGH",
        reason: "User's account has been locked due to multiple failed login attempts."
    }
  }else if (prompt.includes("shipping delay") || prompt.includes("order delay") || prompt.includes("package is late") || prompt.includes("package is five days late")) {
    return {
      category: "SHIPPING_DELAY",
      priority: "MEDIUM",
      reason: "There is a delay in the shipping or order processing."
    }
  }else if (prompt.includes("product damaged") || prompt.includes("item damaged") || prompt.includes("product arrived broken")) {
    return {
      category: "PRODUCT_DAMAGED",
      priority: "HIGH",
      reason: "The product received by the customer is damaged."
    }
  }else if (prompt.includes("refund request") || prompt.includes("requesting refund") || prompt.includes("want my money back")) {
    return {
      category: "REFUND_REQUEST", 
        priority: "HIGH",
        reason: "The customer is requesting a refund for their order."
    }
  }

  return {
    category: "OTHER",
    priority: "MEDIUM",
    reason: "Unable to classify the issue."
  };
}

module.exports = { mockAI };