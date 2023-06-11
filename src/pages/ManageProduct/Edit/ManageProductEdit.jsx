import ProductApi from "api/productApi";
import { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Spinner } from "reactstrap";
import { DEFAULT_REVIEW_PAGE, REVIEWS_PER_PAGE } from "utilities/Constant";
import {
  addNewBreadcrumb,
  removeLastBreadcrumb,
} from "utilities/slices/breadcrumbSlice";
import ReviewApi from "api/reviewApi";

function ManageProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedCategoryProducts, setRelatedCategoryProducts] = useState(null);
  const [relatedBrandProducts, setRelatedBrandProducts] = useState(null);
  const [firstReviews, setFirstReviews] = useState(null);

  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");

  const [productPrice, setProductPrice] = useState(0);
  const [purchased, setPurchased] = useState(0);
  const [stock, setStock] = useState(0);
  const [warranty, setWarranty] = useState(0);

  const [shortDescrip, setShortDescrip] = useState("");
  const [longDescrip, setLongDescrip] = useState("");

  const [spec1, setSpec1] = useState("");
  const [spec2, setSpec2] = useState("");
  const [spec3, setSpec3] = useState("");
  const [spec4, setSpec4] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      let response = await ProductApi.getDetailedProduct(id);
      dispatch(
        addNewBreadcrumb({
          name: response.productName + " - EDIT",
          slug: "/" + response.categorySlug,
        })
      );

      setProduct(response);
      setProductName(response.productName);
      setBrandName(response.brandName);
      setCategoryName(response.categoryName);
      setCategorySlug(response.categorySlug);

      setProductPrice(response.productPrice);
      setPurchased(response.purchased);
      setStock(response.stock);
      setWarranty(response.warranty);

      setShortDescrip(response.shortDescrip);
      setLongDescrip(response.longDescrip);

      setSpec1(response.spec1);
      setSpec2(response.spec2);
      setSpec3(response.spec3);
      setSpec4(response.spec4);
    };

    let fetchRelatedCategoryProduct = async () => {
      let response = await ProductApi.getRelatedCategoryPro(id);
      setRelatedCategoryProducts(response);
    };

    let fetchRelatedBrandProduct = async () => {
      let response = await ProductApi.getRelatedBrandPro(id);
      setRelatedBrandProducts(response);
    };

    let fetchFirstReviews = async () => {
      let response = await ReviewApi.getReviewsByProductIDByPagination(
        id,
        DEFAULT_REVIEW_PAGE,
        REVIEWS_PER_PAGE
      );
      setFirstReviews(response);
    };

    fetchProduct();
    fetchRelatedBrandProduct();
    fetchRelatedCategoryProduct();
    fetchFirstReviews();

    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch, id]);

  const renderProductDetail = () => {
    if (product === null) {
      return (
        <Col xs="12" sm="12" md="12" lg="12" className="text-center">
          <Spinner color="primary" />
        </Col>
      );
    }
    return (
      <div className="d-flex flex-column">
        <div className="my-4">
          <img src={product.images} alt="Ảnh" />
        </div>

        <div className="d-flex flex-row justify-content-between my-4">
          <div className="d-flex flex-column">
            <span className="font-weight-bold h5">Product Name</span>
            <input
              className="h6 p-2"
              type="text"
              name="productName"
              id="productName"
              value={productName}
              onChange={({ target }) => setProductName(target.value)}
            />
          </div>

          <div className="d-flex flex-column">
            <span className="font-weight-bold h5">Brand</span>
            <input
              className="h6 p-2"
              type="text"
              name="brandName"
              id="brandName"
              value={brandName}
              onChange={({ target }) => setBrandName(target.value)}
            />
          </div>

          <div className="d-flex flex-column">
            <span className="font-weight-bold h5">Category</span>
            <input
              className="h6 p-2"
              type="text"
              name="categoryName"
              id="categoryName"
              value={categoryName}
              onChange={({ target }) => setCategoryName(target.value)}
            />
          </div>

          {/* <div className="d-flex flex-column">
              <span className="font-weight-bold h5">Category Slug</span>
              <input
                className="h6 p-2"
                type="text"
                name="categorySlug"
                id="categorySlug"
                value={categorySlug}
                onChange={({ target }) => setCategorySlug(target.value)}
              />
            </div> */}
        </div>

        <div className="d-flex flex-row justify-content-between my-4">
          <div className="d-flex flex-column">
            <span className="font-weight-bold h5">Price</span>
            <input
              className="h6 p-2"
              type="number"
              name="productPrice"
              id="productPrice"
              value={productPrice}
              onChange={({ target }) => setProductPrice(target.value)}
            />
          </div>

          <div className="d-flex flex-column">
            <span className="font-weight-bold h5">Warranty</span>
            <input
              className="h6 p-2"
              type="number"
              name="warranty"
              id="warranty"
              value={warranty}
              onChange={({ target }) => setWarranty(target.value)}
            />
          </div>

          <div className="d-flex flex-column">
            <span className="font-weight-bold h5">Stock</span>
            <input
              className="h6 p-2"
              type="number"
              name="stock"
              id="stock"
              value={stock}
              onChange={({ target }) => setStock(target.value)}
            />
          </div>

          <div className="d-flex flex-column">
            <span className="font-weight-bold h5">Purchased</span>
            <input
              className="h6 p-2"
              type="number"
              name="purchased"
              id="purchased"
              value={purchased}
              onChange={({ target }) => setPurchased(target.value)}
            />
          </div>
        </div>

        <div className="d-flex flex-column my-2">
          <span className="font-weight-bold h5">Short Description</span>
          <input
            className="h6 p-2"
            type="text"
            name="shortDescrip"
            id="shortDescrip"
            value={shortDescrip}
            onChange={({ target }) => setShortDescrip(target.value)}
          />
        </div>

        <div className="d-flex flex-column my-2">
          <span className="font-weight-bold h5">Long Description</span>
          <input
            className="h6 p-2"
            type="text"
            name="longDescrip"
            id="longDescrip"
            value={longDescrip}
            onChange={({ target }) => setLongDescrip(target.value)}
          />
        </div>

        <div className="d-flex flex-row justify-content-between my-4">
          <div className="d-flex flex-column">
            <span className="font-weight-bold h5">{product.specName1}</span>
            <input
              className="h6 p-2"
              type="text"
              name="spec1"
              id="spec1"
              value={spec1}
              onChange={({ target }) => setSpec1(target.value)}
            />
          </div>

          <div className="d-flex flex-column">
            <span className="font-weight-bold h5">{product.specName2}</span>
            <input
              className="h6 p-2"
              type="text"
              name="spec2"
              id="spec2"
              value={spec2}
              onChange={({ target }) => setSpec2(target.value)}
            />
          </div>

          <div className="d-flex flex-column">
            <span className="font-weight-bold h5">{product.specName3}</span>
            <input
              className="h6 p-2"
              type="text"
              name="spec3"
              id="spec3"
              value={spec3}
              onChange={({ target }) => setSpec3(target.value)}
            />
          </div>

          <div className="d-flex flex-column">
            <span className="font-weight-bold h5">{product.specName4}</span>
            <input
              className="h6 p-2"
              type="text"
              name="spec4"
              id="spec4"
              value={spec4}
              onChange={({ target }) => setSpec4(target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  return <Fragment>{renderProductDetail()}</Fragment>;
}

export default ManageProductDetail;
