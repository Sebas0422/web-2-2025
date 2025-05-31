import { useGetAllGenres } from '../../hook/useGenre';
import { Container, Row, Spinner, Alert } from 'react-bootstrap';
import Genre from './Genre';

export const ListGenre = () => {
  const { genres, loading, error} = useGetAllGenres();
  console.log("Hola mundo");
  console.warn("Cuidado");
  console.error("Algo falló");
  const shouldButtons = true;


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
