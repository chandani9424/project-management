import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import Header from './components/Header'
import Board from './components/Board'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

function App() {
  const [boards, setBoards] = useState(() => {
    const savedBoards = localStorage.getItem('trello-boards')
    if (savedBoards) {
      return JSON.parse(savedBoards)
    }
    return [
      {
        id: 'board-1',
        title: 'My First Board',
        lists: [
          {
            id: 'list-1',
            title: 'To Do',
            cards: [
              { id: 'card-1', content: 'Learn React', description: 'Study React fundamentals' },
              { id: 'card-2', content: 'Build Trello Clone', description: 'Create a project management app' },
              { id: 'card-3', content: 'Deploy to Production', description: 'Deploy the application' }
            ]
          },
          {
            id: 'list-2',
            title: 'In Progress',
            cards: [
              { id: 'card-4', content: 'Design UI', description: 'Create beautiful user interface' }
            ]
          },
          {
            id: 'list-3',
            title: 'Done',
            cards: [
              { id: 'card-5', content: 'Project Setup', description: 'Initialize the project structure' }
            ]
          }
        ]
      }
    ]
  })

  const [currentBoard, setCurrentBoard] = useState(0)
  const [backgroundColor, setBackgroundColor] = useState(() => {
    const savedColor = localStorage.getItem('trello-background-color')
    return savedColor || '#f4f5f7'
  })

  // Save boards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('trello-boards', JSON.stringify(boards))
  }, [boards])

  // Save background color to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('trello-background-color', backgroundColor)
  }, [backgroundColor])

  const handleDragStart = (result) => {
    // Drag started
  }

  const handleDragUpdate = (result) => {
    // Drag updated
  }

  const handleDragEnd = (result) => {
    const { destination, source, type } = result

    // If dropped outside a droppable area
    if (!destination) {
      return
    }

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const newBoards = [...boards]
    const boardIndex = currentBoard

    if (type === 'list') {
      // Reorder lists
      const [removed] = newBoards[boardIndex].lists.splice(source.index, 1)
      newBoards[boardIndex].lists.splice(destination.index, 0, removed)
    } else if (type === 'card') {
      const sourceListIndex = newBoards[boardIndex].lists.findIndex(
        list => list.id === source.droppableId
      )
      const destListIndex = newBoards[boardIndex].lists.findIndex(
        list => list.id === destination.droppableId
      )

      const sourceList = newBoards[boardIndex].lists[sourceListIndex]
      const destList = newBoards[boardIndex].lists[destListIndex]

      const [removed] = sourceList.cards.splice(source.index, 1)

      if (sourceListIndex === destListIndex) {
        // Same list
        sourceList.cards.splice(destination.index, 0, removed)
      } else {
        // Different lists
        destList.cards.splice(destination.index, 0, removed)
      }
    }

    setBoards(newBoards)
  }

  const addList = () => {
    const newList = {
      id: `list-${uuidv4()}`,
      title: 'New List',
      cards: []
    }
    
    const newBoards = [...boards]
    newBoards[currentBoard].lists.push(newList)
    setBoards(newBoards)
  }

  const addCard = (listId) => {
    const newCard = {
      id: `card-${uuidv4()}`,
      content: 'New Card',
      description: ''
    }
    
    const newBoards = [...boards]
    const listIndex = newBoards[currentBoard].lists.findIndex(list => list.id === listId)
    newBoards[currentBoard].lists[listIndex].cards.push(newCard)
    setBoards(newBoards)
  }

  const updateListTitle = (listId, newTitle) => {
    const newBoards = [...boards]
    const listIndex = newBoards[currentBoard].lists.findIndex(list => list.id === listId)
    newBoards[currentBoard].lists[listIndex].title = newTitle
    setBoards(newBoards)
  }

  const updateCardContent = (listId, cardId, newContent, newDescription = '') => {
    const newBoards = [...boards]
    const listIndex = newBoards[currentBoard].lists.findIndex(list => list.id === listId)
    const cardIndex = newBoards[currentBoard].lists[listIndex].cards.findIndex(card => card.id === cardId)
    newBoards[currentBoard].lists[listIndex].cards[cardIndex].content = newContent
    newBoards[currentBoard].lists[listIndex].cards[cardIndex].description = newDescription
    setBoards(newBoards)
  }

  const deleteList = (listId) => {
    const newBoards = [...boards]
    newBoards[currentBoard].lists = newBoards[currentBoard].lists.filter(list => list.id !== listId)
    setBoards(newBoards)
  }

  const deleteCard = (listId, cardId) => {
    const newBoards = [...boards]
    const listIndex = newBoards[currentBoard].lists.findIndex(list => list.id === listId)
    newBoards[currentBoard].lists[listIndex].cards = newBoards[currentBoard].lists[listIndex].cards.filter(card => card.id !== cardId)
    setBoards(newBoards)
  }

  return (
    <div className="app" style={{ backgroundColor }}>
      <Header 
        boardTitle={boards[currentBoard]?.title || 'Untitled Board'}
        onAddList={addList}
        backgroundColor={backgroundColor}
        onBackgroundColorChange={setBackgroundColor}
      />
      <DragDropContext 
        onDragStart={handleDragStart}
        onDragUpdate={handleDragUpdate}
        onDragEnd={handleDragEnd}
      >
        <Board
          board={boards[currentBoard]}
          onAddCard={addCard}
          onUpdateListTitle={updateListTitle}
          onUpdateCardContent={updateCardContent}
          onDeleteList={deleteList}
          onDeleteCard={deleteCard}
        />
      </DragDropContext>
    </div>
  )
}

export default App 