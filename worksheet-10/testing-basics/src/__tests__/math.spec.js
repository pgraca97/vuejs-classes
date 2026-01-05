// Testes de Funções Utilitárias - math.js
// Cobrem os fundamentos de unit testing:
// - Funções puras (sem efeitos secundários)
// - Edge cases (zero, negativos, decimais)
// - Validação de erros

import { describe, it, expect } from 'vitest'
import { sum, isEven, clamp } from '../utils/math'

describe('sum', () => {
  it('should add two positive numbers correctly', () => {
    const a = 2
    const b = 3
    const result = sum(a, b)

    // .toBe() compara valores primitivos
    expect(result).toBe(5)
  })

  it('should handle negative numbers', () => {
    expect(sum(-5, 3)).toBe(-2)
  })

  it('should handle zero', () => {
    expect(sum(0, 5)).toBe(5)
    expect(sum(5, 0)).toBe(5)
  })

  it('should handle decimal numbers', () => {
    // toBeCloseTo() é melhor para decimais devido a imprecisões de floating point
    expect(sum(1.5, 2.3)).toBeCloseTo(3.8)
  })
})

describe('isEven', () => {
  it('should return true for even numbers', () => {
    expect(isEven(4)).toBe(true)
    expect(isEven(0)).toBe(true)
    expect(isEven(-2)).toBe(true)
  })

  it('should return false for odd numbers', () => {
    expect(isEven(3)).toBe(false)
    expect(isEven(1)).toBe(false)
    expect(isEven(-1)).toBe(false)
  })

  it('should consider zero as even', () => {
    expect(isEven(0)).toBe(true)
  })

  it('should throw error for non-integer numbers', () => {
    expect(() => isEven(2.5)).toThrow('isEven expects an integer')
    expect(() => isEven(NaN)).toThrow('isEven expects an integer')
    expect(() => isEven(Infinity)).toThrow('isEven expects an integer')
  })
})

describe('clamp', () => {
  it('should return the value when it is within bounds', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(0, 0, 10)).toBe(0)
    expect(clamp(10, 0, 10)).toBe(10)
  })

  it('should return min when value is below minimum', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(-100, 0, 10)).toBe(0)
  })

  it('should return max when value is above maximum', () => {
    expect(clamp(15, 0, 10)).toBe(10)
    expect(clamp(100, 0, 10)).toBe(10)
  })

  it('should work with negative ranges', () => {
    expect(clamp(-5, -10, -1)).toBe(-5)
    expect(clamp(-15, -10, -1)).toBe(-10)
    expect(clamp(0, -10, -1)).toBe(-1)
  })

  it('should work with decimal numbers', () => {
    expect(clamp(5.5, 0, 10)).toBe(5.5)
    expect(clamp(-0.5, 0, 10)).toBe(0)
    expect(clamp(10.5, 0, 10)).toBe(10)
  })
})

// Conceitos demonstrados:
// - describe() para agrupar testes relacionados
// - it() para definir casos de teste individuais
// - expect().toBe() para comparar valores primitivos
// - expect().toBeCloseTo() para comparar decimais
// - expect().toThrow() para verificar erros lançados
