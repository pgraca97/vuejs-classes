/**
 * Funções utilitárias matemáticas
 * Este ficheiro contém funções puras - não têm efeitos secundários
 * e retornam sempre o mesmo output para o mesmo input.
 * São ideais para começar a aprender testing.
 */

/**
 * Soma dois números
 * @param {number} a - primeiro número
 * @param {number} b - segundo número
 * @returns {number} soma de a + b
 */
export const sum = (a, b) => {
  return a + b
}

/**
 * Verifica se um número é par
 * @param {number} n - número a verificar
 * @returns {boolean} true se par, false se ímpar
 */
export const isEven = (n) => {
  // Validar se n é um número inteiro
  if (!Number.isInteger(n)) {
    throw new Error('isEven expects an integer')
  }
  
  return n % 2 === 0
}

/**
 * Limita um valor a um intervalo [min, max]
 * Garante que o valor retornado está sempre dentro dos limites
 * 
 * @param {number} value - valor a limitar
 * @param {number} min - limite inferior
 * @param {number} max - limite superior
 * @returns {number} valor limitado ao intervalo
 */
export const clamp = (value, min, max) => {
  // Se o valor for menor que min, retorna min
  if (value < min) return min
  
  // Se o valor for maior que max, retorna max
  if (value > max) return max
  
  // Caso contrário, o valor está dentro do intervalo
  return value
}