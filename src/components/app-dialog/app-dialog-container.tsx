import { Dialog, DialogProps } from '@mui/material';

const Container = (props: DialogProps) => (
  <Dialog
    componentsProps={{ backdrop: { className: 'bg-bg-backdrop-secondary' } }}
    classes={{
      paper: 'py-10 px-8 w-full rounded-[1.25rem] bg-[--bg-primary] shadow-none max-w-[500px] bg-none m-6',
    }}
    {...props}
  />
);

export default Container;
