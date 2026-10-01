import {
    Row,
    Col,
    Container
} from 'reactstrap';
import SearchInput from '../components/SearchInput';

export function Search(): React.JSX.Element {
    
    return (
        <Container>
            <Row>
                <Col>
                    <SearchInput />
                </Col>
            </Row>
        </Container>
    )
}

export default Search;