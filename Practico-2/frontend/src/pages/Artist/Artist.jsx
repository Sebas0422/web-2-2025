import { Button, Card, Col, Image } from 'react-bootstrap';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const Artist = ({ artist }) => {
  console.log('Artist', artist);
  return (
    <Col md={4} sm={6} xs={12} className="mb-4">
      <Card className="text-center shadow-sm h-100">
        <Card.Body>
          <Image
            src={`${API_URL}${artist.photoPath}`}
            alt={artist.name}
            roundedCircle
            fluid
            style={{ width: '120px', height: '120px', objectFit: 'cover', marginBottom: '10px' }}
          />
          <Card.Title>{artist.name}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" className="w-100" href={`/artists/${artist.id}`}>
            View Album
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};
