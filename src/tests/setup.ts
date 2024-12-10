import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);

const { warn } = console;

// We need to ignore this misleading warning because of a bug in integration between vitest and @emotion/react
// @emotion/react team fixed this for jest, but not for vitest: https://github.com/emotion-js/emotion/pull/1806
const ignoredMessage =
  'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.';

console.warn = (...args) => {
  if (args[0] !== ignoredMessage) {
    warn(...args);
  }
};
