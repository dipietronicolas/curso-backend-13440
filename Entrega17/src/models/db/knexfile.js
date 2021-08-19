// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.HOST,
      user: process.env.USER_DB,
      password: '',
      database: process.env.DATABASE || 'backendecommerce'
    },
  }

};
