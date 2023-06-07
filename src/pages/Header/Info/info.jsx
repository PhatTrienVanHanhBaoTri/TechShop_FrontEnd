
import CartIcon from "components/main/Footer/Header/CartIcon/cartIcon";
import React from "react";
import UserIcon from "./userIcon";
import "./_info.scss";

function Info() {
	//const status = cookiesService.getCookies("user");

	return (
		<ul className="pl-md-3 navbar-nav ms-3 me-2 mb-md-0  d-flex justify-item-center align-items-center">
			<li className="nav-item pt-md-3 m-3 mb-2">
				<CartIcon />
			</li>
			<li className="nav-item pt-md-3 m-3 mb-2">
				<UserIcon />
			</li>
		</ul>

		// <div className="info-group d-flex">
		//   <CartIcon />
		//   <UserIcon />
		// </div>
	);
}

export default Info;
