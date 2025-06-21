import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import List from '../List'
import { mockList, mockOnAddCard, mockOnUpdateListTitle, mockOnDeleteList, mockOnDeleteCard } from '../../test/utils'

// Wrapper component for drag and drop context
const TestWrapper = ({ children }) => (
  <DragDropContext onDragEnd={() => {}}>
    <Droppable droppableId="board" type="list" direction="horizontal">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
)

describe('List Component', () => {
  beforeEach(() => {
    mockOnAddCard.mockClear()
    mockOnUpdateListTitle.mockClear()
    mockOnDeleteList.mockClear()
    mockOnDeleteCard.mockClear()
  })

  it('renders list with title', () => {
    render(
      <TestWrapper>
        <List
          list={mockList}
          index={0}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    expect(screen.getByText('Test List')).toBeInTheDocument()
  })

  it('renders all cards in the list', () => {
    render(
      <TestWrapper>
        <List
          list={mockList}
          index={0}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    expect(screen.getByText('Test Card 1')).toBeInTheDocument()
    expect(screen.getByText('Test Card 2')).toBeInTheDocument()
  })

  it('renders Add a card button', () => {
    render(
      <TestWrapper>
        <List
          list={mockList}
          index={0}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    expect(screen.getByText('Add a card')).toBeInTheDocument()
  })

  it('calls onAddCard when Add a card button is clicked', () => {
    render(
      <TestWrapper>
        <List
          list={mockList}
          index={0}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    const addButton = screen.getByText('Add a card')
    fireEvent.click(addButton)
    
    expect(mockOnAddCard).toHaveBeenCalledWith('list-1')
  })

  it('enters edit mode when list title is double-clicked', () => {
    render(
      <TestWrapper>
        <List
          list={mockList}
          index={0}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    const title = screen.getByText('Test List')
    fireEvent.doubleClick(title)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('Test List')
  })

  it('saves title changes when Enter is pressed', async () => {
    render(
      <TestWrapper>
        <List
          list={mockList}
          index={0}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    const title = screen.getByText('Test List')
    fireEvent.doubleClick(title)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Updated List' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    await waitFor(() => {
      expect(mockOnUpdateListTitle).toHaveBeenCalledWith('list-1', 'Updated List')
    })
  })

  it('cancels title editing when Escape is pressed', () => {
    render(
      <TestWrapper>
        <List
          list={mockList}
          index={0}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    const title = screen.getByText('Test List')
    fireEvent.doubleClick(title)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Updated List' } })
    fireEvent.keyDown(input, { key: 'Escape' })
    
    expect(screen.getByText('Test List')).toBeInTheDocument()
    expect(mockOnUpdateListTitle).not.toHaveBeenCalled()
  })

  it('saves title changes when input loses focus', async () => {
    render(
      <TestWrapper>
        <List
          list={mockList}
          index={0}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    const title = screen.getByText('Test List')
    fireEvent.doubleClick(title)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Updated List' } })
    fireEvent.blur(input)
    
    await waitFor(() => {
      expect(mockOnUpdateListTitle).toHaveBeenCalledWith('list-1', 'Updated List')
    })
  })

  it('shows menu when more options button is clicked', () => {
    render(
      <TestWrapper>
        <List
          list={mockList}
          index={0}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    // Find the more options button by its class
    const moreButton = document.querySelector('button.text-gray-500')
    fireEvent.click(moreButton)
    
    expect(screen.getByText('Edit Title')).toBeInTheDocument()
    expect(screen.getByText('Delete List')).toBeInTheDocument()
  })

  it('calls onDeleteList when delete option is clicked', () => {
    render(
      <TestWrapper>
        <List
          list={mockList}
          index={0}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    // Find the more options button by its class
    const moreButton = document.querySelector('button.text-gray-500')
    fireEvent.click(moreButton)
    
    const deleteButton = screen.getByText('Delete List')
    fireEvent.click(deleteButton)
    
    expect(mockOnDeleteList).toHaveBeenCalledWith('list-1')
  })

  it('enters edit mode when edit title option is clicked', () => {
    render(
      <TestWrapper>
        <List
          list={mockList}
          index={0}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    // Find the more options button by its class
    const moreButton = document.querySelector('button.text-gray-500')
    fireEvent.click(moreButton)
    
    const editButton = screen.getByText('Edit Title')
    fireEvent.click(editButton)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    render(
      <TestWrapper>
        <List
          list={mockList}
          index={0}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    const list = screen.getByText('Test List').closest('.list-container')
    expect(list).toHaveClass('list-container')
  })

  it('does not save empty title', async () => {
    render(
      <TestWrapper>
        <List
          list={mockList}
          index={0}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    const title = screen.getByText('Test List')
    fireEvent.doubleClick(title)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    expect(mockOnUpdateListTitle).not.toHaveBeenCalled()
  })

  it('renders empty list correctly', () => {
    const emptyList = { ...mockList, cards: [] }
    
    render(
      <TestWrapper>
        <List
          list={emptyList}
          index={0}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    expect(screen.getByText('Test List')).toBeInTheDocument()
    expect(screen.getByText('Add a card')).toBeInTheDocument()
    expect(screen.queryByText('Test Card 1')).not.toBeInTheDocument()
  })
}) 