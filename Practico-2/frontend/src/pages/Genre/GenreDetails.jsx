import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetGenreById } from "../../hook/useGenre";
import { Alert, Container, Spinner, Row, Col, Card } from "react-bootstrap";
import ColorThief from 'colorthief';
import { Artist } from "../Artist/Artist";

import '../../genre.css';

export const GenreDetails = () => {
  const { id } = useParams();
  const { genre, loading, error } = useGetGenreById({ id });
  const [dominantColor, setDominantColor] = useState('#000');

  useEffect(() => {
    if (genre && genre.imagePath) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = `https://api.allorigins.win/raw?url=${genre.imagePath}`;

      img.onload = () => {
        const colorThief = new ColorThief();
        const color = colorThief.getColor(img);
        setDominantColor(`rgb(${color.join(",")})`);
      };
    }
  }, [genre]);

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
    <div className="genre-details">
      <div
        className="genre-header"
        style={{ backgroundColor: dominantColor }}
      >
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={4} className="d-flex justify-content-center">
              <img
                src={genre.imagePath}
                alt={genre.name}
                className="genre-image"
              />
            </Col>
            <Col xs={12} md={8}>
              <h2 className="genre-title">{genre.name}</h2>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="genre-artists">
        <h3 className="genre-artists-title">Artists:</h3>
        <Row>
          {genre.artists.map((artist) => (
            <Col key={artist.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="artist-card">
                <Card.Img
                  variant="top"
                  src={artist.photoPath || 'https://via.placeholder.com/150'}
                  alt={artist.name}
                  className="artist-image"
                />
                <Card.Body className="artist-card-body">
                  <Card.Title>{artist.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
