import avatar from "assets/images/avatar.jpg";
import { cookiesService } from "helpers/cookiesService";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateLoggedInStatus } from "utilities/slices/userSlice";
import "./_userIcon.scss";

function UserIcon() {
  const { isLoggedIn } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const logout = () => {
    cookiesService.removeCookies("user");
    window.location.href = "/home";
    dispatch(updateLoggedInStatus({ isLoggedIn: false }));
  }
  const renderUserModal = () => {
    return (
      <div className="dropdown">
        <NavLink to={`/profile`}>Profile</NavLink>
        <NavLink to={`/completed-order`}>Your Orders</NavLink>
        <NavLink to={`/wish-list`}>Wish List</NavLink>
        <div onClick={logout}>Logout</div>
      </div>
    );
  };
  const renderAvatar = (loginStatus) => {
    //console.log(loginStatus);
    return loginStatus ? (
      <div className="dropdown-switcher d-md-block d-none">
        <NavLink activeClassName="active" to="/profile">
          <img src={avatar} alt="User Avatar" />
        </NavLink>
        {renderUserModal()}
      </div>
    ) : (
      <NavLink activeClassName="active" to="/login">
        <i className="fa fa-user d-md-block d-none"></i>
        <p className="text-center m-0 d-block d-md-none">Login</p>
      </NavLink>
    );
  };
  return <div className="user-icon">{renderAvatar(isLoggedIn)}</div>;
}

UserIcon.propTypes = {};

export default UserIcon;
