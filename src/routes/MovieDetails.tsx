import {
    Container,
    Row,
    Col,
    Card
} from 'reactstrap';
import type { MovieDetails } from '../types/Details';
import { useLoaderData } from 'react-router';

export function MovieDetails(): React.JSX.Element {
    const movie: MovieDetails = useLoaderData();
    return (
        <Container className='centered-page'>
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
        </Container>
    )
}