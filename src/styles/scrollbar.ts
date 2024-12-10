import { css } from '@emotion/react';

export default css`
  &::-webkit-scrollbar {
    height: 1rem;
    width: 1rem;
  }

  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-track {
    border-radius: 0.5rem;
    border: 0.25rem solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-primary);
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
