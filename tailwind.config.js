/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'trello-blue': '#0079bf',
        'trello-green': '#61bd4f',
        'trello-orange': '#ff9f1a',
        'trello-red': '#eb5a46',
        'trello-purple': '#c377e0',
        'trello-pink': '#ff78cb',
        'trello-light-gray': '#f4f5f7',
        'trello-gray': '#dfe1e6',
        'trello-dark-gray': '#42526e'
      },
      fontFamily: {
        'trello': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif']
      }
    },
  },
  plugins: [],
} 