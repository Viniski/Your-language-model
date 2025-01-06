import { ReactNode } from 'react';

export interface ChildrenProps {
  children?: ReactNode;
}

export type Language = 'pl' | 'en';

export interface User {
  first_name: string;
  last_name: string;
  organization: string;
  phone: string;
  language: Language;
}

export type NullableUser = User | null | undefined;

export type MessageType = { role: 'user' | 'assistant'; content: string };
