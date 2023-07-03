import CouponApi from "api/couponApi"
import { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addNewBreadcrumb,
  removeLastBreadcrumb,
} from "utilities/slices/breadcrumbSlice";
import { Button, Form } from "react-bootstrap";
import "../../ManageProduct/Style/style.css";
import { getAllCoupons } from "utilities/slices/productSlice";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function ManageCouponAdd() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [couponCode, setCouponCode] = useState("");
  const [couponType, setCouponType] = useState("");
  const [value, setValue] = useState(0);
  const [expiry, setExpiry] = useState(null);


  useEffect(() => {
    const fetchCoupon = async () => {

      dispatch(
        addNewBreadcrumb({
          name: "ADD A COUPON",
          slug: "/add",
        })
      );
    };

    fetchCoupon();

    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch]);

  const renderCouponAdd = () => {
    return (
      <Form onSubmit={(e) => handleSubmit(e)}>

        <div className="d-flex flex-row justify-content-between my-4">
          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">
              Coupon Code
            </Form.Label>
            <Form.Control
              className="h6 p-2"
              type="text"
              name="couponCode"
              id="couponCode"
              value={couponCode}
              onChange={({ target }) => setCouponCode(target.value)}
              style={{ width: "15rem" }}
              placeholder="Coupon code..."
            />
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">Type</Form.Label>
            <Form.Control
              className="h6 p-2"
              as="select"
              onChange={({ target }) => setCouponType(target.value)}
              style={{ width: "15rem" }}
              required
            >
              <option value="" hidden>
                -- Select Type --
              </option>
                <option key={1} value="PERCENT">
                  PERCENT
                </option>
                <option key={2} value="MONEY">
                  MONEY
                </option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="d-flex flex-column">
            <Form.Label className="font-weight-bold h5">
              Value
            </Form.Label>
            <Form.Control
              className="h6 p-2"
              type="number"
              name="value"
              id="value"
              value={value}
              onChange={({ target }) => setValue(target.value)}
              style={{ width: "15rem" }}
              placeholder="Coupon value..."
              required
            />
          </Form.Group>
        </div>

        <div className="d-flex flex-row justify-content-between my-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                label="Expiry"
                onChange={(value) => {
                    const date = new Date(value);
                    setExpiry((prev) => {
                        prev = date;
                        return prev;
                    })
                }} />
            </LocalizationProvider>
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
              history.push("/ManageCoupons");
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

    if (!expiry) return;

    let couponToAdd = null;

    if (couponCode !== "") {
      couponToAdd = {
        value: value,
        couponCode: couponCode,
        expiry: expiry.getDate() + "/" + (expiry.getMonth() + 1) + "/" + expiry.getFullYear(),
        couponType: couponType
      };
    } else {
        couponToAdd = {
          value: value,
          expiry: expiry.getDate() + "/" + (expiry.getMonth() + 1) + "/" + expiry.getFullYear(),
          couponType: couponType
        };
    }

    const addCoupon = async (data) => {
      return CouponApi.addCoupon(data)
        .then((res) => {
          dispatch(getAllCoupons()).then(history.push("/ManageCoupons"));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    addCoupon(couponToAdd);
  };

  return <Fragment>{renderCouponAdd()}</Fragment>;
}

export default ManageCouponAdd;
