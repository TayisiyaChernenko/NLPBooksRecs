import "./styles/rhs_styling.css"
import { useState, useEffect } from 'react'


const NLPOutput = ({ searchText }) => {
    
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookData = async () => {
            if (!searchText) return;
            
            setLoading(true);
            setError(null);
            
            try {
                const response = await fetch(`http://localhost:3001/api/books?title=${encodeURIComponent(searchText)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                
                if (result.length > 0) {
                    setBookData(result[0]);
                } else {
                    setBookData(null);
                }
            } catch (err) {
                setError('Error fetching book data');
                console.error('API error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookData();
    }, [searchText]);

    return (
        <div>
            <div className="summary-box">
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {bookData ? (
                    <>
                        <div className="title-row">
                            <h3 className="book-title">{bookData.title}</h3>
                            <p className="book-rating">Average Rating: {bookData.avg_rating}</p>
                        </div>
                        <p className="rhs-title">Book Summary</p>
                        <div className="word-lists">
                            <div>
                                <p><i>Positive Words</i></p>
                                <p>{bookData.positive_words}</p>
                            </div>
                            <div>
                                <p><i>Negative Words</i></p>
                                <p>{bookData.negative_words}</p>
                            </div>
                        </div>
                    </>
                ) : !loading && searchText && (
                    <p>No book found matching "{searchText}"</p>
                )}
            </div>
            <div className="center-graphs">
                <div className="graphs">
                    <div className="graph-box" marginRight={20}>
                        <p>Some graph</p>
                    </div>
                    <div className="graph-box">
                        <p>Other graph</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NLPOutput;