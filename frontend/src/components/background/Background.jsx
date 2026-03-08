import './styles.css'

export default function Background({ children }){
    return (
        <div className="container">
            <div className="right"></div>
            <div className="left"></div>
            { children }
        </div>
    );
}