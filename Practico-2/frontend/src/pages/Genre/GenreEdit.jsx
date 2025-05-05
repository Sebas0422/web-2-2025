import { useNavigate, useParams } from "react-router-dom";
import { useGetGenreById, useUpdateGenre } from "../../hook/useGenre";
import { useState, useEffect } from "react";
import {
  Container,
  Spinner,
  Alert,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const GenreEdit = ({create = false}) => {
  const { id } = useParams();
  const { genre, loading: loadingGetGenre, error: errorGetGenre } = useGetGenreById({ id });
  const { updateGenreId, loading: loadingUpdateGenre } = useUpdateGenre();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    imageFile: null,
    imagePreview: '',
  });

  useEffect(() => {
    if (genre) {
      setFormData({
        name: genre.name || '',
        imageFile: null,
        imagePreview: genre.imagePath || '',
      });
    }
  }, [genre]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToUpdate = {
      id,
      name: formData.name,
      imageFile: formData.imageFile,
    };
    console.log('dataToUpdate', dataToUpdate);
    if (create) {
      delete dataToUpdate.id;
    }else {
      updateGenreId(dataToUpdate);
    }
    navigate(`/`);
  };

  const renderImagePreview = () => {
    if (formData.imageFile) {
      return (
        <div className="mb-3 text-center">
          <img
            src={formData.imagePreview}
            alt="Vista previa"
            style={{ maxHeight: '200px', borderRadius: '8px' }}
          />
        </div>
      );
    }
    
    if (formData.imagePreview) {
      return (
        <div className="mb-3 text-center">
          <img
            src={`${API_URL}${formData.imagePreview}`}
            alt="Imagen del género"
            style={{ maxHeight: '200px', borderRadius: '8px' }}
          />
        </div>
      );
    }

    return null;
  };

  if (loadingGetGenre) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (errorGetGenre) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error: {errorGetGenre}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Editar Género</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="genreName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre del género"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="genreImage">
              <Form.Label>Seleccionar Imagen</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary" >
            {loadingUpdateGenre ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Guardar Cambios'
              )}
            </Button>
          </Col>

          <Col md={6}>{renderImagePreview()}</Col>
        </Row>
      </Form>
    </Container>
  );
};
