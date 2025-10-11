'use client';

import { ApolloProvider } from '@apollo/client/react';
import { type PropsWithChildren } from 'react';

import { client } from '@/shared/libs/apollo-client';

export function ApolloClientProvider({ children }: PropsWithChildren<unknown>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
