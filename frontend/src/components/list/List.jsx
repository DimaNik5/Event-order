import './styles.css'


export default function List(props){

    return (
        
        <div className="list">
        {
            props.list.map((value, key) =>{
                return <div key={key} className="element" >
                   {props.element(value).props.children}
                </div>
            })
        }
        </div>
    );
}