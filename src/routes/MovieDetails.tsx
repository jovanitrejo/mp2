import {
    Container,
    Row,
    Col,
    Card,
    Button
} from 'reactstrap';
import type { MovieDetails } from '../types/Details';
import { useLoaderData, useSearchParams, Link } from 'react-router';
import type { movieLoader } from '../loaders/movieLoader';

export function MovieDetails(): React.JSX.Element {
    const {movie, prev, next} = useLoaderData<typeof movieLoader>();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query')
    
    const toDetails = (n: { id: number; page: number }) => `/details/${n.id}?query=${encodeURIComponent(query!)}&page=${n.page}`;

    return (
        <Container className='centered-page'>
            {
                query && (
                    <div className='mb-3'>
                        <Button tag={Link} to={`/search?${searchParams}`} color='secondary' outline>
                            Go Back
                        </Button>
                    </div>
                )
            }
            <Card className="p-3">
                <Row className='justify-content-center align-items-center g-4'>
                    <Col xs={12} md='auto' className='text-center text-md-start'>
                        <img
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                                    : 'https://placehold.co/185x278/1f2937/9ca3af/png?text=%3F'
                            }
                            alt={`${movie.title} poster`}
                            className='img-fluid'
                        />
                    </Col>
                    <Col xs={12} md={6} lg={5}>
                        <h2>{movie.title}</h2>
                        <p className='fst-italic'>{movie.tagline}</p>
                        <p>{movie.overview}</p>
                        <p><span className='fw-bold'>Released:</span> {movie.release_date}</p>
                        <p><span className='fw-bold'>Popularity:</span> {movie.popularity}</p>
                    </Col>
                </Row>
            </Card>
            <div className='d-flex justify-content-between mt-3'>
                <Button tag={Link} to={prev ? toDetails(prev) : '#'} disabled={!prev} color='primary' outline>
                    Previous
                </Button>
                <Button tag={Link} to={next ? toDetails(next) : '#'} disabled={!next} color='primary' outline>
                    Next
                </Button>
            </div>
        </Container>
    )
}