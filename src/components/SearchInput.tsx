import {
    Form,
    useNavigation,
    useSearchParams,
    useSubmit
} from 'react-router';
import {
    Input,
    Button,
    Spinner,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchInput.module.css';
import { useEffect, useRef } from 'react';

const DEBOUNCE_MS = 300;

export function SearchInput({live = false}: {live?: boolean}) {
    const navigation = useNavigation();
    const submit = useSubmit();
    const [searchParams] = useSearchParams();
    const urlQuery = searchParams.get('query') ?? '';
    const isLoading: boolean = navigation.state !== 'idle';
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<number | undefined>(undefined)

    useEffect(() => {
        const input = inputRef.current
        if (input && document.activeElement !== input) {
            input.value = urlQuery;
        }
    }, [urlQuery]);

    useEffect(() => () => clearTimeout(debounceRef.current), [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!live) return;
        const form = event.currentTarget.form;
        clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
            submit(form, {replace: true});
        }, DEBOUNCE_MS);
    }

    return (
        <Form className={styles.searchSection} action='/search' method='get'>
            <Input
                innerRef={inputRef}
                defaultValue={urlQuery}
                type='search'
                name='query'
                onChange={handleChange}
                placeholder='Enter a movie title'
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