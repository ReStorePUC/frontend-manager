import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

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

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

import api from "../../service/api"
import { getValue } from "../../service/storage"

export default function Register () {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [block, setBlock] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState(null);
  const navigate = useNavigate();

  const saveStore = async () => {
    try {
      const user = getValue()

      console.log(files)
      const formData = new FormData();
      formData.append('file', files);

      console.log(formData)

      const fRes = await api.post(`user/file`, 
      formData,
      {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });
      const image_path = `http://localhost:8000/user/view-file/${fRes.data.File}.png`
      
      await api.post(`user/private/store`, 
      {
        user: {
          email: email,
          password: password,
          is_admin: true
        },
        name: name,
        address: address,
        block: block,
        city: city,
        state: state,
        photo_path: image_path
      },
      {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });

      navigate('/admin')
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
                        Nova loja
                      </h1>
                      <Form role="form">
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <Input placeholder="Nome da loja" type="text" onChange={(e) => setName(e.target.value)}/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <Input placeholder="Endereço" type="text" onChange={(e) => setAddress(e.target.value)}/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <Input placeholder="Bairro" type="text" onChange={(e) => setBlock(e.target.value)}/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <Input placeholder="Cidade" type="text" onChange={(e) => setCity(e.target.value)}/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <Input placeholder="Estado" type="text" onChange={(e) => setState(e.target.value)}/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <span>Foto da loja</span>
                            <Input placeholder="Imagens" type="file" onChange={(e) => setFiles(e.target.files[0])} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <Input placeholder="E-mail" type="email" onChange={(e) => setEmail(e.target.value)}/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Senha"
                              type="password"
                              autoComplete="off"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Form>
                      <div className="py-4 mt-4">
                        <Button
                          color="default"
                          size="lg"
                          onClick={()=>saveStore()}
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
