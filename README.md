# NLPBooksRecs
### Team : 
Abby East, 
Tayisiya Chernenko
### Scope
For this class project, we developed a working prototype of an interactive website that allows users
to input a book title and receive structured insights from its reviews. The prototype includes:

* Topic modeling to extract key themes from book reviews.
* Review summarization to generate concise overviews of user opinions.
* Wordcloud visualizations to highlight review patterns
* An interactive website where users can explore book-specific review insights in an intuitive format

### Data sources, approaches
We use the UCSD Goodreads Dataset

(https://cseweb.ucsd.edu/~jmcauley/datasets/goodreads.html). This data is extremely large, so we are limited
our analysis to a subset of books rather than every book for every genre.

For each of the two main topics, we considered a couple approaches.

For key sentitments, we used log odds analysis with the informed Dirichlet priors.

For review summarization, we considered extractive summarization using TextRank,
but ended up using the Hugging Face BART model with Transformers.

### Running the program
The program currently runs only locally. A furture goal would be to aquire a domain and host it publically. 
1. 'Docker-compose up' the Posgres db
2. From the Database directory, run "python create_db.py" to create tables and upload the data to Postgres
3. From the node-postgres directory, run 'node index.js' to run the db locally
4. From the UI/litLens directory, run 'npm run dev'
5. Navigate to http://localhost:5173/
6. Have fun !
7. 
### Video Link 
https://youtu.be/cqpWSTgydn8
The link provides a demonstration of the literaryLens website
