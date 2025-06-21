import React, { useState, useEffect, useRef } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { MoreHorizontal, Edit2, Trash2, GripVertical } from 'lucide-react'

const Card = ({ card, index, listId, onUpdateContent, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [content, setContent] = useState(card.content)
  const [description, setDescription] = useState(card.description || '')
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

  const handleSubmit = () => {
    if (content.trim()) {
      onUpdateContent(listId, card.id, content.trim(), description.trim())
    } else {
      setContent(card.content)
    }
    setIsEditing(false)
  }

  const handleDescriptionSubmit = () => {
    onUpdateContent(listId, card.id, card.content, description.trim())
    setIsEditingDescription(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Escape') {
      setContent(card.content)
      setIsEditing(false)
    }
  }

  const handleDescriptionKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleDescriptionSubmit()
    } else if (e.key === 'Escape') {
      setDescription(card.description || '')
      setIsEditingDescription(false)
    }
  }

  const handleDoubleClick = () => {
    setIsEditing(true)
    setContent(card.content)
  }

  const handleDescriptionDoubleClick = () => {
    setIsEditingDescription(true)
    setDescription(card.description || '')
  }

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`card group ${snapshot.isDragging ? 'card-ghost' : ''}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2 flex-1">
              {/* Drag Handle */}
              <div
                {...provided.dragHandleProps}
                className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing p-1 mt-1"
              >
                <GripVertical className="w-4 h-4" />
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onBlur={handleSubmit}
                    onKeyDown={handleKeyPress}
                    className="w-full bg-white border border-blue-300 rounded px-2 py-1 outline-none resize-none text-sm text-trello-dark-gray focus:border-blue-500"
                    rows="3"
                    autoFocus
                    placeholder="Enter card content..."
                  />
                ) : (
                  <div 
                    className="text-sm text-trello-dark-gray whitespace-pre-wrap cursor-pointer hover:bg-gray-50 rounded px-1 py-1"
                    onDoubleClick={handleDoubleClick}
                  >
                    {card.content}
                  </div>
                )}
                
                {isEditingDescription ? (
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={handleDescriptionSubmit}
                    onKeyDown={handleDescriptionKeyPress}
                    className="w-full bg-white border border-blue-300 rounded px-2 py-1 outline-none resize-none text-xs text-gray-500 focus:border-blue-500 mt-1"
                    rows="2"
                    autoFocus
                    placeholder="Enter description (optional)..."
                  />
                ) : (
                  card.description && (
                    <div 
                      className="text-xs text-gray-500 mt-1 cursor-pointer hover:bg-gray-50 rounded px-1 py-1"
                      onDoubleClick={handleDescriptionDoubleClick}
                    >
                      {card.description}
                    </div>
                  )
                )}
                
                {!card.description && !isEditingDescription && (
                  <div 
                    className="text-xs text-gray-400 mt-1 cursor-pointer hover:bg-gray-50 rounded px-1 py-1 italic"
                    onDoubleClick={handleDescriptionDoubleClick}
                  >
                    Double-click to add description...
                  </div>
                )}
              </div>
            </div>
            
            <div className="relative ml-2" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 top-6 bg-white shadow-lg rounded-lg border border-gray-200 py-1 z-10 min-w-32">
                  <button
                    onClick={() => {
                      setIsEditing(true)
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Content</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingDescription(true)
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Description</span>
                  </button>
                  <button
                    onClick={() => {
                      onDelete(listId, card.id)
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Card 