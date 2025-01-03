import { ReactNode } from 'react';

export interface ChildrenProps {
  children?: ReactNode;
}

export interface User {
  first_name: string;
  last_name: string;
  organization: string;
  phone: string;
  language: 'pl' | 'en';
}

export type NullableUser = User | null | undefined;
