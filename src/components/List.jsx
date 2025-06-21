import React, { useState, useEffect, useRef } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import { Plus, MoreHorizontal, Edit2, Trash2, GripVertical } from 'lucide-react'
import Card from './Card'

const List = ({ 
  list, 
  index, 
  onAddCard, 
  onUpdateListTitle, 
  onUpdateCardContent, 
  onDeleteList, 
  onDeleteCard 
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [title, setTitle] = useState(list.title)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  const handleTitleSubmit = () => {
    if (title.trim()) {
      onUpdateListTitle(list.id, title.trim())
    } else {
      setTitle(list.title)
    }
    setIsEditingTitle(false)
  }

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTitleSubmit()
    } else if (e.key === 'Escape') {
      setTitle(list.title)
      setIsEditingTitle(false)
    }
  }

  const handleTitleDoubleClick = () => {
    setIsEditingTitle(true)
    setTitle(list.title)
  }

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`list-container ${snapshot.isDragging ? 'list-ghost' : ''}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 flex-1">
              {/* Drag Handle */}
              <div
                {...provided.dragHandleProps}
                className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing p-1"
              >
                <GripVertical className="w-4 h-4" />
              </div>
              
              {isEditingTitle ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleTitleSubmit}
                  onKeyDown={handleTitleKeyPress}
                  className="font-semibold text-trello-dark-gray bg-white border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 flex-1"
                  autoFocus
                  placeholder="Enter list title..."
                />
              ) : (
                <h3
                  className="font-semibold text-trello-dark-gray text-sm flex-1 select-none"
                  onDoubleClick={handleTitleDoubleClick}
                >
                  {list.title}
                </h3>
              )}
            </div>
            
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg border border-gray-200 py-1 z-10 min-w-32">
                  <button
                    onClick={() => {
                      setIsEditingTitle(true)
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Title</span>
                  </button>
                  <button
                    onClick={() => {
                      onDeleteList(list.id)
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete List</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <Droppable droppableId={list.id} type="card">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`min-h-20 ${snapshot.isDraggingOver ? 'bg-blue-50 rounded' : ''}`}
              >
                {list.cards.map((card, index) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={index}
                    listId={list.id}
                    onUpdateContent={onUpdateCardContent}
                    onDelete={onDeleteCard}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <button
            onClick={() => onAddCard(list.id)}
            className="add-button flex items-center space-x-2 mt-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add a card</span>
          </button>
        </div>
      )}
    </Draggable>
  )
}

export default List 