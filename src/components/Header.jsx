import React, { useState, useRef, useEffect } from 'react'
import { Plus, Trello, Palette } from 'lucide-react'

const Header = ({ boardTitle, onAddList, backgroundColor, onBackgroundColorChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const colorPickerRef = useRef(null)

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false)
      }
    }

    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showColorPicker])

  const colorOptions = [
    { name: 'Default', value: '#f4f5f7' },
    { name: 'Warm Gray', value: '#f8f9fa' },
    { name: 'Cool Blue', value: '#f0f4f8' },
    { name: 'Mint Green', value: '#f0f8f4' },
    { name: 'Lavender', value: '#f8f4f8' },
    { name: 'Peach', value: '#fef7f0' },
    { name: 'Sky Blue', value: '#f0f8ff' },
    { name: 'Sage', value: '#f4f8f0' },
    { name: 'Rose', value: '#fef0f4' },
    { name: 'Cream', value: '#fefefe' }
  ]

  const handleColorSelect = (color) => {
    onBackgroundColorChange(color)
    setShowColorPicker(false)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Trello className="w-8 h-8 text-trello-blue" />
            <h1 className="text-xl font-bold text-trello-dark-gray">Trello Clone</h1>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <h2 className="text-lg font-medium text-trello-dark-gray">{boardTitle}</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Color Picker */}
          <div className="relative" ref={colorPickerRef}>
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors duration-200"
            >
              <Palette className="w-4 h-4" />
              <span className="text-sm">Theme</span>
            </button>
            
            {showColorPicker && (
              <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg border border-gray-200 py-2 z-20 min-w-48">
                <div className="px-3 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700">Background Color</h3>
                </div>
                <div className="p-3">
                  <div className="grid grid-cols-5 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => handleColorSelect(color.value)}
                        className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                          backgroundColor === color.value 
                            ? 'border-gray-600 shadow-md' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="grid grid-cols-1 gap-1">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => handleColorSelect(color.value)}
                          className={`flex items-center space-x-2 px-2 py-1 rounded text-left text-sm transition-colors duration-200 ${
                            backgroundColor === color.value 
                              ? 'bg-blue-50 text-blue-700' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div 
                            className="w-4 h-4 rounded border border-gray-300"
                            style={{ backgroundColor: color.value }}
                          />
                          <span>{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onAddList}
            className="header-button flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add List</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header 