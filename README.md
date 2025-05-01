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

(https://cseweb.ucsd.edu/~jmcauley/datasets/goodreads.html). This data is extremely large, so we are
considering limiting our analysis to a subset of books rather than every book for every genre.

For each of the two main topics, we are considering a couple approaches. For topic modeling, we
will consider LDA and BERTopic. For review summarization, we will consider extractive
summarization using TextRank.

### Running the program
The program currently runs only locally. A furture goal would be to aquire a domain and host it publically. 
1. 'Docker-compose up' the Posgres db
2. From the node-postgres directory, run 'node index.js' to run the db locally
3. From the UI/litLens directory, run 'npm run dev'
4. Navigate to http://localhost:5173/
5. Have fun !
