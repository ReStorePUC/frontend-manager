import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

import api from "../../service/api"
import { setValue } from "../../service/storage"

export default function Login() {
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const login = async () => {
    if (email === "" || password === "") {
      setError("Insira as credênciais");
      return;
    }
  
    try {
      const result = await api.post(`user/login`, {
        email: email,
        password: password,
      });
      if (!result.data.IsAdmin) {
        setError("Login invalido");
        return;
      }

      api.defaults.headers.Authorization = `Bearer ${result.data.JWT}`;

      setValue({
        JWT: result.data.JWT,
        IsMasterAdimin: email === 'matheus@email.com',
      });

      if (email === 'matheus@email.com') {
        navigate('/admin')
        return;
      }
      navigate('/loja')
    } catch (err) {
      setError("Erro no login, tente novamente!");
    }
  }
  
  return (
    <>
      <DemoNavbar isLogin/>
      <main>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            {error ? (
              <Alert color="danger">
                <strong>Erro!</strong> {error}
              </Alert>
            ) : null }
            
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      Login
                    </div>
                    <Form role="form" onSubmit={login}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input 
                            placeholder="E-mail" 
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)} 
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Senha"
                            type="password"
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)} 
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                          onClick={login}
                        >
                          Entrar
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <DefaultFooter />
    </>
  );
}
