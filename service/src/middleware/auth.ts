import sqlite3 from 'sqlite3'
import { isNotEmptyString } from '../utils/is'

const db = new sqlite3.Database('user.db')

const checkAuthorization = authorization => new Promise((resolve, reject) => {
  const sql = 'SELECT * FROM whitelist WHERE authorization = ?'
  db.get(sql, [authorization], (err, row) => {
    if (err)
      return reject(err)
    if (!row)
      return resolve(false)
    if (row.remaining <= 0)
      return resolve(false)
    const remaining = row.remaining - 1
    const updateSql = 'UPDATE whitelist SET remaining = ? WHERE authorization = ?'
    db.run(updateSql, [remaining, authorization], (updateErr) => {
      if (updateErr)
        return reject(updateErr)
      resolve(true)
    })
  })
})

const auth = async (req, res, next) => {
  const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
  if (isNotEmptyString(AUTH_SECRET_KEY)) {
    try {
      const Authorization_ = req.header('Authorization')
      const Authorization = Authorization_ ? Authorization_.replace('Bearer ', '') : null // 移除 Bearer 前缀
      const authorized = await checkAuthorization(Authorization)
      if (!authorized)
        throw new Error('Error: 无访问权限 | No access rights')
      next()
    }
    catch (error) {
      res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
    }
  }
  else {
    next()
  }
}

export { auth, checkAuthorization }
