# Your language model by Viniski

:rocket: <b>Live Demo:</b><br> 
https://your-language-model-sfn4.vercel.app/<br>
<b>Experience the app in action here!</b>

<b>Test profile:</b><br>
E-mail: lipihax162@calmpros.com<br> 
Password: CGEVo8sVWeHzLIN

This application is a chat platform powered by OpenAI's gpt-4o-mini language model, offering conversational features. It includes user authentication and profile management through Supabase, allowing login, registration, and easy updates to personal details, password, and email address.

## :page_with_curl: Features
* <b>Real-time Chat with GPT-4o-Mini Model</b>: Interactive chat with the GPT-4o-Mini language model in real-time.
* <b>Chat History Persistence</b>: Chats are saved when navigating between pages.
* <b>Create New Chat</b>: Users can initiate new chats at any time.
* <b>Multi-language Support</b>: Supports two languages: Polish and English, auto-adapting to the browser’s language or the user’s selected language in profile settings.
* <b>Email Registration with Verification</b>: User registration with email verification, powered by Supabase.
* <b>Login</b>: Secure login functionality through Supabase authentication.
* <b>Forgotten Password Reset</b>: Password reset process managed by Supabase with email instructions.
* <b>User Details Editing</b>: Ability to update user details.
* <b>Password and Email Change</b>: Logged-in users can change their password and email with email verification.
* <b>YouTube Videos</b>: Display a YouTube video on writing better prompts in both language versions.
* <b>Fully Responsive Mobile Version</b>: A fully optimized mobile version for seamless usage across devices.

## :wrench: Technical Overview

### Technologies & Libraries Used:
### Frontend:
* <b>React</b>: A JavaScript library for building user interfaces.
* <b>TypeScript</b>: For static typing and improved code quality.
* <b>React Router DOM</b>: For handling routing and navigation between pages.
* <b>Material UI</b>: A React component library for building UI with pre-designed components.
* <b>Tailwind CSS</b>: A utility-first CSS framework for custom styling.
* <b>React Query</b>: A data-fetching library used to handle the API calls and cache management.
* <b>React Hook Form</b>: A form handling library to manage form data and validation.
* <b>React Intl</b>: For internationalization and localization support.
* <b>Zustand</b>: A lightweight and flexible state management library for React applications.
* <b>Notistack</b>: A notification library for displaying messages (success, error, info) to the user.
  
### Backend & API Integration:
* <b>Supabase</b>: Used for user authentication, registration, login, as well as password and email management. It also handles the database to store and edit user profiles.
* <b>OpenAI API</b>: Integration with OpenAI's gpt-4o-mini language model to generate chat responses.
  
### Development & Build Tools:
* <b>Vite</b>: A fast and lightweight build tool for modern web projects.
* <b>ESLint & Prettier</b>: For linting and formatting code to maintain code quality and consistency.
* <b>Vitest</b>: A fast unit testing framework for testing React components and APIs.
* <b>Husky & Lint-staged</b>: For running linters and formatters on staged files before commits.
* <b>Tailwind Merge</b>: A utility for merging conflicting Tailwind CSS class names.
* <b>Zod</b>: A TypeScript-first schema declaration and validation library.

## :computer: Screenshot

### Dashboard - chat
![image](https://github.com/user-attachments/assets/d3df642e-39c8-4e74-99c8-1daa90439c4f)

### Login
![image](https://github.com/user-attachments/assets/c249e2e5-ad02-4c22-b746-52f8ec4b9bf0)

### Register
![image](https://github.com/user-attachments/assets/23fede60-e246-4446-9b6f-21595cb3ba74)

### Profile
![image](https://github.com/user-attachments/assets/1c95eed0-7421-43ef-b566-090e917865cf)

### Email
![image](https://github.com/user-attachments/assets/e9129dc6-f082-4cfa-8acd-a34f4dc61ea1)

### Dashboard - youtube
![image](https://github.com/user-attachments/assets/14eec428-c4e6-4973-9fa9-c62ad8506ee0)

### Dashboard chat (mobile)
![image](https://github.com/user-attachments/assets/a31681fd-bd61-486c-b0f2-e1f7185973e6)

### Nav (mobile)
![image](https://github.com/user-attachments/assets/5bd1bb5b-8f44-4b71-bc0e-5dc1c6af2176)

### Profile (mobile)
![image](https://github.com/user-attachments/assets/708d34a9-08a1-4280-a331-bb039353648b)

#### If you want running on your computer:

```zsh
npm install
npm run dev
```

## :page_with_curl: License

This project is licensed under the MIT License.
All photos and images are the property of Pinterest.com.
