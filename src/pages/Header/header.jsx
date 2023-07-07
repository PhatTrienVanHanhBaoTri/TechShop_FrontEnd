import React from "react";
import "./_header.scss";
import Menu from "components/main/Footer/Header/Menu/menu";
import Nav from "./Nav/nav";
import Info from "./Info/info";

function Header() {
  return (
    // <header className="fixed-top">
    <nav
      className="fixed-top navbar navbar-expand-md"
      style={{ backgroundColor: "rgb(252, 235, 198)" }}
    >
      <div className="container-fluid">
        <Menu />

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon d-flex align-items-center justify-content-end">
            <i class="bi bi-list"></i>
          </span>
        </button>

        <div
          className="collapse container-fluid navbar-collapse"
          id="navbarText"
          style={{ backgroundColor: "rgb(252, 235, 198)" }}
        >
          <Nav />

          <Info />
        </div>
      </div>
    </nav>
  );
}

export default React.memo(Header);
