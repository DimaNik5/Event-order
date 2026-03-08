import './styles.css'
import {CalendarIcon} from "../../svg/calendar"
import {BellIcon} from "../../svg/bell"
import {FilterIcon} from "../../svg/filter"

const icons = {
    "calendar": <CalendarIcon height="100%" width="100%" color='var(--info-color)'/>,
    "bell": <BellIcon height="100%" width="100%" color='var(--info-color)'/>,
    "filter": <FilterIcon height="100%" width="100%" color='var(--info-color)'/>
};

/*
    licon + lhandleClick
    ricon + rhandleClick
    isBotton
    bicon/btext + bhandleClick
*/
export default function Header(props){
    return (
        <div className='container-header'>
            <div className='top-header'>
                <div className='left-header'>
                    {(props.licon && icons[props.licon]) &&
                        <button onClick={props.lhandleClick} >
                            {icons[props.licon]}
                        </button>
                    }
                </div>
                <div className='centre-header'>{props.children}</div>
                <div className='right-header'>
                    {(props.ricon && icons[props.ricon]) &&
                        <button onClick={props.rhandleClick} >
                            {icons[props.ricon]}
                        </button>
                    }
                </div>
            </div>
            {props.isBotton &&
                <div className='bottom-header'>
                    {(props.bicon && icons[props.bicon]) &&
                        <button className='btn-bottom-icon' onClick={props.bhandleClick} >
                            {icons[props.bicon]}
                        </button>
                    }
                    {(!props.bicon && props.btext) &&
                        <button className='btn-bottom-text' onClick={props.bhandleClick} >
                            {props.btext}
                        </button>
                    }
                </div>
            }
        </div>
    );
}