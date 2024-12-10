import { css } from '@emotion/react';
import { alpha } from '@mui/material';
import colors from './colors.json';

export default css`
  :root {
    --app-header-height: 80px;

    --bg-public: linear-gradient(${alpha(colors.base['001'], 0.6)}, ${alpha(colors.base['001'], 0.6)}),
      url(/images/background.jpg);

    --bg-primary: ${colors.base.white};
    --bg-secondary: ${colors.base.primary[50]};
    --bg-backdrop-primary: ${alpha(colors.base.gray[400], 0.7)};

    --border-primary: ${colors.base.gray[50]};
    --border-secondary: ${colors.base.gray[100]};

    --text-primary: ${colors.text.primary};

    --scrollbar-primary: ${colors.base.gray[100]};
  }
`;
