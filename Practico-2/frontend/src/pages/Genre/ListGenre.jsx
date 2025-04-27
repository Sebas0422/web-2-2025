import { Link } from 'react-router-dom';
import { useGetAllGenres } from '../../hook/useGenre';
import { ListGroup, Card, Spinner, Alert } from 'react-bootstrap';

export const ListGenre = () => {
  const { genres, loading, error } = useGetAllGenres();

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-5">
        Error: {error}
      </Alert>
    );
  }

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">List of Genres</h1>
      <ListGroup>
        {genres.map((genre) => (
          <Link to={`/gerns/${genre.id}`} key={genre.id} className="text-decoration-none">
            <ListGroup.Item key={genre.id} className="mb-3">
              <Card style={{ width: '18rem' }}>
                <Card.Img 
                  variant="top" 
                  src={genre.imagePath || 'https://via.placeholder.com/150'} 
                  alt={genre.name}
                />
                <Card.Body>
                  <Card.Title>{genre.name}</Card.Title>
                  <Card.Text>Explore the world of {genre.name} genres!</Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </div>
  );
};
