const https = require("https");

const payload = JSON.stringify({ test: "cors-check", timestamp: new Date().toISOString() });

const options = {
  hostname: "httpbin.org",
  port: 443,
  path: "/post",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
  },
};

const req = https.request(options, (res) => {
  let body = "";
  res.on("data", (chunk) => (body += chunk));
  res.on("end", () => {
    const parsed = JSON.parse(body);
    console.log("Status:", res.statusCode);
    console.log("Response OK:", parsed.json === null ? "N/A" : "JSON received");
    console.log("Data sent:", parsed.json ? "YES" : "NO");
    console.log("Full response:", JSON.stringify(parsed, null, 2).substring(0, 500));
  });
});

req.on("error", (e) => {
  console.error("CORS/HTTPS Error:", e.message);
  process.exit(1);
});

req.write(payload);
req.end();
