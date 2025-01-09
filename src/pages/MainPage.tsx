import { useState } from "react";
import { Toolbar, Box, Card, CardMedia, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { TextField, Typography } from "@mui/material";
import { useCocktails } from "../data/cocktails.ts";
import LinearProgress from "@mui/joy/LinearProgress";
import { Cocktail } from "../data/model.ts";
import { Link } from "react-router";

export default function App() {
  const [searchTerms, setSearchTerms] = useState(new Array<string>());
  const { loading, error, cocktails } = useCocktails(searchTerms);

  if (error) {
    console.log(error);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const delayDebounceFn = setTimeout(() => {
      let terms = event.target.value.split(" ");
      setSearchTerms(terms);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  };

  return (
    <Box
      position="fixed"
      marginLeft="15%"
      marginRight="15%"
      top="10%"
      width="70%"
    >
      <Toolbar>
        <TextField
          variant="outlined"
          placeholder="Search for cocktails"
          onChange={handleSearchChange}
          sx={{ backgroundColor: "white", borderRadius: 1, width: "100%" }}
        />
        {loading && <LinearProgress sx={{ width: "100%" }} />}
      </Toolbar>
      <Grid container spacing={2} sx={{ mt: 3, px: 3, alignTracks: "center" }}>
        {cocktails &&
          cocktails.map((cocktail: Cocktail) => (
            <Grid sx={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={cocktail.name}>
              <Card sx={{ width: 150 }}>
                <Link
                  to={`/cocktail/${cocktail.name}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: 250, display: "inline" }}
                    image={cocktail.image_url}
                    alt={cocktail.name}
                  />
                  <CardContent
                    sx={{
                      height: 90,
                      overflow: "hidden",
                      alignContent: "center",
                    }}
                  >
                    <Typography variant="h6">{cocktail.name}</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
