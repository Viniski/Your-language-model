import { useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { twMerge } from 'tailwind-merge';
import { useIsMobile } from '@/hooks';
import { ChildrenProps } from '@/types';

interface Props extends ChildrenProps {
  title: string;
}

const FormAccordion = ({ title, children }: Props) => {
  const isMobile = useIsMobile();
  const [prevIsMobile, setPrevIsMobile] = useState(isMobile);
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  if (isMobile !== prevIsMobile) {
    setPrevIsMobile(isMobile);
    setIsExpanded(!isMobile);
  }

  return (
    <div className="rounded-lg border border-gray-50/50 bg-[--bg-primary] px-4 py-6 md:rounded-none md:border-0 md:bg-transparent md:px-8 md:py-12">
      <Accordion
        disableGutters
        className="shadow-none"
        expanded={isExpanded}
        onChange={(_, value) => setIsExpanded(value)}
      >
        <AccordionSummary
          expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
          classes={{
            root: 'p-0 md:min-h-[unset] md:pointer-events-none md:cursor-default',
            content: 'm-0',
            expandIconWrapper: 'text-[--text-primary] md:hidden',
          }}
        >
          <div className="flex gap-2">
            <div className={twMerge('w-1 bg-004')} />
            <h2 className="text-lg font-bold">{title}</h2>
          </div>
        </AccordionSummary>
        <AccordionDetails className="p-0">
          <div className="mt-2 flex flex-col gap-6 md:mt-8 md:gap-8">{children}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FormAccordion;
