import { useState } from "react";
import { Toolbar, Card, CardMedia, CardContent } from "@mui/material";
import { Autocomplete, AutocompleteChangeReason } from "@mui/material";
import { Alert, Fade } from "@mui/material";
import { AutocompleteChangeDetails } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { TextField, Typography } from "@mui/material";
import { useCocktails } from "../data/cocktails.ts";
import LinearProgress from "@mui/joy/LinearProgress";
import { Cocktail } from "../data/model.ts";
import { Link,useSearchParams } from "react-router";

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerms, setSearchTerms] = useState(searchParams.getAll('s'));
  const { loading, error, cocktails, setError } = useCocktails(searchTerms);


  const handleSearchChange = (
    _event: React.SyntheticEvent,
    value: string[],
    _reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<never> | undefined
  ) => {
    setSearchParams(`?${new URLSearchParams(value.map(s=>['s',s]))}`)
    setSearchTerms(value);
  };

  const getErrorMessage = () => {
    let length = searchTerms.length;
    if (length === 0 || error === undefined) {
      return "";
    }

    let errorMessage = "No results when search for terms combined: ";
    for (let i = 0; i < length - 1; i++) {
      errorMessage += `${searchTerms[i]}, `;
    }

    errorMessage += `${searchTerms[length - 1]}.`;

    return errorMessage;
  };

  return (
    <>
      <Toolbar>
        <Autocomplete
          multiple
          options={[]}
          freeSolo
          sx={{ width: "100%", position: "static" }}
          onChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search cocktails with name, liquor, garnish"
            />
          )}
        />
        {loading && <LinearProgress sx={{ width: "100%" }} />}
      </Toolbar>
      <Fade
        in={error !== undefined}
        style={{ transformOrigin: "0 0 0" }}
        addEndListener={() => {
          setTimeout(() => {
            setError(undefined);
          }, 3000);
        }}
      >
        <Alert
          severity="error"
          sx={{
            position: "static",
            marginLeft: "2%",
            marginRight: "2%",
          }}
        >
          {getErrorMessage()}
        </Alert>
      </Fade>
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
    </>
  );
}
