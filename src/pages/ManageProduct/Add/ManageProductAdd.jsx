/* eslint-disable jsx-a11y/img-redundant-alt */
import ProductApi from "api/productApi";
import CategoryApi from "api/categoryApi";
import BrandApi from "api/brandApi";
import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Spinner } from "reactstrap";
import {
  addNewBreadcrumb,
  removeLastBreadcrumb,
} from "utilities/slices/breadcrumbSlice";
import { Button, Form } from "react-bootstrap";
import "../Style/style.css";
import { getAllProducts } from "utilities/slices/productSlice";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function ManageProductAdd() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allProducts = useSelector((state) => state.product.data);

  const [categories, setCategories] = useState(null);
  const [brands, setBrands] = useState(null);

  //const [images, setImages] = useState("");
  const [productName, setProductName] = useState("");
  const [brandID, setBrandID] = useState(0);
  const [categoryID, setCategoryID] = useState(0);

  const [productPrice, setProductPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [warranty, setWarranty] = useState(0);
  const [purchased, setPurchased] = useState(0);

  const [shortDescrip, setShortDescrip] = useState("");
  const [longDescrip, setLongDescrip] = useState("");
  const [shortTech, setShortTech] = useState("");

  const [specName1, setSpecName1] = useState("");
  const [specName2, setSpecName2] = useState("");
  const [specName3, setSpecName3] = useState("");
  const [specName4, setSpecName4] = useState("");

  const [spec1, setSpec1] = useState("");
  const [spec2, setSpec2] = useState("");
  const [spec3, setSpec3] = useState("");
  const [spec4, setSpec4] = useState("");

  const createNewProductID = (all) => {
    let id = -1;
    all.forEach((item) => {
      if (id < item.productID) {
        id = item.productID;
      }
    });

    if (id === -1) {
      id = 0;
    }
    return id;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      let response_categories = await CategoryApi.getAll();
      let response_brands = await BrandApi.getBrands();

      dispatch(
        addNewBreadcrumb({
          name: "ADD A PRODUCT",
          slug: "/add",
        })
      );

      setCategories(response_categories);
      setBrands(response_brands);
    };

    fetchProduct();

    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch]);

  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => setImageURL(url));
    });
  };

  const renderProductAdd = () => {
    if (categories === null || brands === null) {
      return (
        <Col xs="12" sm="12" md="12" lg="12" className="text-center">
          <Spinner color="primary" />
        </Col>
      );
    }
    return (
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div className="my-4">
          <img src={imageURL} alt="Image" style={{ width: 300, height: 200 }} />
          <br />
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          <input type="button" onClick={uploadImage} value="Upload Image" />
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
              placeholder="Name of product..."
              required
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">Brand</Form.Label>
            <Form.Control
              className="h6 p-2"
              as="select"
              onChange={({ target }) => setBrandID(Number(target.value))}
              style={{ width: "15rem" }}
              required
            >
              <option value="" hidden>
                -- Select Brand --
              </option>
              {brands.map((item, index) => (
                <option key={index} value={item.brandID}>
                  {item.brandName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">Category</Form.Label>
            <Form.Control
              className="h6 p-2"
              as="select"
              onChange={({ target }) => setCategoryID(Number(target.value))}
              style={{ width: "15rem" }}
              required
            >
              <option value="" hidden>
                -- Select Category --
              </option>
              {categories.map((item, index) => (
                <option key={index} value={item.categoryID}>
                  {item.categoryName}
                </option>
              ))}
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
              style={{ width: "13rem" }}
              required
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
              style={{ width: "13rem" }}
              required
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
              style={{ width: "13rem" }}
              required
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">Purchased</Form.Label>
            <Form.Control
              className="h6 p-2"
              type="number"
              name="purchased"
              id="purchased"
              value={purchased}
              onChange={({ target }) => setPurchased(Number(target.value))}
              style={{ width: "13rem" }}
              required
            />
          </Form.Group>
        </div>

        <Form.Group className="d-flex flex-column my-3">
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
            placeholder="Briefly introduces..."
            required
          />
        </Form.Group>

        <Form.Group className="d-flex flex-column my-3">
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
            placeholder="Fully introduces..."
            required
          />
        </Form.Group>

        <Form.Group className="d-flex flex-column my-3">
          <Form.Label className="font-weight-bold h5">
            Short Text of Technology
          </Form.Label>
          <Form.Control
            className="h6 p-2"
            type="text"
            name="shortTech"
            id="shortTech"
            value={shortTech}
            onChange={({ target }) => setShortTech(target.value)}
            placeholder="Generally evaluates..."
            required
          />
        </Form.Group>

        <div className="d-flex flex-row justify-content-between mt-5">
          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">
              Title of Spec 1
            </Form.Label>
            <Form.Control
              className="h6 p-2"
              type="text"
              name="specName1"
              id="specName1"
              value={specName1}
              onChange={({ target }) => setSpecName1(target.value)}
              placeholder="Title_1..."
              required
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">
              Title of Spec 2
            </Form.Label>
            <Form.Control
              className="h6 p-2"
              type="text"
              name="specName2"
              id="specName2"
              value={specName2}
              onChange={({ target }) => setSpecName2(target.value)}
              placeholder="Title_2..."
              required
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">
              Title of Spec 3
            </Form.Label>
            <Form.Control
              className="h6 p-2"
              type="text"
              name="specName3"
              id="specName3"
              value={specName3}
              onChange={({ target }) => setSpecName3(target.value)}
              placeholder="Title_3..."
              required
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">
              Title of Spec 4
            </Form.Label>
            <Form.Control
              className="h6 p-2"
              type="text"
              name="specName4"
              id="specName4"
              value={specName4}
              onChange={({ target }) => setSpecName4(target.value)}
              placeholder="Title_4..."
              required
            />
          </Form.Group>
        </div>

        <div className="d-flex flex-row justify-content-between mb-4 mt-3">
          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">
              Value of Spec 1
            </Form.Label>
            <Form.Control
              className="h6 p-2"
              type="text"
              name="spec1"
              id="spec1"
              value={spec1}
              onChange={({ target }) => setSpec1(target.value)}
              placeholder="Value_1..."
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">
              Value of Spec 2
            </Form.Label>
            <Form.Control
              className="h6 p-2"
              type="text"
              name="spec2"
              id="spec2"
              value={spec2}
              onChange={({ target }) => setSpec2(target.value)}
              placeholder="Value_2..."
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">
              Value of Spec 3
            </Form.Label>
            <Form.Control
              className="h6 p-2"
              type="text"
              name="spec3"
              id="spec3"
              value={spec3}
              onChange={({ target }) => setSpec3(target.value)}
              placeholder="Value_3..."
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">
              Value of Spec 4
            </Form.Label>
            <Form.Control
              className="h6 p-2"
              type="text"
              name="spec4"
              id="spec4"
              value={spec4}
              onChange={({ target }) => setSpec4(target.value)}
              placeholder="Value_4..."
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
            className="ml-3 px-xl-5"
            style={{
              border: 0,
              fontSize: "18px",
              paddingInline: "2rem",
              paddingBlock: "0.5rem",
              width: "auto",
            }}
            type="submit"
          >
            Add
          </Button>
        </div>
      </Form>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newpPoductID = createNewProductID(allProducts);
    newpPoductID++;

    let productToAdd = {
      productID: newpPoductID,
      categoryID: categoryID,
      brandID: brandID,
      productRate: 0,
      productName: productName,
      productPrice: productPrice,
      shortDescrip: shortDescrip,
      longDescrip: longDescrip,
      stock: stock,
      warranty: warranty,
      purchased: purchased,
      specName1: specName1,
      spec1: spec1,
      specName2: specName2,
      spec2: spec2,
      specName3: specName3,
      spec3: spec3,
      specName4: specName4,
      spec4: spec4,
      shortTech: shortTech,
      totalReviews: 0,
      images: imageURL,
    };

    const addProduct = async (data) => {
      //console.log(productToAdd);
      return ProductApi.addProduct(data)
        .then((res) => {
          dispatch(getAllProducts()).then(history.push("/ManageProducts"));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    addProduct(productToAdd);
  };

  return <Fragment>{renderProductAdd()}</Fragment>;
}

export default ManageProductAdd;
