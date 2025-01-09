import { Breadcrumbs } from "@mui/joy"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Link from "@mui/material/Link"
import { useLocation } from "react-router";

export default function MainBar() {
  const { pathname } = useLocation();

  const getBreadCrumbs = () => {
    if (pathname === "/") {
      return
    }

    return (
      <Link underline="hover" color="inherit" href={document.location.pathname}>
        {decodeURI(document.location.pathname).split("/").reverse()[0]}
      </Link>
    )
  }

  return (
    <AppBar position="fixed" color="inherit" sx={{ zIndex: 1, height: "65px" }}>
      <Toolbar>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            href="/"
            style={{
              color: "inherit",
              textDecoration: "inherit",
              font: "inherit",
              fontWeight: "500",
            }}
            underline="hover"
          >
            FindACocktail.com
          </Link>
          {getBreadCrumbs()}
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  )
}
