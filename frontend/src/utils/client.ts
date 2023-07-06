import { createTRPCProxyClient, createWSClient, httpBatchLink, wsLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "../../../backend/src/router";

function getEndingLink() {
  if (typeof window === "undefined") {
    return httpBatchLink<AppRouter>({
      url: "http://localhost:3000/trpc",
    });
  }
  const client = createWSClient({
    url: "ws://localhost:3000/trpc",
  });
  return wsLink<AppRouter>({
    client,
  });
}

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    // loggerLink({
    //   enabled: (opts) =>
    //     (process.env.NODE_ENV === "development" && typeof window !== "undefined") ||
    //     (opts.direction === "down" && opts.result instanceof Error),
    // }),
    getEndingLink(),
  ],
});

// const wsClient = createWSClient({
//   url: `ws://localhost:3000/trpc`,
// });
// export const trpc = createTRPCProxyClient<AppRouter>({
//   links: [
//     splitLink({
//       condition: (op) => op.type === "subscription",
//       true: wsLink({ client: wsClient }),
//       false: httpBatchLink({ url: "http://localhost:3000/trpc" }),
//     }),
//   ],
// });

// export const trpc = createTRPCProxyClient<AppRouter>({
//   links: [
//     httpBatchLink({
//       url: "http://localhost:3000/trpc",
//     }),
//     wsLink<AppRouter>({
//       client: wsClient,
//     }),
//   ],
// });
