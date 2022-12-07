class UsersService {
  constructor(db, metautil) {
    this.db = db
    this.metautil = metautil
  }

  async createUser(createUserParams) {
    const [ user ] = await this.db
      .select()
      .from('users')
      .where('login', createUserParams.login)
    
    if (user) {
      return null
    }
    
    const hashed = await this.metautil.hashPassword(createUserParams.password)
    createUserParams.password = hashed

    const [ id ] = await this.db
      .insert(createUserParams)
      .into('users')
    
    return { id }
  }

  async updateUser(updateUserParams) {
    const user = await this.findUser(updateUserParams.id)
    
    if (!user) {
      return null 
    }
    
    const hashed = await this.metautil.hashPassword(updateUserParams.password)
    updateUserParams.password = hashed
    
    return this.db('users')
      .update(updateUserParams)
      .where('id', updateUserParams.id)
  }

  async findUser(id) {
    const [ user ] = await this.db.select().from('users').where('users.id', id)
    return user
  }

  async getAllUsers({from, to}) {
    let query = this.db
      .select('login', 'firstname', 'surname', 'role', 'department', 'position', 'created_at')
      .from('users')
    if(from) query = query.andWhere('created_at', '>', from)
    if (to) query = query.andWhere('created_at', '<', to)
    return query.orderBy('created_at', 'desc')
  }
  
  async deleteUser(id) {
    return this.db('users').where('id', id).del("*")
  }
}

module.exports = UsersService
