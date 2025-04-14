import "./styles/rhs_styling.css"
import magnifyingGlass from '../assets/Search.png'
const RHS = () => {
    
    return (
        <div className="rhs-container">
            <div className="summary-box">
                <p className="rhs-title">Book Summary</p>
                <p>Temporary summary </p>
                <p>Blah Blah blah </p>
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
            <div className="to-bottom">
            <div className="search">
            <label>
            <input name="myInput" defaultValue="Search by book title ... " className="search-box"/>
            </label>
            <img src={magnifyingGlass} className="photo"/>
        </div>
        </div>
        </div>
    );
};

export default RHS; 
