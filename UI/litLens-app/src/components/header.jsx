import "./header_styling.css"

const Header = () => {
    
    return (
        <div className="header-container">
            <h1 className="header-title">{"LiteraryLens"}</h1>
            <div className="register-container">
                <p className="header-text">Sign-In</p>
                <p className="header-text">Register</p>
            </div>
        </div>
    );
};

export default Header;