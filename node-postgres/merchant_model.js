const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nlpbooks',
  password: 'postgres',
  port: 5432,
});

const searchBooks = (title) => {
    return new Promise(function(resolve, reject) {
      pool.query(
        'SELECT * FROM books WHERE title ILIKE $1 LIMIT 1',
        [`%${title}%`],
        (error, results) => {
          if (error) {
            console.error('Database query error:', error);
            reject(error);
            return;
          }
          if (!results) {
            console.error('No results object returned from query');
            reject(new Error('No results returned from database'));
            return;
          }
          resolve(results.rows || []);
        }
      )
    }) 
}
const getTopRatedBooks = () => {
    return new Promise(function(resolve, reject) {
      pool.query(
        'SELECT * FROM books ORDER BY avg_rating DESC LIMIT 5',
        (error, results) => {
          if (error) {
            console.error('Database query error:', error);
            reject(error);
            return;
          }
          if (!results) {
            console.error('No results object returned from query');
            reject(new Error('No results returned from database'));
            return;
          }
          resolve(results.rows || []);
        }
      )
    })
}

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connection successful');
  }
});

module.exports = {
    searchBooks,
    getTopRatedBooks
}