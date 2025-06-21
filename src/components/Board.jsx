import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import List from './List'

const Board = ({ 
  board, 
  onAddCard, 
  onUpdateListTitle, 
  onUpdateCardContent, 
  onDeleteList, 
  onDeleteCard 
}) => {
  if (!board) {
    return (
      <div className="board-container flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-trello-dark-gray mb-2">No Board Found</h2>
          <p className="text-gray-600">Create a new board to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="board-container">
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-4 p-4"
          >
            {board.lists.map((list, index) => (
              <List
                key={list.id}
                list={list}
                index={index}
                onAddCard={onAddCard}
                onUpdateListTitle={onUpdateListTitle}
                onUpdateCardContent={onUpdateCardContent}
                onDeleteList={onDeleteList}
                onDeleteCard={onDeleteCard}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Board 