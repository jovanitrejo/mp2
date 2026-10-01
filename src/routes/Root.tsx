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
    Button,
    Container,
    Row,
} from 'reactstrap';
import {
    Form
} from 'react-router';
import styles from './Root.module.css';

export function Root(): React.JSX.Element {
    return (
        <Container>
            <div className={styles.hero}>
                <Row>
                    <h1>Find your next piece of entertainment</h1>
                    <p>The Entertainment Discovery Service uses The Movie Database API to help you filter what's popular, whats trending, and help you find what to watch next. Enter in the search bar below!</p>
                </Row>
                <Form className={styles.searchSection} action='/search' method='get'>
                    <Input
                        type="search"
                        onKeyDown={(e) => e.key === 'Enter' && console.log("Pressed!")}
                        placeholder='Enter a movie title or TV series'
                    />
                    <Button
                        color="primary"
                        className={styles.searchButton}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                </Form>
            </div>
        </Container>
    )
}

export default Root;