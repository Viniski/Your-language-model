import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAPI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default openai;
