import { Link, useParams } from "react-router-dom";
import { useGetGenreById } from "../../hook/useGenre";
import { Alert, Card, Col, Spinner, Container } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Genre = ({ genre: genreProp, shouldButtons }) => {
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
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Col key={genre.id} xs={12} sm={6} md={4} lg={3}>
      <Card className="h-100 shadow-sm">
        <Link to={`/gerns/${genre.id}`} className="text-decoration-none text-dark">
          <Card.Img
            variant="top"
            src={`${API_URL}${genre.imagePath}` || '/image/default-genre.jpg'}
            alt={genre.name}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Body className="flex-grow-1">
            <Link to={`/gerns/${genre.id}`} className="text-decoration-none text-dark">
              <Card.Title>{genre.name}</Card.Title>
              <Card.Text style={{ minHeight: '48px', maxHeight: '48px', overflow: 'hidden' }}>
                Explore the world of {genre.name} genres!
              </Card.Text>
            </Link>
          </Card.Body>
        </Link>
        {shouldButtons && (
          <Card.Footer>
            <div className="d-flex justify-content-between mt-2">
              <Link to={`/gerns/${genre.id}`} className="btn btn-danger">Delete</Link>
              <Link to={`/gerns/${genre.id}/edit`} className="btn btn-primary">Edit</Link>
            </div>
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
};

export default Genre;
