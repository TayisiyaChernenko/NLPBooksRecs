import "./styles/rhs_styling.css"

const NLPOutput = ({ searchText }) => {
    // Here you would typically make your database query using searchText
    console.log('Searching database for:', searchText);
    
    return (
        <div>
        <div className="summary-box">
            <p className="rhs-title">Book Summary</p>
            <p>Searching for: {searchText}</p>
            <p>Temporary summary </p>
        </div>
        <div className="center-graphs">
            <div className="graphs">
                <div className="graph-box" marginRight = {20}>
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