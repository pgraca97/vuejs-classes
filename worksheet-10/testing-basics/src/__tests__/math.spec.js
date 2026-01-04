import { describe, it, expect } from 'vitest'
import { sum, isEven, clamp } from '../utils/math'

/**
 * Testes para funções utilitárias matemáticas
 *
 * Estrutura de um teste:
 * 1. Arrange (preparar) - configurar os dados necessários
 * 2. Act (agir) - executar a função a testar
 * 3. Assert (verificar) - confirmar que o resultado está correto
 */

// Agrupa testes relacionados - útil para organização
describe('sum', () => {
  // Define um caso de teste individual
  // O nome do teste deve descrever claramente o comportamento esperado
  it('should add two positive numbers correctly', () => {
    // Arrange: definir inputs
    const a = 2
    const b = 3

    // Act: chamar a função
    const result = sum(a, b)

    // Assert: verificar o resultado
    // .toBe() compara valores primitivos (números, strings, booleans)
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
    expect(sum(1.5, 2.3)).toBeCloseTo(3.8)
    // toBeCloseTo() é melhor para decimais devido a imprecisões de floating point
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

  // Testar o caso zero é importante - é um edge case comum
  it('should consider zero as even', () => {
    expect(isEven(0)).toBe(true)
  })

  // Testar comportamento com números não inteiros
  it('should throw error for non-integer numbers', () => {
    expect(() => isEven(2.5)).toThrow('isEven expects an integer')
    expect(() => isEven(NaN)).toThrow('isEven expects an integer')
    expect(() => isEven(Infinity)).toThrow('isEven expects an integer')
  })
})

describe('clamp', () => {
  // Casos onde o valor está dentro do intervalo
  it('should return the value when it is within bounds', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(0, 0, 10)).toBe(0) // no limite inferior
    expect(clamp(10, 0, 10)).toBe(10) // no limite superior
  })

  // Casos onde o valor está abaixo do mínimo
  it('should return min when value is below minimum', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(-100, 0, 10)).toBe(0)
  })

  // Casos onde o valor está acima do máximo
  it('should return max when value is above maximum', () => {
    expect(clamp(15, 0, 10)).toBe(10)
    expect(clamp(100, 0, 10)).toBe(10)
  })

  // Testar com intervalos negativos
  it('should work with negative ranges', () => {
    expect(clamp(-5, -10, -1)).toBe(-5)
    expect(clamp(-15, -10, -1)).toBe(-10)
    expect(clamp(0, -10, -1)).toBe(-1)
  })

  // Testar com decimais
  it('should work with decimal numbers', () => {
    expect(clamp(5.5, 0, 10)).toBe(5.5)
    expect(clamp(-0.5, 0, 10)).toBe(0)
    expect(clamp(10.5, 0, 10)).toBe(10)
  })
})
