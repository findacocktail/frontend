import { Typography } from "@mui/joy";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router";

export default function MainBar() {
  return (
      <AppBar position="fixed" color="inherit" sx={{ zIndex: 1, height: "65px" }}>
        <Toolbar>
          <Link
            to="/"
            style={{ color: "inherit", textDecoration: "inherit" }}
          />
          <Typography
            component="h1"
            sx={{ flexGrow: 1, fontFamily: "inherit" }}
          >
            FindACocktail.com
          </Typography>
        </Toolbar>
      </AppBar>
  );
}
