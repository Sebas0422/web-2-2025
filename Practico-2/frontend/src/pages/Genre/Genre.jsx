import { useParams } from "react-router-dom";
import { useGetGenreById } from "../../hook/useGenre";
import { Container, Row, Col, Card, Spinner, Alert, Button } from "react-bootstrap";

const Genre = () => {
  const { id } = useParams();
  const { genre, loading, error } = useGetGenreById(id);

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
        <strong>Error:</strong> {error}
      </Alert>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4">{genre.name}</Card.Title>
              <Card.Img
                variant="top"
                src={genre.imagePath || "https://via.placeholder.com/150"}
                alt={genre.name}
                className="img-fluid rounded mx-auto d-block mb-4"
              />
              <Card.Text className="text-center lead">
                Explore the world of <strong>{genre.name}</strong> genres!
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Button href="/" variant="primary" className="mt-3">
                  Back to Genres
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Genre;
