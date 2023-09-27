import React, { useState, useEffect } from "react";
import classnames from "classnames";
import ReactDatetime from "react-datetime";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";

// reactstrap components
import { 
  Button, 
  Card,
  CardBody, 
  Container, 
  Row, 
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import api from "../../service/api"
import { getValue } from "../../service/storage"

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

export default function Store() {
  const [plainTabs, setPlainTabs] = useState(1);
  const [selectDate, setSelectDate] = useState({});
  const [modal, setModals] = useState({});
  const [store, setStore] = useState({});
  const [products, setProducts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [payments, setPayments] = useState([]);
  const [status, setStatus] = useState("");
  const [track, setTrack] = useState("");
  const [pix, setPix] = useState("");
  const [modalProduct, setModalProduct] = useState(null);
  const [modalDeleteProduct, setModalDeleteProduct] = useState(null);

  const navigate = useNavigate();

  const toggleNavs = (e, state, index) => {
    e.preventDefault();
    setPlainTabs(index);
  };
  const toggleModal = (state, product) => {
    setModalProduct(product)
    setModals({
      [state]: !modal[state],
    });
  };
  const toggleModalDelete = (state, product) => {
    setModalDeleteProduct(product)
    setModals({
      [state]: !modal[state],
    });
  };

  const getData = async () => {
    try {
      const user = getValue()

      const result = await api.get(`user/private/self/store`, {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });
      setStore(result.data);  
      getProducts(result.data.id);
      getRequests(result.data.id);
      getPayments(result.data.id);
    } catch (err) {
    }
  }

  const getProducts = async (id, name = "") => {
    try {
      const user = getValue()

      const result = await api.get(`product/product/store/${id}?name=${name}`, {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });
      setProducts(result.data);
    } catch (err) {
    }
  }

  const getPayments = async (id) => {
    try {
      const user = getValue()

      const result = await api.get(`shop/private/payment/store/${id}`, {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });
      setPayments(result.data);
    } catch (err) {
    }
  }

  const getRequests = async (id) => {
    try {
      const user = getValue()

      let route = `shop/private/request/search/${id}?`

      if (status !== "") {
        route = route + `status=${status}&`
      }
      if (selectDate.startDate) {
        console.log(selectDate)
        route = route + `initialDate=${format(new Date(selectDate.startDate._d + ""), 'yyyy-MM-dd')+'T'+format(new Date(selectDate.startDate._d + ""), 'hh:mm:ss')+"Z"}`
      }
      if (selectDate.endDate) {
        route = route + `endDate=${format(new Date(selectDate.endDate._d + ""), 'yyyy-MM-dd')+'T'+format(new Date(selectDate.endDate._d + ""), 'hh:mm:ss')+"Z"}`
      }
      const result = await api.get(route, {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });
      setRequests(result.data)
    } catch (err) {
    }
  }

  const updatePreparing = async (id) => {
    try {
      const user = getValue()

      await api.put(`shop/private/request/${id}`, 
      {
        status: "sent",
        track: track,
      },
      {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });
      navigate(0)
    } catch (err) {
    }
  }

  const requestPayment = async (id) => {
    try {
      const user = getValue()

      await api.put(`shop/private/request/${id}`, 
      {
        status: "received",
      },
      {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });

      await api.post(`shop/private/payment`, 
      {
        total: modalProduct.product.price + modalProduct.product.tax,
        pix: pix,
        status: "requested",
        store_id: modalProduct.store_id,
        product_id: modalProduct.product_id
      },
      {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });
      navigate(0)
    } catch (err) {
    }
  }

  const deleteItem = async () => {
    try {
      const user = getValue()

      await api.post(`product/private/unavailable/${modalDeleteProduct.id}`, 
      {},
      {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });
      navigate(0)
    } catch (err) {
    }
  }

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (store !== {} && store.id !== undefined) {
      getRequests(store.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, selectDate]);

  const handleReactDatetimeChange = (who, date) => {
    if (
      selectDate.startDate &&
      who === "endDate" &&
      new Date(selectDate.startDate._d + "") > new Date(date._d + "")
    ) {
      setSelectDate({
        startDate: date,
        endDate: date,
      });
    } else if (
      selectDate.endDate &&
      who === "startDate" &&
      new Date(selectDate.endDate._d + "") < new Date(date._d + "")
    ) {
      setSelectDate({
        startDate: date,
        endDate: date,
      });
    } else {
      setSelectDate({
        [who]: date,
      });
    }
  };
  
  const getClassNameReactDatetimeDays = (date) => {
    if (selectDate.startDate && selectDate.endDate) {
    }
    if (
      selectDate.startDate &&
      selectDate.endDate &&
      selectDate.startDate._d + "" !== selectDate.endDate._d + ""
    ) {
      if (
        new Date(selectDate.endDate._d + "") > new Date(date._d + "") &&
        new Date(selectDate.startDate._d + "") < new Date(date._d + "")
      ) {
        return " middle-date";
      }
      if (selectDate.endDate._d + "" === date._d + "") {
        return " end-date";
      }
      if (selectDate.startDate._d + "" === date._d + "") {
        return " start-date";
      }
    }
    return "";
  };

  return (
    <>
      <DemoNavbar isAdmin />
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
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={store?.photo_path}
                        />
                      </a>
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      <Button
                        className="float-right"
                        color="default"
                        onClick={() => toggleModal("modalPayments")}
                        size="sm"
                      >
                        Ver pagamentos
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1 mt-sm-6" lg="4">
                    <div className="text-center mt-4">
                      <h3>
                        {store?.name}
                      </h3>
                      <div className="h6 font-weight-300">
                        <i className="ni location_pin mr-2" />
                        {store?.address}
                      </div>
                      <div className="h6 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />
                        {store?.block}
                      </div>
                      <div>
                        <i className="ni education_hat mr-2" />
                        {store?.city}, {store?.state}
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="mt-2 py-5 border-top text-center">
                  <div className="nav-wrapper">
                    <Nav
                      className="nav-fill flex-column flex-md-row"
                      id="tabs-icons-text"
                      pills
                      role="tablist"
                    >
                      <NavItem>
                        <NavLink
                          aria-selected={plainTabs === 1}
                          className={classnames("mb-sm-3 mb-md-0", {
                            active: plainTabs === 1,
                          })}
                          onClick={(e) => toggleNavs(e, "plainTabs", 1)}
                          role="tab"
                        >
                          Produtos
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          aria-selected={plainTabs === 2}
                          className={classnames("mb-sm-3 mb-md-0", {
                            active: plainTabs === 2,
                          })}
                          onClick={(e) => toggleNavs(e, "plainTabs", 2)}
                          href="#pablo"
                          role="tab"
                        >
                          Vendas
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                  <TabContent activeTab={"plainTabs" + plainTabs}>
                    <TabPane tabId="plainTabs1">
                      <Row className="justify-content-center">
                        <Col lg="9">
                          <div className="text-center mt-5">
                            <h2>
                              Produtos
                            </h2>
                          </div>
                          <Row className="wrapper mt-4">
                            <Col lg="6" sm="6">
                              <InputGroup className="mb-4">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-zoom-split-in" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder="Buscar por produtos"
                                  type="text"
                                  onChange={(e) => getProducts(store.id, e.target.value)}
                                />
                              </InputGroup>
                            </Col>
                            <Col lg="6" sm="6">
                              <Button
                                className="btn-icon"
                                color="primary"
                                href={`/novo/${store.id}`}
                              >
                                <span className="btn-inner--icon mr-1">
                                  <i className="fa fa-plus" />
                                </span>
                                Cadastrar produto
                              </Button>
                            </Col>
                          </Row>
                          <div className="mt-5">
                            {products.map((p) => {
                              return (<Card className="shadow border-0 mt-2">
                                <CardBody className="py-3">
                                  <Row>
                                    <Col lg="4">
                                      <img
                                        alt="..."
                                        className="img-center img-fluid shadow shadow-lg--hover"
                                        src={p.images[0].image_path}
                                        style={{ width: "100px" }}
                                      />
                                    </Col>
                                    <Col lg="8">
                                      <h6 className="text-primary text-uppercase">
                                        {p.name}
                                      </h6>
                                      <p className="description mt-3">
                                        {p.description}
                                      </p>
                                      <Row>
                                        <Col>
                                          <Button
                                            className="btn-icon"
                                            color="danger"
                                            onClick={() => toggleModalDelete("confirmDelete", p)}
                                          >
                                            Remover item
                                          </Button>
                                        </Col>
                                        <Col>
                                          <Button
                                            className="btn-icon"
                                            color="info"
                                            href={`/produto/${p.id}`}
                                          >
                                            Ver detalhes
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                </CardBody>
                              </Card>)
                            })}
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="plainTabs2">
                      <Row className="justify-content-center">
                        <Col lg="9">
                          <div className="text-center mt-5">
                            <h2>
                              Vendas
                            </h2>
                          </div>
                          <Row className="wrapper mt-4">
                            <Col lg="6">
                              <FormGroup>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="ni ni-calendar-grid-58" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <ReactDatetime
                                    inputProps={{
                                      placeholder: "Start Date",
                                    }}
                                    value={selectDate.startDate}
                                    timeFormat={false}
                                    onChange={(e) =>
                                      handleReactDatetimeChange("startDate", e)
                                    }
                                    renderDay={(props, currentDate, selectedDate) => {
                                      let classes = props.className;
                                      classes +=
                                        getClassNameReactDatetimeDays(currentDate);
                                      return (
                                        <td {...props} className={classes}>
                                          {currentDate.date()}
                                        </td>
                                      );
                                    }}
                                  />
                                </InputGroup>
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="ni ni-calendar-grid-58" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <ReactDatetime
                                    inputProps={{
                                      placeholder: "End Date",
                                    }}
                                    className="rdtPickerOnRight"
                                    value={selectDate.endDate}
                                    timeFormat={false}
                                    onChange={(e) =>
                                      handleReactDatetimeChange("endDate", e)
                                    }
                                    renderDay={(props, currentDate, selectedDate) => {
                                      let classes = props.className;
                                      classes +=
                                        getClassNameReactDatetimeDays(currentDate);
                                      return (
                                        <td {...props} className={classes}>
                                          {currentDate.date()}
                                        </td>
                                      );
                                    }}
                                  />
                                </InputGroup>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="wrapper mt-4 justify-content-center">
                            <Col lg="3" sm="12">
                              <Button
                                className="btn-white btn-icon mt-2"
                                color="default"
                                onClick={() => setStatus("preparing")}
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
                                onClick={() => setStatus("sent")}
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
                                onClick={() => setStatus("received")}
                              >
                                <span className="btn-inner--icon mr-1">
                                  <i className="fa fa-check" />
                                </span>
                                Entregue
                              </Button>
                            </Col>
                          </Row>
                          <div className="mt-5">
                            {requests.map((r) => r.product ? 
                              (
                                <Card className="shadow border-0 mt-2">
                                  <CardBody className="py-3">
                                    <Row>
                                      <Col lg="4">
                                        <img
                                          alt="..."
                                          className="img-center img-fluid shadow shadow-lg--hover"
                                          src={r.product?.images[0].image_path}
                                          style={{ width: "100px" }}
                                        />
                                      </Col>
                                      <Col lg="8">
                                        <h6 className="text-primary text-uppercase">
                                          {r.product?.name}
                                        </h6>
                                        <p className="description mt-3">
                                          {r.product?.description}
                                        </p>
                                        {
                                          r.status === "preparing" ? (
                                            <Button
                                              className="btn-white btn-icon"
                                              color="default"
                                              onClick={() => toggleModal("modalPreparing", r)}
                                            >
                                              <span className="btn-inner--icon mr-1">
                                                <i className="fa fa-refresh" />
                                              </span>
                                              Preparando
                                            </Button>
                                          ) : r.status === "sent" ? (
                                            <Button
                                              className="btn-icon"
                                              color="primary"
                                              onClick={() => toggleModal("modalTransport", r)}
                                            >
                                              <span className="btn-inner--icon mr-1">
                                                <i className="fa fa-truck" />
                                              </span>
                                              Enviado
                                            </Button>
                                          ) : (
                                            <Button
                                              className="btn-icon"
                                              color="info"
                                              onClick={() => toggleModal("modalDone", r)}
                                            >
                                              <span className="btn-inner--icon mr-1">
                                                <i className="fa fa-check" />
                                              </span>
                                              Entregue
                                            </Button>
                                          )
                                        }
                                      </Col>
                                    </Row>
                                  </CardBody>
                                </Card>
                              ) : (null)
                            )}
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </div>
              </div>
            </Card>
          </Container>
        </section>

        <Modal
          className="modal-dialog-centered"
          isOpen={modal.modalPreparing}
          toggle={() => toggleModal("modalPreparing")}
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
              onClick={() => toggleModal("modalPreparing")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {modalProduct ? (
              <Card className="shadow border-0">
                <CardBody className="py-3">
                  <h3 className="text-primary text-uppercase">
                    {modalProduct.product.name}
                  </h3>
                  <p className="description mt-3">
                    {modalProduct.product.description}
                  </p>
                  <h6 className="text-primary">
                    Dados do Pedido
                  </h6>
                  <p className="description mt-3">
                    {`#${modalProduct.id}`} - {format(new Date(modalProduct.created_at), 'yyyy-MM-dd hh:mm')}
                  </p>
                  <p className="description mt-3">
                    Para avançar o status do produto informe o código de rastreamento.
                  </p>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input 
                        placeholder="Código de rastreamento" 
                        type="text" 
                        onChange={(e) => setTrack(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      className="mt-2"
                      color="primary"
                      type="button"
                      onClick={() => updatePreparing(modalProduct.id)}
                    >
                      Alterar status
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ) : null}
          </div>
        </Modal>
        <Modal
          className="modal-dialog-centered"
          isOpen={modal.modalTransport}
          toggle={() => toggleModal("modalTransport")}
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
              onClick={() => toggleModal("modalTransport")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {modalProduct ? (
              <Card className="shadow border-0">
                <CardBody className="py-3">
                  <h3 className="text-primary text-uppercase">
                    {modalProduct.product.name}
                  </h3>
                  <p className="description mt-3">
                    {modalProduct.product.description}
                  </p>
                  <h6 className="text-primary">
                    Dados do Pedido
                  </h6>
                  <p className="description mt-3">
                    {`#${modalProduct.id}`} - {format(new Date(modalProduct.created_at), 'yyyy-MM-dd hh:mm')}
                  </p>
                  <p className="description mt-3">
                    Para finalizar o pedido e solicitar o pagamento confirme a entrega.
                  </p>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input 
                        placeholder="Pix para pagamento" 
                        type="text" 
                        onChange={(e) => setPix(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      className="mt-2"
                      color="primary"
                      type="button"
                      onClick={() => requestPayment(modalProduct.id)}
                    >
                      Confirmar entrega e solicitar pagamento
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ) : null}
          </div>
        </Modal>
        <Modal
          className="modal-dialog-centered"
          isOpen={modal.modalDone}
          toggle={() => toggleModal("modalDone")}
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
              onClick={() => toggleModal("modalDone")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {modalProduct ? (
              <Card className="shadow border-0">
                <CardBody className="py-3">
                  <h3 className="text-primary text-uppercase">
                    {modalProduct.product.name}
                  </h3>
                  <p className="description mt-3">
                    {modalProduct.product.description}
                  </p>
                  <h6 className="text-primary">
                    Dados do Pedido
                  </h6>
                  <p className="description mt-3">
                    {`#${modalProduct.id}`} - {format(new Date(modalProduct.created_at), 'yyyy-MM-dd hh:mm')}
                  </p>
                  <p className="description mt-3">
                    Pedido finalizado e pagamento solicitado.
                  </p>
                </CardBody>
              </Card>
            ) : null}
          </div>
        </Modal>
        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={modal.confirmDelete}
          toggle={() => toggleModal("confirmDelete")}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Remover produto
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleModal("confirmDelete")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {modalDeleteProduct ? (
              <Card className="shadow border-0">
                <CardBody className="py-3">
                  <h3 className="text-primary text-uppercase">
                    {modalDeleteProduct.name}
                  </h3>
                  <p className="description mt-3">
                    Tem certeza que deseja remover o produto?
                  </p>
                  <div className="text-center">
                    <Button
                      className="mt-2"
                      color="danger"
                      type="button"
                      onClick={() => deleteItem()}
                    >
                      Remover produto
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ) : null}
          </div>
        </Modal>
        <Modal
          className="modal-dialog-centered"
          isOpen={modal.modalPayments}
          toggle={() => toggleModal("modalPayments")}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Pagamentos
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleModal("modalPayments")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            { payments ? payments.map((p) => (
              <Card className="shadow border-0 mt-2">
                <CardBody className="py-3">
                  <Row>
                    <Col lg="12">
                      <h6 className="text-primary text-uppercase">
                        R$ {p.total} - <span>{p.status === "requested" ? `Solicitado` : `Recebido`}</span>
                      </h6>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            )) : null}
          </div>
        </Modal>
      </main>
      <DefaultFooter />
    </>
  );
}
