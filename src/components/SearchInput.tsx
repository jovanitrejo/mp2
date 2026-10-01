import {
    Form,
    useNavigation,
    useSearchParams
} from 'react-router';
import {
    Input,
    Button,
    Spinner,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchInput.module.css';

export function SearchInput() {
    const navigation = useNavigation();
    const [searchParams] = useSearchParams();
    const urlQuery = searchParams.get('query') ?? '';
    const isLoading: boolean = navigation.state !== 'idle';
    return (
        <Form className={styles.searchSection} action='/search' method='get'>
            <Input
                key={urlQuery}
                defaultValue={urlQuery}
                type='search'
                name='query'
                placeholder='Enter a movie title or TV series'
            />
            <Button
                color='primary'
                type='submit'
                className={styles.searchButton}
                disabled={isLoading}
            >
                {!isLoading ? <FontAwesomeIcon icon={faMagnifyingGlass} /> : <Spinner type='border' color='light' size='sm'></Spinner>}
            </Button>
        </Form>
    )
}

export default SearchInput;