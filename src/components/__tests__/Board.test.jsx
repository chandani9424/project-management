import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DragDropContext } from 'react-beautiful-dnd'
import Board from '../Board'
import { mockBoard, mockOnAddCard, mockOnUpdateListTitle, mockOnDeleteList, mockOnDeleteCard } from '../../test/utils'

// Wrapper component for drag and drop context
const TestWrapper = ({ children }) => (
  <DragDropContext onDragEnd={() => {}}>
    {children}
  </DragDropContext>
)

describe('Board Component', () => {
  beforeEach(() => {
    mockOnAddCard.mockClear()
    mockOnUpdateListTitle.mockClear()
    mockOnDeleteList.mockClear()
    mockOnDeleteCard.mockClear()
  })

  it('renders board with all lists', () => {
    render(
      <TestWrapper>
        <Board
          board={mockBoard}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('renders all cards in lists', () => {
    render(
      <TestWrapper>
        <Board
          board={mockBoard}
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
    expect(screen.getByText('Test Card 3')).toBeInTheDocument()
  })

  it('renders Add a card buttons for all lists', () => {
    render(
      <TestWrapper>
        <Board
          board={mockBoard}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    const addButtons = screen.getAllByText('Add a card')
    expect(addButtons).toHaveLength(3) // One for each list
  })

  it('renders empty board message when no board is provided', () => {
    render(
      <TestWrapper>
        <Board
          board={null}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    expect(screen.getByText('No Board Found')).toBeInTheDocument()
    expect(screen.getByText('Create a new board to get started')).toBeInTheDocument()
  })

  it('renders board with empty lists', () => {
    const boardWithEmptyLists = {
      ...mockBoard,
      lists: [
        { id: 'list-1', title: 'Empty List', cards: [] },
        { id: 'list-2', title: 'Another Empty List', cards: [] }
      ]
    }
    
    render(
      <TestWrapper>
        <Board
          board={boardWithEmptyLists}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    expect(screen.getByText('Empty List')).toBeInTheDocument()
    expect(screen.getByText('Another Empty List')).toBeInTheDocument()
    expect(screen.queryByText('Test Card 1')).not.toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    render(
      <TestWrapper>
        <Board
          board={mockBoard}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    const board = screen.getByText('To Do').closest('.board-container')
    expect(board).toHaveClass('board-container')
  })

  it('passes correct props to List components', () => {
    render(
      <TestWrapper>
        <Board
          board={mockBoard}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    // Verify that all lists are rendered with their titles
    mockBoard.lists.forEach(list => {
      expect(screen.getByText(list.title)).toBeInTheDocument()
    })
  })

  it('renders board with single list', () => {
    const boardWithSingleList = {
      ...mockBoard,
      lists: [mockBoard.lists[0]]
    }
    
    render(
      <TestWrapper>
        <Board
          board={boardWithSingleList}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.queryByText('In Progress')).not.toBeInTheDocument()
    expect(screen.queryByText('Done')).not.toBeInTheDocument()
  })

  it('renders board with undefined board gracefully', () => {
    render(
      <TestWrapper>
        <Board
          board={undefined}
          onAddCard={mockOnAddCard}
          onUpdateListTitle={mockOnUpdateListTitle}
          onUpdateCardContent={() => {}}
          onDeleteList={mockOnDeleteList}
          onDeleteCard={mockOnDeleteCard}
        />
      </TestWrapper>
    )
    
    expect(screen.getByText('No Board Found')).toBeInTheDocument()
  })
}) 