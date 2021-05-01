const server = Deno.listen({ port: 8080 });

for await (const connection of server) {
  handleRequests(connection);
}

async function handleRequests(connection: Deno.Conn) {
  const httpConn = Deno.serveHttp(connection);

  for await (const requestEvent of httpConn) {
    const body = `Your user-agent is:\n\n${
      requestEvent.request.headers.get("user-agent") ?? "Unknown"
    }`;

    requestEvent.respondWith(
      new Response(body, {
        status: 200,
        headers: { server: "Deno-HTTP" },
      })
    );
  }
}
