/**
 * The landing page of the web-app with a hero section that contains an image of movies, and a tag line
 */

import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import {
    Input,
    Button
} from 'reactstrap';

export function Root(): React.JSX.Element {
    return (
        <div>
            <div className="hero">
                <h1>Find your next piece of entertainment</h1>
                <p>The Entertainment Discovery Service uses The Movie Database API to help you filter what's popular, whats trending, and help you find what to watch next. Enter in the search bar below!</p>
            </div>
            <div className='search-section'>
                <Input
                    type="search"
                    onKeyDown={(e) => e.key === 'Enter' && console.log("Pressed!")}
                />
                <Button
                    color="primary"
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
            </div>
        </div>
    )
}

export default Root;