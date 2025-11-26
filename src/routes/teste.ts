import { Hono } from 'hono'
import { prisma } from '../lib/prisma.js'

const teste = new Hono()

teste.get('/db', () => testConnection())

export { teste }

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('Conexão bem-sucedida!')
    await prisma.$disconnect()
  } catch (error) {
    console.error('Erro de conexão:', error)
  }
}
