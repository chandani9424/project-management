import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../App'

describe('Trello Clone App - Integration Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  describe('Initial Rendering', () => {
    it('renders the main app with header', () => {
      render(<App />)
      
      expect(screen.getByText('Trello Clone')).toBeInTheDocument()
      expect(screen.getByText('My First Board')).toBeInTheDocument()
    })

    it('renders default lists', () => {
      render(<App />)
      
      expect(screen.getByText('To Do')).toBeInTheDocument()
      expect(screen.getByText('In Progress')).toBeInTheDocument()
      expect(screen.getByText('Done')).toBeInTheDocument()
    })

    it('renders default cards', () => {
      render(<App />)
      
      expect(screen.getByText('Learn React')).toBeInTheDocument()
      expect(screen.getByText('Build Trello Clone')).toBeInTheDocument()
      expect(screen.getByText('Deploy to Production')).toBeInTheDocument()
      expect(screen.getByText('Design UI')).toBeInTheDocument()
      expect(screen.getByText('Project Setup')).toBeInTheDocument()
    })
  })

  describe('List Management', () => {
    it('adds a new list when Add List button is clicked', async () => {
      render(<App />)
      
      const addListButton = screen.getByRole('button', { name: /add list/i })
      fireEvent.click(addListButton)
      
      await waitFor(() => {
        expect(screen.getByText('New List')).toBeInTheDocument()
      })
    })

    it('adds multiple lists', async () => {
      render(<App />)
      
      const addListButton = screen.getByRole('button', { name: /add list/i })
      
      // Add multiple lists
      fireEvent.click(addListButton)
      fireEvent.click(addListButton)
      
      await waitFor(() => {
        const newLists = screen.getAllByText('New List')
        expect(newLists).toHaveLength(2)
      })
    })
  })

  describe('Card Management', () => {
    it('adds a new card to a list', async () => {
      render(<App />)
      
      const addCardButtons = screen.getAllByText('Add a card')
      fireEvent.click(addCardButtons[0]) // Click first list's add card button
      
      await waitFor(() => {
        expect(screen.getByText('New Card')).toBeInTheDocument()
      })
    })

    it('adds cards to multiple lists', async () => {
      render(<App />)
      
      const addCardButtons = screen.getAllByText('Add a card')
      
      // Add cards to first two lists
      fireEvent.click(addCardButtons[0])
      fireEvent.click(addCardButtons[1])
      
      await waitFor(() => {
        const newCards = screen.getAllByText('New Card')
        expect(newCards).toHaveLength(2)
      })
    })
  })

  describe('Local Storage', () => {
    it('loads board from localStorage when available', () => {
      const savedBoard = {
        id: 'board-1',
        title: 'Saved Board',
        lists: [
          {
            id: 'list-1',
            title: 'Saved List',
            cards: [{ id: 'card-1', content: 'Saved Card', description: '' }]
          }
        ]
      }
      
      localStorage.setItem('trello-boards', JSON.stringify([savedBoard]))
      
      render(<App />)
      
      expect(screen.getByText('Saved Board')).toBeInTheDocument()
      expect(screen.getByText('Saved List')).toBeInTheDocument()
      expect(screen.getByText('Saved Card')).toBeInTheDocument()
    })

    it('saves board to localStorage when state changes', async () => {
      render(<App />)
      
      // Add a new list
      const addListButton = screen.getByRole('button', { name: /add list/i })
      fireEvent.click(addListButton)
      
      await waitFor(() => {
        expect(localStorage.setItem).toHaveBeenCalled()
        const savedData = JSON.parse(localStorage.setItem.mock.calls[0][1])
        expect(savedData[0].lists).toHaveLength(4) // Original 3 + 1 new
      })
    })

    it('handles empty localStorage gracefully', () => {
      localStorage.clear()
      
      render(<App />)
      
      expect(screen.getByText('My First Board')).toBeInTheDocument()
      expect(screen.getByText('To Do')).toBeInTheDocument()
    })

    it('handles invalid localStorage data gracefully', () => {
      localStorage.setItem('trello-boards', 'invalid json')
      
      render(<App />)
      
      expect(screen.getByText('My First Board')).toBeInTheDocument()
    })
  })

  describe('State Persistence', () => {
    it('maintains state across re-renders', async () => {
      const { rerender } = render(<App />)
      
      // Add a new list
      const addListButton = screen.getByRole('button', { name: /add list/i })
      fireEvent.click(addListButton)
      
      await waitFor(() => {
        expect(screen.getByText('New List')).toBeInTheDocument()
      })
      
      // Re-render the component
      rerender(<App />)
      
      // State should be preserved
      expect(screen.getByText('New List')).toBeInTheDocument()
    })

    it('handles multiple rapid state changes', async () => {
      render(<App />)
      
      const addListButton = screen.getByRole('button', { name: /add list/i })
      
      // Add multiple lists rapidly
      fireEvent.click(addListButton)
      fireEvent.click(addListButton)
      fireEvent.click(addListButton)
      
      await waitFor(() => {
        const newLists = screen.getAllByText('New List')
        expect(newLists).toHaveLength(3)
      })
    })
  })

  describe('UI Elements', () => {
    it('renders header with correct elements', () => {
      render(<App />)
      
      expect(screen.getByText('Trello Clone')).toBeInTheDocument()
      expect(screen.getByText('My First Board')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /add list/i })).toBeInTheDocument()
    })

    it('renders all Add a card buttons', () => {
      render(<App />)
      
      const addCardButtons = screen.getAllByText('Add a card')
      expect(addCardButtons).toHaveLength(3) // One for each default list
    })

    it('has correct app structure', () => {
      render(<App />)
      
      // Check that the main app container exists
      const app = screen.getByText('Trello Clone').closest('.app')
      expect(app).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('handles missing board data gracefully', () => {
      // Test with no localStorage data
      localStorage.clear()
      
      render(<App />)
      
      // Should render default board
      expect(screen.getByText('My First Board')).toBeInTheDocument()
    })

    it('handles corrupted board data gracefully', () => {
      // Test with invalid data structure
      localStorage.setItem('trello-boards', JSON.stringify([{ invalid: 'data' }]))
      
      render(<App />)
      
      // Should fall back to default board
      expect(screen.getByText('My First Board')).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('handles large number of lists efficiently', async () => {
      render(<App />)
      
      const addListButton = screen.getByRole('button', { name: /add list/i })
      
      // Add 10 lists
      for (let i = 0; i < 10; i++) {
        fireEvent.click(addListButton)
      }
      
      await waitFor(() => {
        const newLists = screen.getAllByText('New List')
        expect(newLists).toHaveLength(10)
      })
    })

    it('handles large number of cards efficiently', async () => {
      render(<App />)
      
      const addCardButtons = screen.getAllByText('Add a card')
      
      // Add 5 cards to first list
      for (let i = 0; i < 5; i++) {
        fireEvent.click(addCardButtons[0])
      }
      
      await waitFor(() => {
        const newCards = screen.getAllByText('New Card')
        expect(newCards).toHaveLength(5)
      })
    })
  })
}) 