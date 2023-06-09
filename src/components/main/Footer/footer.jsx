import React from "react";
import "./_footer.scss";

function Footer(props) {
  return (
    <footer>
      <div className="wrapper-footer">
          <div className="logo">TechShop</div>
          <div className="row d-flex flex-[1376px]-row flex-col justify-content-center align-items-start">
            <div className="col-md-4" style={{ marginRight: "1rem" }}>
              <div className="header">
                <p>Service & Support</p>
              </div>
              <div className="content">
                <p>techshop@gmail.com</p>
                <p>0904122122</p>
              </div>
            </div>
            <div className="col-md-3" style={{ marginRight: "1rem" }}>
              <div className="header">
                <p>Info</p>
              </div>
              <div className="content">
                <p>Delivery & Returns</p>
                <p>About Us</p>
                <p>Payment Guide</p>
              </div>
            </div>
            <div className="col-md-2">
              <div className="header">
                <p>Follow Us</p>
              </div>
              <div className="content">
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
