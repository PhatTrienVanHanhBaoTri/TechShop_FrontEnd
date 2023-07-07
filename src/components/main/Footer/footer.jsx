import React from "react";
import "./_footer.scss";

function Footer(props) {
  return (
    <footer>
      <div className="wrapper-footer">
          <div className="logo">TechShop</div>
          <div className="row d-flex flex-xl-row flex-col justify-content-center align-items-start">
            <div className="col-xl-4" style={{ marginRight: "1rem", padding: "1rem" }}>
              <div className="header text-nowrap">
                <p>Service & Support</p>
              </div>
              <div className="content text-nowrap">
                <p>techshop@gmail.com</p>
                <p>0904122122</p>
              </div>
            </div>
            <div className="col-xl-3" style={{ marginRight: "1rem", padding: "1rem" }}>
              <div className="header text-nowrap">
                <p>Info</p>
              </div>
              <div className="content text-nowrap">
                <p>Delivery & Returns</p>
                <p>About Us</p>
                <p>Payment Guide</p>
              </div>
            </div>
            <div className="col-xl-2" style={{ padding: "1rem" }}>
              <div className="header text-nowrap">
                <p>Follow Us</p>
              </div>
              <div className="content text-nowrap">
                <p>Facebook</p>
                <p>Instagram</p>
              </div>
            </div>
          </div>
        </div>
      
    </footer>
  );
}

export default Footer;
