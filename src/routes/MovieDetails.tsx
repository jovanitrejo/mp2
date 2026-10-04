import {
    Container,
    Row,
    Col
} from 'reactstrap';
import type { MovieDetails } from '../types/Details';
import { useLoaderData } from 'react-router';

const IMAGE_BASE_URL: string = 'https://image.tmdb.org/t/p';

export function MovieDetails(): React.JSX.Element {
    const movie: MovieDetails = useLoaderData();
    return (
        <Container>
            <Row>
                <Col>
                    <h2>{movie.original_title}</h2>
                    <img 
                        src={`${IMAGE_BASE_URL}/w500/${movie.poster_path}`}
                    />
                </Col>
                <Col>
                    <p>{movie.tagline}</p>
                </Col>
            </Row>
        </Container>
    )
}