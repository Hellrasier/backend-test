const CreateTopicParams = {
  name: 'string',
  contents: 'string',
  author: 'number'
}

const UpdateTopicParams = {
  id: 'number',
  name: '?string',
  contents: '?string',
  author: '?number'
}

const GetTopicParams = {
  id: '?number',
  from: { type: '?string', validate: (date) => !!date && new Date(date) !== 'Invalid Date' }, 
  to: { type: '?string', validate: (date) => !!date && new Date(date) !== 'Invalid Date' }
}

module.exports = { CreateTopicParams, UpdateTopicParams, GetTopicParams }
