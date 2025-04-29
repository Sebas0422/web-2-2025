import { Link, useParams } from "react-router-dom";
import { useGetGenreById } from "../../hook/useGenre";
import { Alert, Card, Col, Spinner, Container } from "react-bootstrap";

const Genre = ({genre: genreProp}) => {
  const shouldFetch = !genreProp;
  const { id } = useParams();
  const { genre: genreData, loading, error } = useGetGenreById({ id, enable: shouldFetch });
  const genre = genreProp || genreData;

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Error: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Col key={genre.id} xs={12} sm={6} md={4} lg={3}>
      <Card className="h-100 shadow-sm">
        <Link to={`/gerns/${genre.id}`} className="text-decoration-none text-dark">
          <Card.Img 
            variant="top" 
            src={genre.imagePath || 'https://via.placeholder.com/150'}
            alt={genre.name}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title>{genre.name}</Card.Title>
            <Card.Text>Explore the world of {genre.name} genres!</Card.Text>
          </Card.Body>
        </Link>
      </Card>
  </Col>
  );
};

export default Genre;
