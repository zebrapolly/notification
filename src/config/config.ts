export default {
  protocol: 'https',
  apiVersion: '1.0',
  apiHost: '127.0.0.1',
  host: '127.0.0.1',
  port: '3335',
  db: {
    mysql: {
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'notification_service',
      driver: 'mysql',
      charset: 'utf8mb4'
    }
  }
};
