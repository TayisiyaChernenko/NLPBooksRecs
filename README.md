# NLPBooksRecs

### Scope
For this class project, we will develop a working prototype of an interactive website that allows users
to input a book title and receive structured insights from its reviews. The prototype will include:

* Topic modeling to extract key themes from book reviews.
* Review summarization to generate concise overviews of user opinions.
* Visualizations to highlight review patterns
* An interactive website where users can explore book-specific review insights in an intuitive format

### Data sources, approaches
We will use the UCSD Goodreads Dataset

(https://cseweb.ucsd.edu/~jmcauley/datasets/goodreads.html). This data is extremely large, so we are
considering limiting our analysis to a subset of books rather than every book for every genre.

For each of the two main topics, we are considering a couple approaches. For topic modeling, we
will consider LDA and BERTopic. For review summarization, we will consider extractive
summarization using TextRank.
