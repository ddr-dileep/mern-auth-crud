import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import { isAuthenticated, removeAuthenticated } from "../../utils";
import { useDispatch } from "react-redux";
import { clearAllState } from "./../../redux/slices/userSlice";

export const AppNavigation = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(isAuthenticated());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [window.location.pathname]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    removeAuthenticated();
    dispatch(clearAllState());
    navigate("/");
  };

  return (
    <AppBar position="static" className="nagivation-bar">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <h3 className="nagivation-bar-logo">Auth task</h3>
          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            ) : (
              <React.Fragment>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Signup
                </Link>
              </React.Fragment>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn && [
                <MenuItem key="logout" onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>,
              ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
