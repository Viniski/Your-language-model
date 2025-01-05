import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import { twMerge } from 'tailwind-merge';
import openai from '@/api/openapi';
import { AppTextField } from '@/components';

type MessageType = { role: 'user' | 'assistant'; content: string };

const DashboardChatMessage = ({ role, content }: { role: 'user' | 'assistant'; content: string }) => (
  <div className={twMerge('rounded-lg p-2', role === 'user' ? 'col-start-1 col-end-8' : 'col-start-6 col-end-13')}>
    <div className={twMerge('flex items-center', role === 'user' ? 'flex-row' : 'flex-row-reverse')}>
      {role === 'user' && (
        <div className="flex h-10 w-10 flex-shrink-0 rounded-full">
          <img alt="" height={40} src="/images/logo.png" width={40} />
        </div>
      )}
      <div className={twMerge('rounded-xl p-3 text-sm shadow', role === 'user' ? 'ml-3 bg-white' : 'mr-3 bg-blue-500')}>
        <span className={twMerge('whitespace-pre-wrap', role === 'user' ? 'text-black' : 'text-white')}>{content}</span>
      </div>
    </div>
  </div>
);

const DashboardChat = () => {
  const intl = useIntl();
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([
    { role: 'user', content: 'message' },
    { role: 'assistant', content: 'message assistant' },
    { role: 'user', content: 'message' },
    { role: 'assistant', content: 'message assistant' },
    { role: 'user', content: 'message' },
    { role: 'assistant', content: 'message assistant' },
    { role: 'user', content: 'message' },
    { role: 'assistant', content: 'message assistant' },
    { role: 'user', content: 'message' },
    { role: 'assistant', content: 'message assistant' },
    { role: 'user', content: 'message' },
    { role: 'assistant', content: 'message assistant' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const responseGenerate = async (message: string) => {
    setIsTyping(true);
    const newMessages: MessageType[] = [...messages, { role: 'user', content: message }];

    setMessages(newMessages);

    await openai.chat.completions
      .create({
        model: 'gpt-4o-mini',
        store: true,
        messages: newMessages,
      })
      .then((result) => setMessages([...newMessages, result.choices[0].message as MessageType]));
    setIsTyping(false);
  };

  const handleSendMessage = () => {
    if (value.trim() === '') {
      return;
    }
    responseGenerate(value);
    setValue('');
  };

  const scrollToBottom = () => {
    const messagesContainer = messagesRef.current;
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div
        ref={messagesRef}
        className="grid max-h-[500px] min-h-[200px] grid-cols-12 content-start gap-y-2 overflow-auto px-2"
      >
        {messages.length ? (
          messages.map((message, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <DashboardChatMessage key={index} content={message.content} role={message.role} />
          ))
        ) : (
          <span className="col-span-12 py-20 text-center text-gray-300">
            <FormattedMessage id="Profile.ChatNoMessages" />
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <AppTextField
          className="w-full"
          placeholder={intl.$t({ id: 'Profile.ChatInputPlaceholder' })}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <IconButton
          aria-label="send"
          className="text-001 hover:text-003"
          disabled={isTyping}
          onClick={handleSendMessage}
        >
          <FontAwesomeIcon className="w-[45px]" icon={faPaperPlane} />
        </IconButton>
      </div>
    </div>
  );
};

export default DashboardChat;
