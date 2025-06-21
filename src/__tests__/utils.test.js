import { describe, it, expect, beforeEach } from 'vitest'
import { mockBoard, mockList, mockCard, clearAllMocks } from '../test/utils'

describe('Test Utils', () => {
  beforeEach(() => {
    clearAllMocks()
  })

  describe('Mock Data', () => {
    it('has correct mockBoard structure', () => {
      expect(mockBoard).toHaveProperty('id')
      expect(mockBoard).toHaveProperty('title')
      expect(mockBoard).toHaveProperty('lists')
      expect(Array.isArray(mockBoard.lists)).toBe(true)
      expect(mockBoard.lists).toHaveLength(3)
    })

    it('has correct mockList structure', () => {
      expect(mockList).toHaveProperty('id')
      expect(mockList).toHaveProperty('title')
      expect(mockList).toHaveProperty('cards')
      expect(Array.isArray(mockList.cards)).toBe(true)
      expect(mockList.cards).toHaveLength(2)
    })

    it('has correct mockCard structure', () => {
      expect(mockCard).toHaveProperty('id')
      expect(mockCard).toHaveProperty('content')
      expect(mockCard).toHaveProperty('description')
    })

    it('mockBoard contains valid list data', () => {
      mockBoard.lists.forEach(list => {
        expect(list).toHaveProperty('id')
        expect(list).toHaveProperty('title')
        expect(list).toHaveProperty('cards')
        expect(Array.isArray(list.cards)).toBe(true)
      })
    })

    it('mockList contains valid card data', () => {
      mockList.cards.forEach(card => {
        expect(card).toHaveProperty('id')
        expect(card).toHaveProperty('content')
        expect(card).toHaveProperty('description')
      })
    })
  })

  describe('Mock Functions', () => {
    it('mockOnAddCard is a function', () => {
      const { mockOnAddCard } = require('../test/utils')
      expect(typeof mockOnAddCard).toBe('function')
    })

    it('mockOnUpdateListTitle is a function', () => {
      const { mockOnUpdateListTitle } = require('../test/utils')
      expect(typeof mockOnUpdateListTitle).toBe('function')
    })

    it('mockOnUpdateCardContent is a function', () => {
      const { mockOnUpdateCardContent } = require('../test/utils')
      expect(typeof mockOnUpdateCardContent).toBe('function')
    })

    it('mockOnDeleteList is a function', () => {
      const { mockOnDeleteList } = require('../test/utils')
      expect(typeof mockOnDeleteList).toBe('function')
    })

    it('mockOnDeleteCard is a function', () => {
      const { mockOnDeleteCard } = require('../test/utils')
      expect(typeof mockOnDeleteCard).toBe('function')
    })

    it('mockOnAddList is a function', () => {
      const { mockOnAddList } = require('../test/utils')
      expect(typeof mockOnAddList).toBe('function')
    })

    it('mockHandleDragEnd is a function', () => {
      const { mockHandleDragEnd } = require('../test/utils')
      expect(typeof mockHandleDragEnd).toBe('function')
    })
  })

  describe('clearAllMocks', () => {
    it('clears all mock functions', () => {
      const { 
        mockOnAddCard, 
        mockOnUpdateListTitle, 
        mockOnUpdateCardContent, 
        mockOnDeleteList, 
        mockOnDeleteCard,
        mockOnAddList,
        mockHandleDragEnd
      } = require('../test/utils')

      // Call the functions
      mockOnAddCard()
      mockOnUpdateListTitle()
      mockOnUpdateCardContent()
      mockOnDeleteList()
      mockOnDeleteCard()
      mockOnAddList()
      mockHandleDragEnd()

      // Verify they were called
      expect(mockOnAddCard).toHaveBeenCalled()
      expect(mockOnUpdateListTitle).toHaveBeenCalled()
      expect(mockOnUpdateCardContent).toHaveBeenCalled()
      expect(mockOnDeleteList).toHaveBeenCalled()
      expect(mockOnDeleteCard).toHaveBeenCalled()
      expect(mockOnAddList).toHaveBeenCalled()
      expect(mockHandleDragEnd).toHaveBeenCalled()

      // Clear all mocks
      clearAllMocks()

      // Verify they were cleared
      expect(mockOnAddCard).not.toHaveBeenCalled()
      expect(mockOnUpdateListTitle).not.toHaveBeenCalled()
      expect(mockOnUpdateCardContent).not.toHaveBeenCalled()
      expect(mockOnDeleteList).not.toHaveBeenCalled()
      expect(mockOnDeleteCard).not.toHaveBeenCalled()
      expect(mockOnAddList).not.toHaveBeenCalled()
      expect(mockHandleDragEnd).not.toHaveBeenCalled()
    })

    it('clears localStorage mocks', () => {
      // Mock localStorage calls
      localStorage.getItem('test')
      localStorage.setItem('test', 'value')

      expect(localStorage.getItem).toHaveBeenCalled()
      expect(localStorage.setItem).toHaveBeenCalled()

      clearAllMocks()

      expect(localStorage.getItem).not.toHaveBeenCalled()
      expect(localStorage.setItem).not.toHaveBeenCalled()
    })
  })

  describe('Data Validation', () => {
    it('mockBoard has unique IDs', () => {
      const ids = new Set()
      ids.add(mockBoard.id)
      
      mockBoard.lists.forEach(list => {
        expect(ids.has(list.id)).toBe(false)
        ids.add(list.id)
        
        list.cards.forEach(card => {
          expect(ids.has(card.id)).toBe(false)
          ids.add(card.id)
        })
      })
    })

    it('mockList has unique card IDs', () => {
      const cardIds = mockList.cards.map(card => card.id)
      const uniqueIds = new Set(cardIds)
      expect(cardIds.length).toBe(uniqueIds.size)
    })

    it('mockBoard lists have valid titles', () => {
      mockBoard.lists.forEach(list => {
        expect(list.title).toBeTruthy()
        expect(typeof list.title).toBe('string')
        expect(list.title.length).toBeGreaterThan(0)
      })
    })

    it('mockList cards have valid content', () => {
      mockList.cards.forEach(card => {
        expect(card.content).toBeTruthy()
        expect(typeof card.content).toBe('string')
        expect(card.content.length).toBeGreaterThan(0)
      })
    })
  })
}) 