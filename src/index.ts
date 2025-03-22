import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create server instance
const server = new McpServer({
  name: "Greeter",
  version: "1.0.0",
});

server.tool(
  "say-hi",
  "says hi to the name intended by the user",
  { name: z.string() },
  async ({ name }) => {
    return {
      content: [
        {
          type: "text",
          text: `Hello ${name}`,
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
