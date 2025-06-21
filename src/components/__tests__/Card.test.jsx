import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Card from '../Card'
import { mockCard, mockOnUpdateCardContent, mockOnDeleteCard } from '../../test/utils'

// Wrapper component for drag and drop context
const TestWrapper = ({ children }) => (
  <DragDropContext onDragEnd={() => {}}>
    <Droppable droppableId="test-list">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
)

describe('Card Component', () => {
  beforeEach(() => {
    mockOnUpdateCardContent.mockClear()
    mockOnDeleteCard.mockClear()
  })

  it('renders card with content', () => {
    render(
      <TestWrapper>
        <Card
          card={mockCard}
          index={0}
          listId="list-1"
          onUpdateContent={mockOnUpdateCardContent}
          onDelete={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    expect(screen.getByText('Test Card')).toBeInTheDocument()
  })

  it('renders card description when provided', () => {
    const cardWithDescription = { ...mockCard, description: 'Test description' }
    
    render(
      <TestWrapper>
        <Card
          card={cardWithDescription}
          index={0}
          listId="list-1"
          onUpdateContent={mockOnUpdateCardContent}
          onDelete={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    const cardWithoutDescription = { ...mockCard, description: '' }
    
    render(
      <TestWrapper>
        <Card
          card={cardWithoutDescription}
          index={0}
          listId="list-1"
          onUpdateContent={mockOnUpdateCardContent}
          onDelete={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    expect(screen.queryByText('Test description')).not.toBeInTheDocument()
  })

  it('enters edit mode when card is double-clicked', () => {
    render(
      <TestWrapper>
        <Card
          card={mockCard}
          index={0}
          listId="list-1"
          onUpdateContent={mockOnUpdateCardContent}
          onDelete={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    const cardContent = screen.getByText('Test Card')
    fireEvent.doubleClick(cardContent)
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveValue('Test Card')
  })

  it('saves changes when Enter is pressed', async () => {
    render(
      <TestWrapper>
        <Card
          card={mockCard}
          index={0}
          listId="list-1"
          onUpdateContent={mockOnUpdateCardContent}
          onDelete={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    const cardContent = screen.getByText('Test Card')
    fireEvent.doubleClick(cardContent)
    
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'Updated Card' } })
    fireEvent.keyDown(textarea, { key: 'Enter' })
    
    await waitFor(() => {
      expect(mockOnUpdateCardContent).toHaveBeenCalledWith('list-1', 'card-1', 'Updated Card')
    })
  })

  it('cancels editing when Escape is pressed', () => {
    render(
      <TestWrapper>
        <Card
          card={mockCard}
          index={0}
          listId="list-1"
          onUpdateContent={mockOnUpdateCardContent}
          onDelete={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    const cardContent = screen.getByText('Test Card')
    fireEvent.doubleClick(cardContent)
    
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'Updated Card' } })
    fireEvent.keyDown(textarea, { key: 'Escape' })
    
    expect(screen.getByText('Test Card')).toBeInTheDocument()
    expect(mockOnUpdateCardContent).not.toHaveBeenCalled()
  })

  it('saves changes when textarea loses focus', async () => {
    render(
      <TestWrapper>
        <Card
          card={mockCard}
          index={0}
          listId="list-1"
          onUpdateContent={mockOnUpdateCardContent}
          onDelete={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    const cardContent = screen.getByText('Test Card')
    fireEvent.doubleClick(cardContent)
    
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'Updated Card' } })
    fireEvent.blur(textarea)
    
    await waitFor(() => {
      expect(mockOnUpdateCardContent).toHaveBeenCalledWith('list-1', 'card-1', 'Updated Card')
    })
  })

  it('shows menu when more options button is clicked', () => {
    render(
      <TestWrapper>
        <Card
          card={mockCard}
          index={0}
          listId="list-1"
          onUpdateContent={mockOnUpdateCardContent}
          onDelete={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    // Find the more options button by its class
    const moreButton = document.querySelector('button.text-gray-400')
    fireEvent.click(moreButton)
    
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('calls onDelete when delete option is clicked', () => {
    render(
      <TestWrapper>
        <Card
          card={mockCard}
          index={0}
          listId="list-1"
          onUpdateContent={mockOnUpdateCardContent}
          onDelete={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    // Find the more options button by its class
    const moreButton = document.querySelector('button.text-gray-400')
    fireEvent.click(moreButton)
    
    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)
    
    expect(mockOnDeleteCard).toHaveBeenCalledWith('list-1', 'card-1')
  })

  it('enters edit mode when edit option is clicked', () => {
    render(
      <TestWrapper>
        <Card
          card={mockCard}
          index={0}
          listId="list-1"
          onUpdateContent={mockOnUpdateCardContent}
          onDelete={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    // Find the more options button by its class
    const moreButton = document.querySelector('button.text-gray-400')
    fireEvent.click(moreButton)
    
    const editButton = screen.getByText('Edit')
    fireEvent.click(editButton)
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    render(
      <TestWrapper>
        <Card
          card={mockCard}
          index={0}
          listId="list-1"
          onUpdateContent={mockOnUpdateCardContent}
          onDelete={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    const card = screen.getByText('Test Card').closest('.card')
    expect(card).toHaveClass('card', 'bg-white', 'rounded', 'shadow-sm')
  })

  it('does not save empty content', async () => {
    render(
      <TestWrapper>
        <Card
          card={mockCard}
          index={0}
          listId="list-1"
          onUpdateContent={mockOnUpdateCardContent}
          onDelete={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    const cardContent = screen.getByText('Test Card')
    fireEvent.doubleClick(cardContent)
    
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: '   ' } })
    fireEvent.keyDown(textarea, { key: 'Enter' })
    
    expect(mockOnUpdateCardContent).not.toHaveBeenCalled()
  })
}) 