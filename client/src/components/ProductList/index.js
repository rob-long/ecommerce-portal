import React, { Component, Fragment } from "react";
import Product from "../Product";
import Heading from "../Heading";
import { BarLoader } from "react-spinners";

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  async fetchProducts() {
    // Token returned from Stripe
    const res = await fetch("/api/stripe/products", {
      // Backend API url
      method: "GET"
    });
    const response = await res.json();
    const products = response.data;

    this.setState({
      products
    });
  }

  render() {
    const { products } = this.state;
    const productList = products.map((product, index) => {
      return (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          caption={product.caption}
          description={product.description}
          skus={product.skus.data}
          images={product.images}
        />
      );
    });

    return (
      <Fragment>
        <Heading key="shop" subtitle="Nutrigene" title="Shop" />
        <div className="sweet-loading">
          <BarLoader color={"#123abc"} loading={!products.length} />
        </div>
        <div id="products">{productList}</div>
      </Fragment>
    );
  }
}

export default ProductList;
