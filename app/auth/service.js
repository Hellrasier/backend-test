class AuthService {
  constructor(sessions, db, metautil, jwt){
    this.sessions = sessions
    this.db = db
    this.metautil = metautil
    this.jwt = jwt
  }

  async validate(login, password) {
    const user = await this.db('users')
      .where('login', login)
      .first()
    
    const valid = await this.metautil.validatePassword(password, user.password)
    if (!valid) return null
  
    const access_token = this.jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    )

    const refresh_token = this.jwt.sign(
      { name: "refresh-token" },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    
    this.sessions.setSession(user.id, refresh_token)
    return { access_token, refresh_token }
  }

  async refresh(token, {id, role}) {
    
    const session_token = this.sessions.getSession(id)
    if (session_token !== token) return null

    const access_token = this.jwt.sign(
      { id, role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    
    const refresh_token = this.jwt.sign(
      { name: "refresh-token" },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    this.sessions.setSession(id, refresh_token)
    return { access_token, refresh_token }
  }

  async deleteSession(token, context) {
    const session_token = this.sessions.getSession(context.id)
    if (session_token !== token) return null
    
    this.sessions.deleteSession(context.id)
    return true
  }
}

module.exports = AuthService
