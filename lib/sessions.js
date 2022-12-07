const sessions = new Map()

module.exports = {
  setSession: (id, token) => {
    sessions.set(id, token)
  },

  getSession: (id) => {
    return sessions.get(id)
  },

  deleteSession: (id) => {
    sessions.delete(id)
  }
}
