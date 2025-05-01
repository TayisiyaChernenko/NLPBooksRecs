import "./styles/rhs_styling.css"
import { useState, useEffect } from 'react'
import WordCloud from 'react-wordcloud';
import expandIcon from '../assets/expand.png';

const NLPOutput = ({ searchText }) => {
    
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [summaryData, setSummaryData] = useState(null);
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [summaryError, setSummaryError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Reset modal state when searchText changes
    useEffect(() => {
        setIsModalOpen(false);
    }, [searchText]);

    useEffect(() => {
        const fetchData = async () => {
            if (!searchText) return;
            
            setLoading(true);
            setError(null);
            setBookData(null);
            setSummaryData(null);
            
            try {
                const response = await fetch(`http://localhost:3001/api/books?title=${encodeURIComponent(searchText)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log('Book data received:', result);
                
                if (result && result.length > 0) {
                    setBookData(result[0]);
                } else {
                    setBookData(null);
                }
            } catch (err) {
                console.error('Error fetching book data:', err);
                setError('Error fetching book data');
                setBookData(null);
            } finally {
                setLoading(false);
            }

            try {
                const response = await fetch(`http://localhost:3001/api/summaries?title=${encodeURIComponent(searchText)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log('Summary data received:', result);
                
                if (result && result.length > 0) {
                    setSummaryData(result[0]);
                } else {
                    setSummaryData(null);
                }
            } catch (err) {
                console.error('Error fetching summary data:', err);
                setSummaryError('Error fetching summary data');
                setSummaryData(null);
            } finally {
                setSummaryLoading(false);
            }
        };

        fetchData();
    }, [searchText]);

    const processWordCloudData = (wordsString, weightsString) => {
        console.log('Raw words data:', wordsString);
        console.log('Raw weights data:', weightsString);
        
        if (!wordsString || !weightsString) {
            console.log('Missing data:', { wordsString, weightsString });
            return [];
        }

        try {
            // First try to parse as JSON
            let words, weights;
            try {
                words = JSON.parse(wordsString);
                weights = JSON.parse(weightsString);
            } catch (e) {
                // If JSON parsing fails, try to split the string
                console.log('JSON parsing failed, trying string split');
                words = wordsString.split(',').map(word => word.trim());
                weights = weightsString.split(',').map(weight => parseFloat(weight.trim()));
            }
            
            console.log('Processed words:', words);
            console.log('Processed weights:', weights);
            
            if (!Array.isArray(words) || !Array.isArray(weights)) {
                console.error('Invalid data format - not arrays');
                return [];
            }
            
            return words.map((word, index) => ({
                text: word,
                value: (weights[index] + 10) * 10 // Scale the values for better visualization
            }));
        } catch (e) {
            console.error('Error processing word cloud data:', e);
            return [];
        }
    };

    const GraphsModal = () => {
        if (!isModalOpen) return null;

        return (
            <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <button className="close-modal" onClick={() => setIsModalOpen(false)}>×</button>
                    <div className="modal-graphs">
                        <div className="expanded-graph-box">
                            <h3 className="modal-graphs-h3">Top Positive Words</h3>
                            <WordCloud
                                words={processWordCloudData(bookData.positive_words, bookData.positive_weights)}
                                options={{
                                    rotations: 0,
                                    fontSizes: [24, 46],
                                    padding: 3,
                                    deterministic: true,
                                    randomSeed: 42,
                                    scale: 'sqrt',
                                    spiral: 'rectangular',
                                    transitionDuration: 0
                                }}
                            />
                        </div>
                        <div className="expanded-graph-box">
                            <h3 className="modal-graphs-h3">Top Negative Words</h3>
                            {bookData.negative_words && bookData.negative_weights ? (
                                <WordCloud
                                    words={processWordCloudData(bookData.negative_words, bookData.negative_weights)}
                                    options={{
                                        rotations: 0,
                                        fontSizes: [24, 46],
                                        padding: 3,
                                        deterministic: true,
                                        randomSeed: 42,
                                        scale: 'sqrt',
                                        spiral: 'rectangular',
                                        transitionDuration: 0
                                    }}
                                />
                            ) : (
                                <p>No negative words data available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="summary-box">
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {summaryLoading && <p>Loading...</p>}
                {summaryError && <p className="error">{summaryError}</p>}
                {bookData && summaryData ? (
                    <>
                        <div className="title-row">
                            <h3 className="book-title">{bookData.title}</h3>
                            <p className="book-rating">Average Rating: {Number(bookData.avg_rating).toFixed(2)}</p>
                        </div>
                        <p className="rhs-title">Book Summary</p>
                        <p className="summary-text">{summaryData.summary}</p>
                    </>
                ) : !loading && searchText && (
                    <p>No book found matching "{searchText}"</p>
                )}
            </div>
            <div className="center-graphs">
                <div className="graphs">
                    {bookData && bookData.positive_words && bookData.positive_weights ? (  
                        <>
                            <div className="graph-box">
                                <h5 className="graph-box-h5">Top Positive Words</h5>
                                <WordCloud
                                    words={processWordCloudData(bookData.positive_words, bookData.positive_weights)}
                                    options={{
                                        rotations: 0,
                                        fontSizes: [12, 30],
                                        padding: 0,
                                        deterministic: true,
                                        randomSeed: 41,
                                        scale: 'sqrt',
                                        spiral: 'rectangular',
                                        transitionDuration: 0
                                    }}
                                />
                            </div>
                            <div className="graph-box">
                                <h5 className="graph-box-h5">Top Negative Words</h5>
                                {bookData.negative_words && bookData.negative_weights ? (
                                    <WordCloud
                                        words={processWordCloudData(bookData.negative_words, bookData.negative_weights)}
                                        options={{
                                            rotations: 0,
                                            fontSizes: [12, 30],
                                            padding: 0,
                                            deterministic: true,
                                            randomSeed: 41,
                                            scale: 'sqrt',
                                            spiral: 'rectangular',
                                            transitionDuration: 0
                                        }}
                                    />
                                ) : (
                                    <p>No negative words data available</p>
                                )}
                            </div>
                            <button className="expand-button" onClick={() => setIsModalOpen(true)}>
                                <img src={expandIcon} alt="Expand" className="expand-icon" />
                            </button>
                        </>
                    ) : !loading && searchText && (
                        <p>No book data available</p>
                    )}
                </div>
            </div>
            <GraphsModal />
        </div>
    );
};

export default NLPOutput;