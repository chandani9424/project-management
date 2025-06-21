import React from 'react'
import { render } from '@testing-library/react'
import { DragDropContext } from 'react-beautiful-dnd'

// Mock data for testing
export const mockBoard = {
  id: 'board-1',
  title: 'Test Board',
  lists: [
    {
      id: 'list-1',
      title: 'To Do',
      cards: [
        { id: 'card-1', content: 'Test Card 1', description: 'Test description 1' },
        { id: 'card-2', content: 'Test Card 2', description: 'Test description 2' }
      ]
    },
    {
      id: 'list-2',
      title: 'In Progress',
      cards: [
        { id: 'card-3', content: 'Test Card 3', description: 'Test description 3' }
      ]
    },
    {
      id: 'list-3',
      title: 'Done',
      cards: []
    }
  ]
}

export const mockList = {
  id: 'list-1',
  title: 'Test List',
  cards: [
    { id: 'card-1', content: 'Test Card 1', description: 'Test description 1' },
    { id: 'card-2', content: 'Test Card 2', description: 'Test description 2' }
  ]
}

export const mockCard = {
  id: 'card-1',
  content: 'Test Card',
  description: 'Test description'
}

// Custom render function with DragDropContext
export const renderWithDragDrop = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <DragDropContext onDragEnd={() => {}}>
      {children}
    </DragDropContext>
  )
  return render(ui, { wrapper: Wrapper, ...options })
}

// Mock functions
export const mockOnAddCard = vi.fn()
export const mockOnUpdateListTitle = vi.fn()
export const mockOnUpdateCardContent = vi.fn()
export const mockOnDeleteList = vi.fn()
export const mockOnDeleteCard = vi.fn()
export const mockOnAddList = vi.fn()
export const mockHandleDragEnd = vi.fn()

// Helper to clear all mocks
export const clearAllMocks = () => {
  mockOnAddCard.mockClear()
  mockOnUpdateListTitle.mockClear()
  mockOnUpdateCardContent.mockClear()
  mockOnDeleteList.mockClear()
  mockOnDeleteCard.mockClear()
  mockOnAddList.mockClear()
  mockHandleDragEnd.mockClear()
  localStorage.getItem.mockClear()
  localStorage.setItem.mockClear()
} 