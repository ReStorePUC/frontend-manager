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

export default function Admin () {
  const [plainTabs, setPlainTabs] = useState(1);
  const [selectDate, setSelectDate] = useState({});
  const [modal, setModals] = useState({});
  const [modalPayment, setModalPayment] = useState(null);
  const [stores, setStores] = useState([]);
  const [payments, setPayments] = useState([]);
  const [status, setStatus] = useState("requested");

  const navigate = useNavigate();

  const toggleNavs = (e, state, index) => {
    e.preventDefault();
    setPlainTabs(index);
  };
  const toggleModal = (state, payment) => {
    setModalPayment(payment)
    setModals({
      [state]: !modal[state],
    });
  };

  const getStores = async (name = "") => {
    try {
      const user = getValue()

      const result = await api.get(`user/private/store/search?name=${name}`, {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });
      setStores(result.data);  
    } catch (err) {
    }
  }

  const getPayments = async () => {
    try {
      const user = getValue()

      let route = `shop/private/payment/search?`

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
      setPayments(result.data)
    } catch (err) {
    }
  }

  const updatePayment = async (paymentID) => {
    try {
      const user = getValue()

      await api.put(`shop/private/payment/${paymentID}`, 
      {
        status: "completed"
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

  useEffect(() => {
    getStores();
    getPayments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    getPayments();
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
        <section className="section section-lg section-shaped pb-300 mb-20">
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
                    <div className="text-center mt-2">
                      <h1>
                        Administração
                      </h1>
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
                          Lojas
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
                          Pagamentos
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
                              Lojas
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
                                  placeholder="Buscar por lojas"
                                  type="text"
                                  onChange={(e) => getStores(e.target.value)}
                                />
                              </InputGroup>
                            </Col>
                            <Col lg="6" sm="6">
                              <Button
                                className="btn-icon"
                                color="primary"
                                href="/cadastrar"
                              >
                                <span className="btn-inner--icon mr-1">
                                  <i className="fa fa-plus" />
                                </span>
                                Cadastrar loja
                              </Button>
                            </Col>
                          </Row>
                          <div className="mt-5">
                            {stores.map((s) => (
                              <Card className="shadow border-0 mt-2">
                                <CardBody className="py-3">
                                  <Row>
                                    <Col lg="4">
                                      <img
                                        alt="..."
                                        className="img-center img-fluid shadow shadow-lg--hover"
                                        src={s.photo_path}
                                        style={{ width: "100px" }}
                                      />
                                    </Col>
                                    <Col lg="8">
                                      <h6 className="text-primary text-uppercase">
                                        {s.name}
                                      </h6>
                                      <p className="description mt-3">
                                        <p>
                                          {s.address}
                                        </p>
                                        <p>
                                          {s.block}, {s.city} - {s.state}
                                        </p>
                                      </p>
                                    </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            ))}
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="plainTabs2">
                      <Row className="justify-content-center">
                        <Col lg="9">
                          <div className="text-center mt-5">
                            <h2>
                              Pagamentos
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
                                onClick={() => setStatus('requested')}
                              >
                                Pendente
                              </Button>
                            </Col>
                            <Col lg="3" sm="12">
                              <Button
                                className="btn-icon mt-2"
                                color="info"
                                onClick={() => setStatus('completed')}
                              >
                                Concluído
                              </Button>
                            </Col>
                          </Row>
                          <div className="mt-5">
                            {payments.map((p) => (
                              <Card className="shadow border-0 mt-2">
                                <CardBody className="py-3">
                                  <Row>
                                    <Col lg="12">
                                      <h6 className="text-primary text-uppercase">
                                        R$ {p.total} -- {p.status === "requested" ? `Pendente` : `Concluído`}
                                      </h6>
                                      <Button
                                        className="btn-icon mt-4"
                                        color="info"
                                        onClick={() => toggleModal("modalPayment", p)}
                                      >
                                        Ver detalhes
                                      </Button>
                                    </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            ))}
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
          isOpen={modal.modalPayment}
          toggle={() => toggleModal("modalPayment")}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Pagamento
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleModal("modalPayment")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {modalPayment ? (
              <Card className="shadow border-0">
                <CardBody className="py-3">
                  <h3 className="text-primary text-uppercase">
                    R$ {modalPayment.total}
                  </h3>
                  <p className="description mt-3">
                    Pagamento solicitado dia {format(new Date(modalPayment.created_at), 'yyyy-MM-dd hh:mm')}.
                  </p>
                  <h6 className="text-primary">
                    Dados do Pagamento
                  </h6>
                  <p className="description mt-3">
                    Valor: R$ {modalPayment.total}
                  </p>
                  <p className="description mt-3">
                    Chave pix: {modalPayment.pix}
                  </p>
                  {modalPayment.status === 'requested' ? (
                    <Button
                      className="btn-icon mt-2"
                      color="info"
                      onClick={() => updatePayment(modalPayment.id)}
                    >
                      Marcar como concluído
                    </Button>
                  ) : null}
                </CardBody>
              </Card>
            ) : null}
          </div>
        </Modal>
      </main>
    </>
  );
}
