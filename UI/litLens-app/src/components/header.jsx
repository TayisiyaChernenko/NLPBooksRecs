import "./styles/header_styling.css"
import book from '../assets/Book.png'

const Header = () => {
    
    return (
       <div className="header">
       <div className="header-container">
            <img src={book} className="photo"/>
            <h1 className="header-title">{"LiteraryLens"}</h1>
            <div className="register-container">
                <p className="header-text">Sign-In</p>
                <p className="header-text">Register</p>
            </div>
        </div>
        </div>
    );
};

export default Header;