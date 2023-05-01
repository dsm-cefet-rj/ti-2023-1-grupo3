import * as React from "react";
import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  styled,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectIsUserInitialized,
  selectUser,
} from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const StyledTypography = styled(Typography)(() => ({
  fontWeight: "bold",
  color: "inherit",
  textDecoration: "none",
}));

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const user = useSelector(selectUser);
  const isUserInitialized = useSelector(selectIsUserInitialized);

  const userLogged = isUserInitialized && !!user;

  const navigate = useNavigate();

  const handleNavigate = (path) => navigate(path);

  const pageLinks = [{ label: "Profissionais", link: "/professionals" }];
  const settingsLinks = [
    { label: "Perfil", link: "/account" },
    { label: "Consultas Marcadas", link: "/appointments" },
    { label: "Sair", link: "" },
  ];
  const unloggedLinks = [
    { label: "Login", link: "/login" },
    { label: "Cadastrar", link: "/signup" },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <StyledTypography
            variant="h6"
            component="a"
            href="/"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            noWrap
          >
            <CalendarMonthIcon sx={{ mr: 1 }} /> PAC
          </StyledTypography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pageLinks.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleNavigate(page.link)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <StyledTypography
            variant="h5"
            component="a"
            href="/"
            noWrap
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            PAC
          </StyledTypography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pageLinks.map((page, index) => (
              <StyledTypography
                variant="body1"
                onClick={() => handleNavigate(page.link)}
                noWrap
                key={index}
                sx={{ mr: 1 }}
              >
                {page.label}
              </StyledTypography>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip
              title={userLogged ? "Configurações" : "Faça login ou cadastre-se"}
            >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={userLogged ? user.profilePicture : undefined} />
              </IconButton>
            </Tooltip>

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
              {userLogged
                ? settingsLinks.map((setting) => (
                    <MenuItem
                      key={setting.label}
                      onClick={() => handleNavigate(setting.link)}
                    >
                      <Typography textAlign="center">
                        {setting.label}
                      </Typography>
                    </MenuItem>
                  ))
                : unloggedLinks.map((link) => (
                    <MenuItem
                      key={link.label}
                      onClick={() => handleNavigate(link.link)}
                    >
                      <Typography textAlign="center">{link.label}</Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
