import fetch from "node-fetch";

const BASE_URL = "http://localhost:3000/validate-address";

const testCases = [
  {
    label: "✅ Valid full address (expected: valid)",
    input: "1600 Amphitheatre Parkway, Mountain View, CA 94043",
  },
  {
    label: "🟡 Partial address without ZIP (expected: corrected)",
    input: "1600 Amphitheatre Parkway, Mountain View, CA",
  },
  {
    label: "❌ Incomplete address (expected: unverifiable)",
    input: "123 St",
  },
  {
    label: "❌ Empty address (expected: unverifiable)",
    input: "",
  },
  {
    label: "🟡 Messy address with typos and spacing (expected: valid)",
    input: "  1600   Amphitheatre Pkway   MountainView , CA 94043 ",
  },
  {
    label: "🟡 Extra commas and symbols (expected: valid)",
    input: "1600, Amphitheatre Parkway,,, Mountain View, CA, 94043",
  },
];

(async () => {
  for (const testCase of testCases) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rawAddress: testCase.input }),
    });

    const json = await res.json();
    console.log(`\n${testCase.label}`);
    console.log("Input:", testCase.input);
    console.log("Response:", JSON.stringify(json, null, 2));
  }
})();
