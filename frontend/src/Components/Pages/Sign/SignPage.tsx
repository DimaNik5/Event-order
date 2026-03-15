import './styles.css'
import {useState} from 'react'



export default function SignPage(){
    const [isIn, setInOrUp] = useState(true);

    function handleSingUpStep(){
        setInOrUp(!isIn);
    }

    return (
        <div>
            <div className="logo">logotype</div>
            <div className="content">
                {!isIn && (
                    <div>name</div>
                )}
                <div>email</div>
                <div>password</div>
                {isIn && (
                    <button>signIn</button>
                )}
            </div>
            <div className="second-content">
                {isIn && (
                    <button className='bt-singUp' onClick={handleSingUpStep}>signUp</button>
                )}
                {!isIn && (
                    <button className='bt-singUp'>signUp now</button>
                )}
            </div>
        </div>
    );
}

