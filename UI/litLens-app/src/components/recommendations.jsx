import "./styles/rec_styling.css"
import { useState, useEffect } from 'react'

const Recommendations = () => {
    const [topBooks, setTopBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopBooks = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const response = await fetch('http://localhost:3001/api/books/top-rated');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setTopBooks(result);
            } catch (err) {
                setError('Error fetching top books');
                console.error('API error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTopBooks();
    }, []);

    return (
        <div className="recs-container">
            <p className="recs-title">Top Rated Books</p>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {topBooks.length > 0 ? (
                <div className="book-list">
                    {topBooks.map((book, index) => (
                        <div key={index} className="book-item">
                            <div className="book-row ">
                                <p className="book-title" >{book.title}</p>
                                <p className="book-rating"> <i>Average Rating</i>: {Number(book.avg_rating).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : !loading && (
                <p>No books found</p>
            )}
        </div>
    );
};

export default Recommendations;
