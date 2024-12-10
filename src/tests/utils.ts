import { render } from '@testing-library/react';
import TestContextProvider from '@/tests/TestContextProvider';

type RenderParams = Parameters<typeof render>;

export const customRender = (ui: RenderParams[0], options?: RenderParams[1]) =>
  render(ui, { wrapper: TestContextProvider, ...options });
