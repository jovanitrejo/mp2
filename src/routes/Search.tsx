import {
    Row,
    Col,
    Container,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Card,
    CardBody,
    CardTitle,
    CardImg,
    ButtonGroup,
    Button,
    Input
} from 'reactstrap';
import SearchInput from '../components/SearchInput';
import { useLoaderData, useSearchParams, useNavigate, type NavigateFunction } from 'react-router';
import type Movie from '../types/Movie';
import type { searchLoader } from '../loaders/searchLoader';
import type TMBDResponse from '../types/TMDBResponse';
import styles from './Search.module.css';
import { useMemo, useState } from 'react';

type SortKey = 'title' | 'release_date' | 'popularity' | 'vote_average';

const SORT_OPTIONS: {key: SortKey; label: string}[] = [
    {key: 'title', label: 'Title'},
    {key: 'release_date', label: 'Release Date'},
    {key: 'popularity', label: 'Popularity'},
    {key: 'vote_average', label: 'Rating'},
];

function compareMovies(a: Movie, b: Movie, key: SortKey): number {
    switch (key) {
        case 'title':
        case 'release_date':
            return a[key].localeCompare(b[key]);
        default:
            return a[key] - b[key];
    }
}

function ListView({movies}: {movies: TMBDResponse<Movie>}): React.JSX.Element {
    const [searchParams] = useSearchParams();
    const navigate: NavigateFunction = useNavigate();
    return (
        <Table
            hover
        >
            <thead>
                <tr>
                    <th>Movie</th>
                    <th>Language</th>
                    <th>Release Date</th>
                    <th>Rank</th>
                </tr>
            </thead>
            <tbody>
                {
                    movies.results.map(
                        movie =>
                        (
                            <tr
                                key={movie.id}
                                onClick={() => navigate(`/details/${movie.id}?${searchParams}`)}
                                className={styles.clickable}
                            >
                                <td>
                                    {movie.title}
                                </td>
                                <td>
                                    {movie.original_language}
                                </td>
                                <td>
                                    {movie.release_date}
                                </td>
                                <td>
                                    {movie.popularity}
                                </td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </Table>
    )
}

function GalleryView({ movies }: { movies: TMBDResponse<Movie> }): React.JSX.Element {
    const [searchParams] = useSearchParams();
    const navigate: NavigateFunction = useNavigate();
    return (
        <Row>
            {movies.results.map((movie) => (
                <Col
                    key={movie.id}
                    xs="6"
                    sm="4"
                    md="3"
                    lg="2"
                    className="mb-4"
                >
                    <Card
                        className={styles.clickable}
                        onClick={() => navigate(`/details/${movie.id}?${searchParams}`)}
                    >
                        <CardImg
                            top
                            src={
                                movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : 'https://placehold.co/500x750/1f2937/9ca3af/png?text=%3F'
                            }
                            alt={movie.title}
                        />

                        <CardBody>
                            <CardTitle tag="h6">
                                {movie.title}
                            </CardTitle>
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}


export function Search(): React.JSX.Element {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlQuery = searchParams.get('query') ?? '';
    const emptyQuery: boolean = urlQuery === '';
    const data = useLoaderData<typeof searchLoader>();
    const movies = data?.movies;
    const genres = data?.genres ?? [];
    const sortParam = searchParams.get('sort');
    const sortKey = SORT_OPTIONS.find(o => o.key === sortParam)?.key ?? null;
    const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';
    const selectedGenre = Number(searchParams.get('genre')) || null;
    const [viewMode, setViewMode] = useState<'list' | 'gallery'>('list');
    
    const filteredMovies = useMemo(() => {
        if (!movies) return movies;
        let results = selectedGenre === null
            ? movies.results
            : movies.results.filter(m => m.genre_ids.includes(selectedGenre));
        if (sortKey) {
            const direction = order === 'asc' ? 1 : -1;
            results = [...results].sort((a, b) => compareMovies(a, b, sortKey) * direction);
        }
        return { ...movies, results };
    }, [movies, selectedGenre, sortKey, order]);

    const updateParam = (name: string, value: string) => {
        const next = new URLSearchParams(searchParams);
        if (value) next.set(name, value);
        else next.delete(name);
        setSearchParams(next);
    };

    const pageStart: number = movies !== undefined
        ? movies.page - ((movies.page - 1) % 5)
        : 1;

    const pageNumbers: number[] = movies !== undefined
        ? Array.from(
            { length: Math.max(0, Math.min(5, movies.total_pages - pageStart + 1)) },
            (_, index) => pageStart + index
        )
        : [];
    const handlePageChange = (pageNumber: number) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("page", pageNumber.toString());
        setSearchParams(currentParams);
    }

    return (
        <Container className={movies ? undefined : 'centered-page'}>
            <Row className='mb-3'>
                <Col>
                    {
                        emptyQuery &&
                        <>
                            <h2>Search</h2>
                            <p>Enter a query to find a movie below.</p>
                        </>
                    }
                    <SearchInput live />
                </Col>
            </Row>
            {
                movies &&
                (
                    movies.results.length !== 0 ?
                    (
                            (
                                <Row>
                                    <div className='d-flex justify-content-between mb-3 gap-2'>
                                        <div className='d-flex gap-2'>
                                            <Input
                                                type='select'
                                                value={selectedGenre ?? ''}
                                                onChange={e => updateParam('genre', e.target.value)}
                                                className={styles.maxWidth}
                                            >
                                                <option value=''>All genres</option>
                                                {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                                            </Input>
                                            <Input
                                                type='select'
                                                value={sortKey ?? ''}
                                                onChange={e => updateParam('sort', e.target.value)}
                                                className={styles.maxWidth}
                                            >
                                                <option value=''>Relevance</option>
                                                {SORT_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
                                            </Input>
                                            <Button
                                                color='secondary'
                                                outline
                                                disabled={!sortKey}
                                                onClick={() => updateParam('order', order === 'asc' ? 'desc' : 'asc')}
                                            >
                                                {order === 'asc' ? 'Ascending' : 'Descending'}
                                            </Button>
                                        </div>
                                        <ButtonGroup>
                                            <Button
                                                onClick={() => setViewMode('list')}
                                                color='primary'
                                                active={viewMode === 'list'}
                                                outline
                                            >
                                                List
                                            </Button>
                                            <Button
                                                onClick={() => setViewMode('gallery')}
                                                color='primary'
                                                active={viewMode === 'gallery'}
                                                outline
                                            >
                                                Gallery
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                    {
                                        filteredMovies && filteredMovies.results.length === 0 ?
                                            <div className="d-flex justify-content-center">
                                                <p>No movies in this genre on this page...</p>
                                            </div>
                                            : viewMode === 'list' ?
                                                <ListView movies={filteredMovies ?? movies} />
                                                :
                                                <GalleryView movies={filteredMovies ?? movies} />
                                    }
                                    <div
                                        className="d-flex justify-content-center"
                                    >
                                        <Pagination size="">
                                            <PaginationItem
                                                disabled={movies.page === 1}
                                            >
                                                <PaginationLink
                                                    first
                                                    onClick={() => handlePageChange(1)}
                                                />
                                            </PaginationItem>
                                            <PaginationItem
                                                disabled={movies.page === 1}
                                            >
                                                <PaginationLink
                                                    onClick={() => handlePageChange(movies.page - 1)}
                                                    previous
                                                />
                                            </PaginationItem>
                                            {
                                                pageNumbers.map((pageNumber) => (
                                                    <PaginationItem key={pageNumber} active={pageNumber === movies.page}>
                                                        <PaginationLink
                                                            onClick={() => handlePageChange(pageNumber)}
                                                        >
                                                            {pageNumber}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                ))
                                            }
                                            <PaginationItem
                                                disabled={movies.page >= movies.total_pages}
                                            >
                                                <PaginationLink
                                                    onClick={() => handlePageChange(movies.page + 1)}
                                                    next
                                                />
                                            </PaginationItem>
                                            <PaginationItem
                                                disabled={movies.page >= movies.total_pages}
                                            >
                                                <PaginationLink
                                                    onClick={() => handlePageChange(movies.total_pages)}
                                                    last
                                                />
                                            </PaginationItem>
                                        </Pagination>
                                    </div>
                                </Row>
                            )
                    ) :
                    (
                        <div className="d-flex justify-content-center">
                            <p>No results found...</p>
                        </div>
                    )
                )
            }
        </Container>
    )
}

export default Search;