const { CreateTopicParams, UpdateTopicParams, GetTopicParams } = require('./dto')
const HttpError = require('http-errors')

module.exports = (topicsService) => ({
  'get': {
    access: 'user',
    params: GetTopicParams,
    handler: ({ id, from, to }) => {
      if(id) {
        return topicsService.findTopic(id) 
      }
      return topicsService.getAllTopics({from, to})
    }
  },
  
  'post': {
    params: CreateTopicParams,
    handler: async (createTopicParams) => {
      const createdTopic = await topicsService.createTopic(createTopicParams)
      if (createdTopic) {
        return createdTopic
      } else {
        throw new HttpError(400, "Cannot create topc, invalid user reference")
      }
    }
  },
  
  'put': {
    params: UpdateTopicParams,
    handler: async (updateTopicParams) => {
      const res = await topicsService.updateTopic(updateTopicParams)
      if (res) return "ok"
      else throw new Error(400, "This topic does not exist")
    }
  },

  'delete': {
    params: { id: 'number' },
    handler: async ({ id }) => {
      await topicsService.deleteTopic(id)
      return "ok"
    }
  }
})
