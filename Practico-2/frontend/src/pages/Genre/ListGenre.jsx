import { useGetAllGenres } from '../../hook/useGenre';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import Genre from './Genre';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const ListGenre = () => {
  const { genres, loading, error, refetch } = useGetAllGenres();
  const navigate = useNavigate();
  const shouldButtons = true;
  
  useEffect(() => {
    refetch();
  }, [navigate]);


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
    <Container className="mt-5">
      <h1 className="text-center mb-4">List of Genres</h1>
      <Row className="g-4">
        {genres.map((genre) => (
          <Genre key={genre.id} genre={genre} shouldButtons={shouldButtons}/>
        ))}
      </Row>
    </Container>
  );
};
