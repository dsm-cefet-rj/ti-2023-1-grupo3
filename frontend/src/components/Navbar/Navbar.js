import * as React from "react";
import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledTypography = styled(Typography)(() => ({
  fontWeight: "bold",
  color: "inherit",
  textDecoration: "none",
}));

const StyledButton = styled(Button)(() => ({
  color: "white",
  display: "block",
}));

const pageLinks = [{ label: "Profissionais", link: "/professionals" }];
const settingsLinks = ["Conta", "Sair"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const navigate = useNavigate();

  const handleMenuLinkClick = (link) => navigate(link);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StyledTypography
            variant="h6"
            component="a"
            href="/"
            sx={{ display: { xs: "none", md: "flex" } }}
            noWrap
          >
            Nome
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
                  onClick={() => handleMenuLinkClick(page.link)}
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
            Nome
          </StyledTypography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pageLinks.map((page) => (
              <StyledButton
                key={page.label}
                onClick={() => handleMenuLinkClick(page.link)}
              >
                {page.label}
              </StyledButton>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Configurações">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
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
              {settingsLinks.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
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
