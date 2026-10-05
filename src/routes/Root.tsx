/**
 * The landing page of the web-app with a hero section that contains an image of movies, and a tag line
 */
import {
    Container,
    Row,
} from 'reactstrap';
import SearchInput from '../components/SearchInput';
import styles from './Root.module.css';

export function Root(): React.JSX.Element {
    return (
        <section className={styles.heroBackground}>
            <Container className='centered-page'>
                <div>
                    <Row className={styles.hero}>
                        <h1>Find your next piece of entertainment</h1>
                        <p>The Entertainment Discovery Service uses The Movie Database API to help you filter what's popular, whats trending, and help you find what to watch next. Enter in the search bar below!</p>
                        <SearchInput />
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default Root;