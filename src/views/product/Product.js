import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

// reactstrap components
import { 
  Card,
  Container, 
  Row, 
  Col,
  UncontrolledCarousel,
  Badge,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

import api from "../../service/api"
import { getValue } from "../../service/storage"

export default function Product () {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [items, setItems] = useState([]);

  const getProduct = async () => {
    try {
      const user = getValue()

      const result = await api.get(`product/product/${id}`, {
        headers: {
          "Authorization": `Bearer ${user.JWT}`
        }
      });

      let images = []
      result.data.images.map((i) => (
        images.push({
          src: i.image_path,
          altText: "",
          caption: "",
          header: "",
        })
      ))

      setProduct(result.data);
      setItems(images)
    } catch (err) {
    }
  }

  useEffect(() => {
    getProduct()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            {product ? (
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-between align-items-center mt-4">
                    <Col className="mb-lg-auto" lg="6">
                      <div className="shadow-lg overflow-hidden">
                        <UncontrolledCarousel items={items} />
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="text-center mt-5">
                        <h1>
                          {product.name}
                        </h1>
                        <div style={{ fontSize: 25, marginTop: 40}}>
                          Por R$ {product.price.toFixed(2)}
                        </div>
                        <div>
                          <span className="h6 font-weight-300">Frete: R$ {product.tax.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="h6 font-weight-300">Tamanho: {product.size}</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="justify-content-center mt-4 mb-6">
                    <Col lg="12">
                      <div className="h6 font-weight-300" style={{ fontSize: 20}}>
                        {product.description}
                      </div>
                      <div className="mt-4">
                        {product.categories ? product.categories.split(',').map((p) => (
                          <Badge color="primary" pill className="mr-1">
                            {p}
                        </Badge>
                        )) : null}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            ) : null}
          </Container>
        </section>
      </main>
      <DefaultFooter />
    </>
  );
}
