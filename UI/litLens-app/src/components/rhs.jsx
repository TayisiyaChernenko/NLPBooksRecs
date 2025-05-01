import "./styles/rhs_styling.css"
import magnifyingGlass from '../assets/Search.png'
import NLPOutput from './nlp_output'
import { useState } from 'react'

const RHS = () => {
    const [showNLPOutput, setShowNLPOutput] = useState(false);
    const [currentInput, setCurrentInput] = useState('');
    const [submittedSearch, setSubmittedSearch] = useState('');
    
    const handleInputChange = (e) => {
        setCurrentInput(e.target.value);
    };

    const handleSearch = () => {
        if (currentInput.trim()) {
            setSubmittedSearch(currentInput);
            setShowNLPOutput(true);
        }
    };

    const handleDoubleClick = () => {
        setCurrentInput('');
    };
    
    return (
        <div className="rhs-container">
            {showNLPOutput && <NLPOutput searchText={submittedSearch}/>}
            <div className="to-bottom">
                <div className="search">
                    <label>
                        <input 
                            name="myInput" 
                            placeholder="Search by book title ... " 
                            className="search-box"
                            value={currentInput}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            type="text"
                        />
                    </label>
                    <button 
                        className="search-button"
                        onClick={handleSearch}
                    >
                        <img src={magnifyingGlass} className="photo"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RHS; 
