import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

describe('Header Component', () => {
  const mockOnAddList = vi.fn()

  beforeEach(() => {
    mockOnAddList.mockClear()
  })

  it('renders header with board title', () => {
    render(<Header boardTitle="Test Board" onAddList={mockOnAddList} />)
    
    expect(screen.getByText('Trello Clone')).toBeInTheDocument()
    expect(screen.getByText('Test Board')).toBeInTheDocument()
  })

  it('renders Trello logo icon', () => {
    render(<Header boardTitle="Test Board" onAddList={mockOnAddList} />)
    
    const logo = screen.getByTestId('trello-icon') || document.querySelector('[data-lucide="trello"]')
    expect(logo).toBeInTheDocument()
  })

  it('renders Add List button', () => {
    render(<Header boardTitle="Test Board" onAddList={mockOnAddList} />)
    
    const addButton = screen.getByRole('button', { name: /add list/i })
    expect(addButton).toBeInTheDocument()
  })

  it('calls onAddList when Add List button is clicked', () => {
    render(<Header boardTitle="Test Board" onAddList={mockOnAddList} />)
    
    const addButton = screen.getByRole('button', { name: /add list/i })
    fireEvent.click(addButton)
    
    expect(mockOnAddList).toHaveBeenCalledTimes(1)
  })

  it('displays default title when boardTitle is not provided', () => {
    render(<Header onAddList={mockOnAddList} />)
    
    expect(screen.getByText('Untitled Board')).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    render(<Header boardTitle="Test Board" onAddList={mockOnAddList} />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-white', 'shadow-sm', 'border-b', 'border-gray-200')
  })

  it('renders Plus icon in Add List button', () => {
    render(<Header boardTitle="Test Board" onAddList={mockOnAddList} />)
    
    const addButton = screen.getByRole('button', { name: /add list/i })
    const plusIcon = addButton.querySelector('[data-lucide="plus"]') || addButton.querySelector('svg')
    expect(plusIcon).toBeInTheDocument()
  })

  it('has accessible button with proper ARIA attributes', () => {
    render(<Header boardTitle="Test Board" onAddList={mockOnAddList} />)
    
    const addButton = screen.getByRole('button', { name: /add list/i })
    expect(addButton).toBeInTheDocument()
    expect(addButton).toHaveAttribute('type', 'button')
  })
}) 