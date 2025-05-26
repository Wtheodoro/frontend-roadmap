# What is React? Installation and Project Structure

## 📚 Introduction to React

React is a JavaScript library for building user interfaces, particularly single-page applications. It's maintained by Meta (formerly Facebook) and a community of individual developers and companies.

### Key Features of React

- Component-based architecture
- Virtual DOM for efficient rendering
- One-way data flow
- JSX syntax
- Large ecosystem of libraries and tools

## 🚀 Setting Up a React Project with Vite

Vite is a modern build tool that provides a faster and leaner development experience. Let's create a new React project:

### 1. Create a New Project

```bash
# Create a new project with Vite
npm create vite@latest my-react-app -- --template react-ts

# Navigate to project directory
cd my-react-app

# Install dependencies
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

## 📁 Project Structure

```
my-react-app/
├── node_modules/     # Dependencies
├── public/          # Static files
├── src/             # Source code
│   ├── assets/      # Images, fonts, etc.
│   ├── components/  # React components
│   ├── App.tsx      # Main App component
│   ├── App.css      # App styles
│   ├── index.css    # Global styles
│   └── main.tsx     # Entry point
├── .gitignore       # Git ignore file
├── index.html       # HTML template
├── package.json     # Project configuration
├── tsconfig.json    # TypeScript configuration
└── vite.config.ts   # Vite configuration
```

## 🛠️ Essential Tools and Extensions

### VS Code Extensions

1. [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
2. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
3. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Browser Extensions

1. [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

## 🎯 Understanding the Entry Point

### main.tsx

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### App.tsx

```typescript
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
```

## 💡 Best Practices

1. **Project Organization**

   - Keep components small and focused
   - Use feature-based folder structure
   - Separate business logic from UI components

2. **Development Workflow**

   - Use TypeScript for better type safety
   - Implement ESLint and Prettier
   - Follow component naming conventions

3. **Performance**
   - Use React.memo for expensive components
   - Implement proper key props in lists
   - Avoid unnecessary re-renders

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [React TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react)
- [Vite + React + TypeScript Template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)
