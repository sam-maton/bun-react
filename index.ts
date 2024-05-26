Bun.serve({
  fetch(req) {
    return new Response("Hello from Bun.js!");
  },
});

console.log("Server is running on http://localhost:3000/");