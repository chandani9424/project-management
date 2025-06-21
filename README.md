# Trello Clone

A full-featured Trello clone built with React, featuring drag-and-drop functionality, beautiful UI, and local storage persistence.

## Features

### 🎯 Core Functionality
- **Drag & Drop**: Move cards between lists and reorder lists
- **Real-time Editing**: Double-click to edit card content and list titles
- **Add/Delete**: Create new lists and cards, delete existing ones
- **Persistent Storage**: Data is saved to localStorage automatically
- **Responsive Design**: Works on desktop and mobile devices

### 🎨 User Interface
- **Modern Design**: Clean, Trello-inspired interface
- **Smooth Animations**: Hover effects and drag animations
- **Color Scheme**: Authentic Trello colors and styling
- **Icons**: Beautiful Lucide React icons throughout

### 🔧 Technical Features
- **React 18**: Latest React with hooks and modern patterns
- **React Beautiful DnD**: Smooth drag-and-drop functionality
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server
- **Local Storage**: Data persistence without backend

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the files locally, navigate to the project directory
   cd trello-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Testing

### 🧪 Test Suite

This project includes comprehensive unit tests for all components and functionality.

#### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests once and exit
npm run test:run

# Run tests with coverage report
npm run test:coverage
```

#### Test Coverage

The test suite provides comprehensive coverage including:

- **Component Rendering**: All components render correctly
- **User Interactions**: Click, double-click, keyboard events
- **State Management**: Adding, editing, deleting lists and cards
- **Local Storage**: Data persistence and retrieval
- **Drag & Drop**: Context setup and functionality
- **Error Handling**: Graceful handling of edge cases

#### Test Structure

```
src/
├── __tests__/
│   ├── App.test.jsx           # Main app component tests
│   └── utils.test.js          # Utility function tests
├── components/__tests__/
│   ├── Header.test.jsx        # Header component tests
│   ├── Board.test.jsx         # Board component tests
│   ├── List.test.jsx          # List component tests
│   └── Card.test.jsx          # Card component tests
└── test/
    ├── setup.js               # Test environment setup
    └── utils.jsx              # Test utilities and mocks
```

#### Test Features

- **Mock Data**: Comprehensive mock data for boards, lists, and cards
- **Mock Functions**: All callback functions are mocked for testing
- **Drag & Drop Testing**: Proper context setup for drag-and-drop components
- **Local Storage Mocking**: localStorage is mocked for testing persistence
- **Component Isolation**: Each component is tested in isolation
- **User Event Testing**: Realistic user interactions are simulated

#### Test Examples

```javascript
// Component rendering test
it('renders header with board title', () => {
  render(<Header boardTitle="Test Board" onAddList={mockOnAddList} />)
  expect(screen.getByText('Trello Clone')).toBeInTheDocument()
  expect(screen.getByText('Test Board')).toBeInTheDocument()
})

// User interaction test
it('calls onAddList when Add List button is clicked', () => {
  render(<Header boardTitle="Test Board" onAddList={mockOnAddList} />)
  const addButton = screen.getByRole('button', { name: /add list/i })
  fireEvent.click(addButton)
  expect(mockOnAddList).toHaveBeenCalledTimes(1)
})

// State management test
it('updates card content when edited', async () => {
  render(<App />)
  const card = screen.getByText('Learn React')
  fireEvent.doubleClick(card)
  const textarea = screen.getByRole('textbox')
  fireEvent.change(textarea, { target: { value: 'Updated Content' } })
  fireEvent.keyDown(textarea, { key: 'Enter' })
  await waitFor(() => {
    expect(screen.getByText('Updated Content')).toBeInTheDocument()
  })
})
```

## How to Use

### Creating Content
1. **Add a List**: Click the "Add List" button in the header
2. **Add a Card**: Click "Add a card" at the bottom of any list
3. **Edit Content**: Double-click on any card or list title to edit

### Managing Content
1. **Drag & Drop**: Click and drag cards to move them between lists
2. **Reorder Lists**: Drag list headers to reorder them
3. **Delete Items**: Use the menu (three dots) on cards and lists to delete them

### Keyboard Shortcuts
- **Enter**: Save changes when editing
- **Escape**: Cancel editing and revert changes

## Project Structure

```
trello-clone/
├── src/
│   ├── components/
│   │   ├── Header.jsx      # App header with board title and add list button
│   │   ├── Board.jsx       # Main board container with drag context
│   │   ├── List.jsx        # Individual list component
│   │   └── Card.jsx        # Individual card component
│   ├── __tests__/          # Main app tests
│   ├── components/__tests__/ # Component tests
│   ├── test/               # Test utilities and setup
│   ├── App.jsx             # Main app component with state management
│   ├── main.jsx            # React entry point
│   ├── index.css           # Global styles and Tailwind imports
│   └── App.css             # App-specific styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── vitest.config.js        # Vitest configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## Technologies Used

- **React 18** - UI library
- **React Beautiful DnD** - Drag and drop functionality
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework
- **React Testing Library** - Component testing utilities
- **UUID** - Unique ID generation
- **Local Storage** - Data persistence

## Customization

### Colors
The app uses Trello's authentic color palette defined in `tailwind.config.js`:
- Trello Blue: `#0079bf`
- Trello Green: `#61bd4f`
- Trello Orange: `#ff9f1a`
- Trello Red: `#eb5a46`
- And more...

### Styling
- Modify `src/index.css` for global styles
- Update `src/App.css` for app-specific styles
- Customize `tailwind.config.js` for theme changes

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by Trello's design and functionality
- Built with modern React patterns and best practices
- Uses open-source libraries and tools 