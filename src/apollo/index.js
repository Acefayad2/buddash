import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import resolveMock from "./mocks";

// NOTE: The original BudDash demo backend (enatega-multivendor.up.railway.app)
// is offline, and the production backend is a paid/proprietary license. To make
// the template render standalone, this client serves LOCAL MOCK DATA instead of
// hitting a server. Swap this back to a real HttpLink/WebSocketLink when you
// connect a backend. See ./mocks.js for the data.
const setupApollo = () => {
  const cache = new InMemoryCache();

  const mockLink = new ApolloLink((operation) => {
    return new Observable((observer) => {
      const def = getMainDefinition(operation.query);

      // Subscriptions: stay open forever, emit nothing (no live backend).
      if (def.kind === "OperationDefinition" && def.operation === "subscription") {
        return () => {};
      }

      const topLevelFields = (def.selectionSet?.selections || [])
        .filter((s) => s.kind === "Field")
        .map((s) => s.name.value);

      const data = resolveMock(
        operation.operationName,
        topLevelFields,
        operation.variables
      );

      // Simulate a tiny network delay so loading states behave normally.
      const timer = setTimeout(() => {
        if (data && data.__error) {
          observer.error(new Error(data.__error));
        } else {
          observer.next({ data });
          observer.complete();
        }
      }, 60);

      return () => clearTimeout(timer);
    });
  });

  const client = new ApolloClient({
    link: mockLink,
    cache,
    resolvers: {},
    connectToDevTools: true,
  });

  return client;
};

export default setupApollo;
