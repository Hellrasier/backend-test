class TopicsService {
  constructor(db, io) {
    this.db = db
    this.io = io
  }

  async createTopic(createTopicParams) {
    const user = await this.db
      .select()
      .from('users')
      .where('id', createTopicParams.author)
      .first()
    
    if (!user){
      return null
    }
    
    const [ id ] = await this.db
      .insert(createTopicParams)
      .into('topics')

    const topic = await this.findTopic(id)
    this.io.emit('topic', topic)
    
    return { id }
  }

  async updateTopic(updateTopicParams) {
    const topic = await this.findTopic(updateTopicParams.id)
    
    if (!topic) {
      return null 
    }
    
    const res = await this.db('topics')
      .update(updateTopicParams)
      .where('id', updateTopicParams.id)

    return res
  }

  async findTopic(id) {
    return this.db('topics')
      .where('id', id)
      .withRelations(this.db('users'), 'author', 'id')
      .then(([res]) => {
        if (!res) return null
        res.author = res.users[0]
        delete res.users
        return res
      })
  }

  async getAllTopics({from, to}) {
    const query = this.db.from('topics')
    
    if(from) query = query.andWhere('created_at', '>', from)
    if (to) query = query.andWhere('created_at', '<', to)
    
    return query
      .orderBy('created_at', 'desc')
      .withRelations(this.db('users'), 'author', 'id')
      .then(results => 
        results
        .map((res) => {
          delete res.users[0].password
          res.author = res.users[0]
          delete res.users
          return res
        })  
      )
  }
  
  async deleteTopic(id) {
    return this.db('topics').where('id', id).del()
  }
}

module.exports = TopicsService
