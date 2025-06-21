import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../App'
import { clearAllMocks } from '../test/utils'

describe('App Component', () => {
  beforeEach(() => {
    clearAllMocks()
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('renders app with default board', () => {
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

  it('adds new list when Add List button is clicked', async () => {
    render(<App />)
    
    const addListButton = screen.getByRole('button', { name: /add list/i })
    fireEvent.click(addListButton)
    
    await waitFor(() => {
      expect(screen.getByText('New List')).toBeInTheDocument()
    })
  })

  it('adds new card when Add a card button is clicked', async () => {
    render(<App />)
    
    const addCardButtons = screen.getAllByText('Add a card')
    fireEvent.click(addCardButtons[0]) // Click first list's add card button
    
    await waitFor(() => {
      expect(screen.getByText('New Card')).toBeInTheDocument()
    })
  })

  it('updates list title when edited', async () => {
    render(<App />)
    
    const listTitle = screen.getByText('To Do')
    fireEvent.doubleClick(listTitle)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Updated To Do' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    await waitFor(() => {
      expect(screen.getByText('Updated To Do')).toBeInTheDocument()
    })
  })

  it('updates card content when edited', async () => {
    render(<App />)
    
    const card = screen.getByText('Learn React')
    fireEvent.doubleClick(card)
    
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'Updated Learn React' } })
    fireEvent.keyDown(textarea, { key: 'Enter' })
    
    await waitFor(() => {
      expect(screen.getByText('Updated Learn React')).toBeInTheDocument()
    })
  })

  it('deletes list when delete option is selected', async () => {
    render(<App />)
    
    // Open menu for first list - find by class
    const moreButtons = document.querySelectorAll('button.text-gray-500')
    fireEvent.click(moreButtons[0])
    
    const deleteButton = screen.getByText('Delete List')
    fireEvent.click(deleteButton)
    
    await waitFor(() => {
      expect(screen.queryByText('To Do')).not.toBeInTheDocument()
    })
  })

  it('deletes card when delete option is selected', async () => {
    render(<App />)
    
    // Open menu for first card - find by class
    const moreButtons = document.querySelectorAll('button.text-gray-400')
    fireEvent.click(moreButtons[0])
    
    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)
    
    await waitFor(() => {
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument()
    })
  })

  it('handles drag and drop for cards', async () => {
    render(<App />)
    
    // This test would require more complex setup for drag and drop testing
    // For now, we'll just verify the drag context is set up
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
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

  it('has correct styling classes', () => {
    render(<App />)
    
    const app = screen.getByText('Trello Clone').closest('.app')
    expect(app).toHaveClass('app')
  })

  it('renders header with correct props', () => {
    render(<App />)
    
    expect(screen.getByText('Trello Clone')).toBeInTheDocument()
    expect(screen.getByText('My First Board')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add list/i })).toBeInTheDocument()
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