import ProductApi from "api/productApi";
import CategoryApi from "api/categoryApi";
import BrandApi from "api/brandApi";
import { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Col, Spinner } from "reactstrap";
import {
  addNewBreadcrumb,
  removeLastBreadcrumb,
} from "utilities/slices/breadcrumbSlice";
import { Button, Form, Modal, ModalHeader } from "react-bootstrap";
import "../Style/style.css";
import { getAllProducts } from "utilities/slices/productSlice";

function ManageProductDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [categories, setCategories] = useState(null);
  const [brands, setBrands] = useState(null);

  //const [images, setImages] = useState("");
  const [productName, setProductName] = useState("");
  const [brandID, setBrandID] = useState(-1);
  const [categoryID, setCategoryID] = useState(-1);

  const [productPrice, setProductPrice] = useState(-1);
  const [stock, setStock] = useState(-1);
  const [warranty, setWarranty] = useState(-1);

  const [shortDescrip, setShortDescrip] = useState("");
  const [longDescrip, setLongDescrip] = useState("");

  const [spec1, setSpec1] = useState("");
  const [spec2, setSpec2] = useState("");
  const [spec3, setSpec3] = useState("");
  const [spec4, setSpec4] = useState("");

  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      let response = await ProductApi.getDetailedProduct(id);
      let response_categories = await CategoryApi.getAll();
      let response_brands = await BrandApi.getBrands();

      dispatch(
        addNewBreadcrumb({
          name: response.productName + " - EDIT",
          slug: "/" + response.categorySlug,
        })
      );

      setProduct(response);

      setCategories(response_categories);
      setBrands(response_brands);

      setProductName(response.productName);
      setBrandID(response.brandID);
      setCategoryID(response.categoryID);

      setProductPrice(response.productPrice);
      setStock(response.stock);
      setWarranty(response.warranty);

      setShortDescrip(response.shortDescrip);
      setLongDescrip(response.longDescrip);

      setSpec1(response.spec1);
      setSpec2(response.spec2);
      setSpec3(response.spec3);
      setSpec4(response.spec4);
    };

    fetchProduct();

    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch, id]);

  const renderProductDetail = () => {
    if (product === null || categories === null || brands === null) {
      return (
        <Col xs="12" sm="12" md="12" lg="12" className="text-center">
          <Spinner color="primary" />
        </Col>
      );
    }
    return (
      <Form className="d-flex flex-column">
        <div className="my-4">
          <img src={product.images} alt="Ảnh" />
        </div>

        <div className="d-flex flex-row justify-content-between my-4">
          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">
              Product Name
            </Form.Label>
            <Form.Control
              className="h6 p-2"
              type="text"
              name="productName"
              id="productName"
              value={productName}
              onChange={({ target }) => setProductName(target.value)}
              style={{ width: "15rem" }}
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">Brand</Form.Label>
            <Form.Control
              className="h6 p-2"
              as="select"
              onChange={({ target }) => setBrandID(Number(target.value))}
              style={{ width: "15rem" }}
            >
              <option value={product.brandId}>{product.brandName}</option>
              {brands.map((item, index) =>
                item.brandID !== product.brandID ? (
                  <option key={index} value={item.brandID}>
                    {item.brandName}
                  </option>
                ) : (
                  ""
                )
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">Category</Form.Label>
            <Form.Control
              className="h6 p-2"
              as="select"
              onChange={({ target }) => {
                setCategoryID(Number(target.value));
              }}
              style={{ width: "15rem" }}
            >
              <option value={product.categoryID}>{product.categoryName}</option>
              {categories.map((item, index) =>
                item.categoryID !== product.categoryID ? (
                  <option key={index} value={item.categoryID}>
                    {item.categoryName}
                  </option>
                ) : (
                  ""
                )
              )}
            </Form.Control>
          </Form.Group>
        </div>

        <div className="d-flex flex-row justify-content-between my-4">
          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">Price</Form.Label>
            <Form.Control
              className="h6 p-2"
              type="number"
              name="productPrice"
              id="productPrice"
              value={productPrice}
              onChange={({ target }) => setProductPrice(Number(target.value))}
              style={{ width: "15rem" }}
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">Warranty</Form.Label>
            <Form.Control
              className="h6 p-2"
              type="number"
              name="warranty"
              id="warranty"
              value={warranty}
              onChange={({ target }) => setWarranty(Number(target.value))}
              style={{ width: "15rem" }}
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">Stock</Form.Label>
            <Form.Control
              className="h6 p-2"
              type="number"
              name="stock"
              id="stock"
              value={stock}
              onChange={({ target }) => setStock(Number(target.value))}
              style={{ width: "15rem" }}
            />
          </Form.Group>
        </div>

        <Form.Group className="d-flex flex-column my-2">
          <Form.Label className="font-weight-bold h5">
            Short Description
          </Form.Label>
          <Form.Control
            className="h6 p-2"
            type="text"
            name="shortDescrip"
            id="shortDescrip"
            value={shortDescrip}
            onChange={({ target }) => setShortDescrip(target.value)}
          />
        </Form.Group>

        <Form.Group className="d-flex flex-column my-2">
          <Form.Label className="font-weight-bold h5">
            Long Description
          </Form.Label>
          <Form.Control
            className="h6 p-2"
            type="text"
            name="longDescrip"
            id="longDescrip"
            value={longDescrip}
            onChange={({ target }) => setLongDescrip(target.value)}
          />
        </Form.Group>

        <div className="d-flex flex-row justify-content-between my-4">
          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">
              {product.specName1}
            </Form.Label>
            <Form.Control
              className="h6 p-2"
              type="text"
              name="spec1"
              id="spec1"
              value={spec1}
              onChange={({ target }) => setSpec1(target.value)}
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">
              {product.specName2}
            </Form.Label>
            <Form.Control
              className="h6 p-2"
              type="text"
              name="spec2"
              id="spec2"
              value={spec2}
              onChange={({ target }) => setSpec2(target.value)}
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">
              {product.specName3}
            </Form.Label>
            <Form.Control
              className="h6 p-2"
              type="text"
              name="spec3"
              id="spec3"
              value={spec3}
              onChange={({ target }) => setSpec3(target.value)}
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">
              {product.specName4}
            </Form.Label>
            <Form.Control
              className="h6 p-2"
              type="text"
              name="spec4"
              id="spec4"
              value={spec4}
              onChange={({ target }) => setSpec4(target.value)}
            />
          </Form.Group>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <Button
            className="btn-return"
            style={{
              backgroundColor: "white",
              borderColor: "#0091ff",
              color: "#0091ff",
              fontSize: "18px",
              paddingInline: "2rem",
              paddingBlock: "0.5rem",
              width: "auto",
            }}
            onClick={(e) => {
              history.push("/ManageProducts");
            }}
          >
            Return
          </Button>

          <Button
            className="btn-edit ml-3 px-xl-5"
            style={{
              backgroundColor: "#E77733",
              border: 0,
              fontSize: "18px",
              paddingInline: "2rem",
              paddingBlock: "0.5rem",
              width: "auto",
            }}
            onClick={() => {
              setShow(true);
            }}
          >
            Edit
          </Button>

          <Modal
            show={show}
            onHide={() => setShow(false)}
            style={{
              height: "16rem",
            }}
          >
            <ModalHeader
              className="d-flex justify-content-start align-content-center h3 text-center m-0"
              style={{ color: "orange" }}
            >
              Question?
            </ModalHeader>
            <ModalHeader className="d-flex justify-content-center align-content-center h4 text-center m-0">
              Are you sure you want to update this product?
            </ModalHeader>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShow(false)}
                className="px-4"
              >
                No
              </Button>
              <Button
                variant="primary"
                onClick={(e) => handleSubmit(e)}
                className="px-4"
              >
                Sure
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Form>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let productToUpdate = {
      categoryID: categoryID,
      brandID: brandID,
      productName: productName,
      productPrice: productPrice,
      shortDescrip: shortDescrip,
      longDescrip: longDescrip,
      stock: stock,
      warranty: warranty,
      specName1: product.specName1,
      spec1: spec1,
      specName2: product.specName2,
      spec2: spec2,
      specName3: product.specName3,
      spec3: spec3,
      specName4: product.specName4,
      spec4: spec4,
      shortTech: product.shortTech,
      images: product.images,
    };

    const updateProduct = async (data, id) => {
      return ProductApi.updateProduct(data, id)
        .then((res) => {
          dispatch(getAllProducts()).then(history.push("/ManageProducts"));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    updateProduct(productToUpdate, id);
  };

  return <Fragment>{renderProductDetail()}</Fragment>;
}

export default ManageProductDetail;
