const supertest = require('supertest')
const mongoose = require('mongoose')
const {app, server} = require('../index')
const api = supertest(app)
const { saveUsers, saveAll } = require('../helpers/helpers')
const { getUserId, FoundInDB } = require('../helpers/test_helpers')
const User = require('../models/User')
const { users } = require('./mock/user')


describe('prueba de login', ()=>{
   beforeEach(async ()=>{
      await User.deleteMany({})
      await saveUsers(users)
   })
   test('login', async ()=>{
      const {username, password} = users[0]
      const login = {
         username,
         password
      }
      const usersInDB = await FoundInDB(User)
      await api
         .post('/api/login')
         .send(login)
         .expect(200)
         .expect('Content-Type', /application\/json/)
      const result = await api.post('/api/login').send(login)
      expect(result).body.toHaveProperty('token')
   })
   afterAll(async () => {
		await mongoose.connection.close()
		server.close()
	}) 
})
