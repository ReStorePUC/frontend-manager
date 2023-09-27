import React from "react";

// reactstrap components
import { 
  Button, 
  Card,
  CardBody, 
  Container, 
  Row, 
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  CardHeader,
  Form,
  FormGroup,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

class Profile extends React.Component {
  state = {};
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar signout />
        <main className="profile-page" ref="main">
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
                  <Row className="justify-content-center">
                    <Col lg="12">
                      <div className="text-center mt-5">
                        <h3>
                          Matheus Melo
                        </h3>
                        <div className="h6 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Rua Pedro Antônio Ruíz, 3-50, AP 94-B
                        </div>
                        <div className="h6 mt-4">
                          <i className="ni business_briefcase-24 mr-2" />
                          Vila Aviação, Bauru - SP
                        </div>
                        <div>
                          <i className="ni education_hat mr-2" />
                          17018-370
                        </div>
                        <div className="py-4 mt-lg-0">
                          <Button
                            color="default"
                            href="#pablo"
                            onClick={() => this.toggleModal("formUpdate")}
                            size="sm"
                          >
                            <span className="btn-inner--icon mr-1">
                              <i className="fa fa-pencil" />
                            </span>
                            Editar
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <div className="text-center mt-5">
                          <h2>
                            Meus Pedidos
                          </h2>
                        </div>
                        <Row className="wrapper mt-4">
                          <Col lg="12" sm="12">
                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-zoom-split-in" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Buscar por pedidos"
                                type="text"
                                onFocus={(e) => this.setState({ searchFocused: true })}
                                onBlur={(e) => this.setState({ searchFocused: false })}
                              />
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row className="wrapper mt-4 justify-content-center">
                          <Col lg="3" sm="12">
                            <Button
                              className="btn-white btn-icon mt-2"
                              color="default"
                              href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
                            >
                              <span className="btn-inner--icon mr-1">
                                <i className="fa fa-refresh" />
                              </span>
                              Preparando
                            </Button>
                          </Col>
                          <Col lg="3" sm="12">
                            <Button
                              className="btn-icon mt-2"
                              color="primary"
                              href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
                            >
                              <span className="btn-inner--icon mr-1">
                                <i className="fa fa-truck" />
                              </span>
                              Enviado
                            </Button>
                          </Col>
                          <Col lg="3" sm="12">
                            <Button
                              className="btn-icon mt-2"
                              color="info"
                              href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
                            >
                              <span className="btn-inner--icon mr-1">
                                <i className="fa fa-check" />
                              </span>
                              Entregue
                            </Button>
                          </Col>
                        </Row>
                        <div className="mt-5">
                          <Card className="shadow border-0 mt-2">
                            <CardBody className="py-3">
                              <Row>
                                <Col lg="4">
                                  <img
                                    alt="..."
                                    className="img-center img-fluid shadow shadow-lg--hover"
                                    src={require("assets/img/theme/team-4-800x800.jpg")}
                                    style={{ width: "100px" }}
                                  />
                                </Col>
                                <Col lg="8">
                                  <h6 className="text-primary text-uppercase">
                                    Chapéu bonito
                                  </h6>
                                  <p className="description mt-3">
                                    Um chapéu muito bonito que combina com qualquer
                                    roupa. Prende bem à cabeça para não voar com o
                                    vento.
                                  </p>
                                  <Button
                                    className="btn-white btn-icon"
                                    color="default"
                                    onClick={() => this.toggleModal("modalPreparing")}
                                  >
                                    <span className="btn-inner--icon mr-1">
                                      <i className="fa fa-refresh" />
                                    </span>
                                    Preparando
                                  </Button>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                          <Card className="shadow border-0 mt-2">
                            <CardBody className="py-3">
                              <Row>
                                <Col lg="4">
                                  <img
                                    alt="..."
                                    className="img-center img-fluid shadow shadow-lg--hover"
                                    src={require("assets/img/theme/team-4-800x800.jpg")}
                                    style={{ width: "100px" }}
                                  />
                                </Col>
                                <Col lg="8">
                                  <h6 className="text-primary text-uppercase">
                                    Chapéu bonito
                                  </h6>
                                  <p className="description mt-3">
                                    Um chapéu muito bonito que combina com qualquer
                                    roupa. Prende bem à cabeça para não voar com o
                                    vento.
                                  </p>
                                  <Button
                                    className="btn-white btn-icon"
                                    color="default"
                                    onClick={() => this.toggleModal("modalPreparing")}
                                  >
                                    <span className="btn-inner--icon mr-1">
                                      <i className="fa fa-refresh" />
                                    </span>
                                    Preparando
                                  </Button>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                          <Card className="shadow border-0 mt-2">
                            <CardBody className="py-3">
                              <Row>
                                <Col lg="4">
                                  <img
                                    alt="..."
                                    className="img-center img-fluid shadow shadow-lg--hover"
                                    src={require("assets/img/theme/team-4-800x800.jpg")}
                                    style={{ width: "100px" }}
                                  />
                                </Col>
                                <Col lg="8">
                                  <h6 className="text-primary text-uppercase">
                                    Chapéu bonito
                                  </h6>
                                  <p className="description mt-3">
                                    Um chapéu muito bonito que combina com qualquer
                                    roupa. Prende bem à cabeça para não voar com o
                                    vento.
                                  </p>
                                  <Button
                                    className="btn-icon"
                                    color="primary"
                                    onClick={() => this.toggleModal("modalTransport")}
                                  >
                                    <span className="btn-inner--icon mr-1">
                                      <i className="fa fa-truck" />
                                    </span>
                                    Enviado
                                  </Button>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                          <Card className="shadow border-0 mt-2">
                            <CardBody className="py-3">
                              <Row>
                                <Col lg="4">
                                  <img
                                    alt="..."
                                    className="img-center img-fluid shadow shadow-lg--hover"
                                    src={require("assets/img/theme/team-4-800x800.jpg")}
                                    style={{ width: "100px" }}
                                  />
                                </Col>
                                <Col lg="8">
                                  <h6 className="text-primary text-uppercase">
                                    Chapéu bonito
                                  </h6>
                                  <p className="description mt-3">
                                    Um chapéu muito bonito que combina com qualquer
                                    roupa. Prende bem à cabeça para não voar com o
                                    vento.
                                  </p>
                                  <Button
                                    className="btn-icon"
                                    color="primary"
                                    onClick={() => this.toggleModal("modalTransport")}
                                  >
                                    <span className="btn-inner--icon mr-1">
                                      <i className="fa fa-truck" />
                                    </span>
                                    Enviado
                                  </Button>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                          <Card className="shadow border-0 mt-2">
                            <CardBody className="py-3">
                              <Row>
                                <Col lg="4">
                                  <img
                                    alt="..."
                                    className="img-center img-fluid shadow shadow-lg--hover"
                                    src={require("assets/img/theme/team-4-800x800.jpg")}
                                    style={{ width: "100px" }}
                                  />
                                </Col>
                                <Col lg="8">
                                  <h6 className="text-primary text-uppercase">
                                    Chapéu bonito
                                  </h6>
                                  <p className="description mt-3">
                                    Um chapéu muito bonito que combina com qualquer
                                    roupa. Prende bem à cabeça para não voar com o
                                    vento.
                                  </p>
                                  <Button
                                    className="btn-icon"
                                    color="info"
                                    onClick={() => this.toggleModal("modalDone")}
                                  >
                                    <span className="btn-inner--icon mr-1">
                                      <i className="fa fa-check" />
                                    </span>
                                    Entregue
                                  </Button>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        </div>
                        <div className="mt-5">
                          <Pagination>
                            <PaginationItem>
                              <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fa fa-angle-left" />
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fa fa-angle-right" />
                              </PaginationLink>
                            </PaginationItem>
                          </Pagination>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Container>
          </section>

          <Modal
            className="modal-dialog-centered"
            isOpen={this.state.modalPreparing}
            toggle={() => this.toggleModal("modalPreparing")}
          >
            <div className="modal-header">
              <h6 className="modal-title" id="modal-title-default">
                Preparando
              </h6>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("modalPreparing")}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <Card className="shadow border-0">
                <CardBody className="py-3">
                  <h3 className="text-primary text-uppercase">
                    Chapéu bonito
                  </h3>
                  <p className="description mt-3">
                    Um chapéu muito bonito que combina com qualquer
                    roupa. Prende bem à cabeça para não voar com o
                    vento.
                  </p>
                  <h6 className="text-primary">
                    Dados do Pedido
                  </h6>
                  <p className="description mt-3">
                    #12345 - 05/09/2023 - 20:30
                  </p>
                  <p className="description mt-3">
                    Seu pedido está sendo preparado pelo vendor e logo sairá para entrega!
                  </p>
                </CardBody>
              </Card>
            </div>
          </Modal>
          <Modal
            className="modal-dialog-centered"
            isOpen={this.state.modalTransport}
            toggle={() => this.toggleModal("modalTransport")}
          >
            <div className="modal-header">
              <h6 className="modal-title" id="modal-title-default">
                Enviado
              </h6>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("modalTransport")}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <Card className="shadow border-0">
                <CardBody className="py-3">
                  <h3 className="text-primary text-uppercase">
                    Chapéu bonito
                  </h3>
                  <p className="description mt-3">
                    Um chapéu muito bonito que combina com qualquer
                    roupa. Prende bem à cabeça para não voar com o
                    vento.
                  </p>
                  <h6 className="text-primary">
                    Dados do Pedido
                  </h6>
                  <p className="description mt-3">
                    #12345 - 05/09/2023 - 20:30
                  </p>
                  <p className="description mt-3">
                    Seu pedido está a caminho! Acompanhe pelo código de entrega BR123456HG
                  </p>
                </CardBody>
              </Card>
            </div>
          </Modal>
          <Modal
            className="modal-dialog-centered"
            isOpen={this.state.modalDone}
            toggle={() => this.toggleModal("modalDone")}
          >
            <div className="modal-header">
              <h6 className="modal-title" id="modal-title-default">
                Entregue
              </h6>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("modalDone")}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <Card className="shadow border-0">
                <CardBody className="py-3">
                  <h3 className="text-primary text-uppercase">
                    Chapéu bonito
                  </h3>
                  <p className="description mt-3">
                    Um chapéu muito bonito que combina com qualquer
                    roupa. Prende bem à cabeça para não voar com o
                    vento.
                  </p>
                  <h6 className="text-primary">
                    Dados do Pedido
                  </h6>
                  <p className="description mt-3">
                    #12345 - 05/09/2023 - 20:30
                  </p>
                  <p className="description mt-3">
                    Seu pedido foi entregue, aproveite!
                  </p>
                </CardBody>
              </Card>
            </div>
          </Modal>
          <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={this.state.formUpdate}
            toggle={() => this.toggleModal("formUpdate")}
          >
            <div className="modal-body p-0">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-white pb-5">
                  <div className="text-muted text-center">
                    Atualizar dados
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Nome" type="text" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="E-mail" type="email" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-address-book" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Endereço" type="text" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-address-book" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Bairro" type="text" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-home" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="CEP" type="text" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-home" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Cidade" type="text" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-home" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Estado" type="text" />
                      </InputGroup>
                    </FormGroup>
                    <Row className="my-4">
                      <Col xs="12">
                        <div className="custom-control custom-control-alternative custom-checkbox">
                        </div>
                      </Col>
                    </Row>
                    <div className="text-center">
                      <Button
                        className="mt-2"
                        color="primary"
                        type="button"
                      >
                        Atualizar
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Modal>
        </main>
        <DefaultFooter />
      </>
    );
  }
}

export default Profile;
