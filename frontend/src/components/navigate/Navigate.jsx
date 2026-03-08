import './styles.css'
import {UserIcon} from '../../svg/user'

import { useNavigate } from 'react-router-dom';

export default function Navigate(){
    const navigate = useNavigate();
    return (
        <div className='container-nav'>
            <button className='left-nav'  onClick={() => navigate("/users")}>
                <div>Все<br></br>участники</div>
            </button>
            <button className='centre-nav' onClick={() => navigate("/event")}>
                <div>События</div>
            </button>
            <button className='right-nav'  onClick={() => navigate("/user")}>
                <UserIcon color='var(--info-color)'/>
            </button>
        </div>
    );
}