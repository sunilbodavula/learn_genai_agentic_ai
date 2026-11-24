function validateSummary(summary) {
  if (typeof summary !== "string") {
    throw new TypeError("Summary must be a string.");
  }

  const cleanedSummary = summary.trim();

  if (cleanedSummary.length === 0) {
    throw new Error("Generated summary is empty.");
  }

  const MAX_SUMMARY_CHARS = 2000;

  if (cleanedSummary.length > MAX_SUMMARY_CHARS) {
    throw new Error("Generated summary exceeds the allowed length.");
  }

  return cleanedSummary;
}

const testCases = [
  "Sunil is learning Java and GenAI.",
  "",
  "   ",
  123,
];

for (const testCase of testCases) {
  try {
    const result = validateSummary(testCase);
    console.log("VALID:", result);
  } catch (error) {
    console.log("INVALID:", error.message);
  }
}