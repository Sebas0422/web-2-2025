import React from 'react';
import { Card, Spinner, Alert, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetAllArtistsByGenreId } from '../../hook/useArtist';

const Artist = ({ artists: propArtists }) => {
  const shouldFetch = !propArtists;
  const { artists: fetchedArtists, loading, error } = useGetAllArtistsByGenreId({ enabled: shouldFetch });
  const artists = propArtists || fetchedArtists;

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
    <Container fluid className="bg-dark text-light min-vh-100 py-5">
      <h1 className="text-center mb-5" style={{ fontWeight: 'bold' }}>Artists</h1>
      {artists.length === 0 ? (
        <p className="text-center">No artists available.</p>
      ) : (
        <Row className="g-4 px-4">
          {artists.map((artist) => (
            <Col key={artist.id} xs={6} sm={4} md={3} lg={2}>
              <Link to={`/artists/${artist.id}`} className="text-decoration-none text-light">
                <Card className="bg-dark border-0 text-center hover-card">
                  <Card.Img
                    variant="top"
                    src={artist.photoPath || 'https://via.placeholder.com/300'}
                    alt={artist.name}
                    style={{
                      borderRadius: '50%',
                      width: '100%',
                      height: 'auto',
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      marginBottom: '10px',
                    }}
                  />
                  <Card.Body className="p-2">
                    <Card.Title style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                      {artist.name}
                    </Card.Title>
                    <Card.Text style={{ fontSize: '0.8rem', color: '#b3b3b3' }}>
                      {artist.genre?.name || 'No genre'}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Artist;
