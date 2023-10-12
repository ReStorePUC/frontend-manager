import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

// reactstrap components
import { 
  Button, 
  Card,
  Container, 
  Row, 
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
} from "reactstrap";
import Select from 'react-select';

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

import api from "../../service/api"
import { getValue } from "../../service/storage"

const options = [
  { value: '1', label: 'Chapéus' },
  { value: '2', label: 'Cabelo' },
  { value: '3', label: 'Camiseta' },
  { value: '4', label: 'Camisa' },
  { value: '5', label: 'Calça' },
  { value: '6', label: 'Shorts' },
  { value: '7', label: 'Masculino' },
  { value: '8', label: 'Vestido' },
  { value: '9', label: 'Bonés' },
  { value: '10', label: 'Antigo' },
  { value: '11', label: 'Usado' },
  { value: '12', label: 'Novo' },
  { value: '13', label: 'Sapatos' },
  { value: '14', label: 'Sandálias' },
  { value: '15', label: 'Tênis' },
]

export default function New () {
  let { store_id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [size, setSize] = useState("");
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const saveProduct = async () => {
    try {
      const user = getValue()

      const formData = new FormData();
      Array.from(files).forEach(file => formData.append('files', file));

      const fRes = await api.post(`product/files`, 
      formData,
      {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });
      
      let images = []
      fRes.data.Files.map((f) => (
        images.push({
          image_path: `http://localhost:8000/product/view-file/${f}.png`
        })
      ))

      let cat = []
      categories.map((c) => (
        cat.push(c.label)
      ))

      await api.post(`product/private/product`, 
      {
        name: name,
        description: description,
        categories: cat.join(','),
        size: size,
        price: Number(price),
        tax: Number(tax),
        available: true,
        store_id: Number(store_id),
        images: images
      },
      {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });

      navigate('/loja')
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <>
      <DemoNavbar />
      <main className="profile-page">
        <section className="section section-lg section-shaped pb-300">
          {/* Circles background */}
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-white"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center align-items-center mt-4">
                  <Col lg="8">
                    <div className="text-center mt-5">
                      <h1>
                        Novo produto
                      </h1>
                      <Form role="form">
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <Input placeholder="Nome do produto" type="text" onChange={(e) => setName(e.target.value)} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <Input 
                              placeholder="Descrição" 
                              rows="5"
                              type="textarea"
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <Input placeholder="Preço" type="number"  onChange={(e) => setPrice(e.target.value)} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <Input placeholder="Frete" type="number"  onChange={(e) => setTax(e.target.value)} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <Input placeholder="Tamanho" type="text"  onChange={(e) => setSize(e.target.value)} />
                          </InputGroup>
                        </FormGroup>
                        <div className="mb-3">
                          <span>Categorias</span>
                          <Select
                            isMulti
                            name="Categorias"
                            options={options}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            styles={{
                              width: '100%'
                            }}
                            onChange={(e) => setCategories(e)}
                          />
                        </div>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <span>Fotos do produto</span>
                            <Input placeholder="Imagens" type="file" multiple onChange={(e) => setFiles(e.target.files)}/>
                          </InputGroup>
                        </FormGroup>
                      </Form>
                      <div className="py-4 mt-4">
                        <Button
                          color="default"
                          size="lg"
                          onClick={() => saveProduct()}
                        >
                          Salvar
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <DefaultFooter />
    </>
  );
}
