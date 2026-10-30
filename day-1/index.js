function classifyIssue(message){
    if(message.toLowerCase().includes("payment")){
        return "Payment related issue";
    }

    if(message.toLowerCase().includes("delivery")){
        return "Delivery related issue";
    }

    return "Unknown issue";
}

console.log(
    classifyIssue("My payment was deducted")
);

console.log(
    classifyIssue("My delivery is delayed")
);

console.log(
    classifyIssue("I cannot log into my account")
);