import { useParams } from "react-router";
import { useCocktail } from "../data/cocktail.ts";
import { CardMedia, Paper } from "@mui/material";
import Divider from "@mui/material/Divider";

export default function CocktailDetails() {
  let { name } = useParams();
  const { loading, error, cocktail } = useCocktail(name as string);

  if (error) {
    console.error(error);
  }

  if (loading) {
    console.log("loading");
  }

  return (
    <Paper
      elevation={0}
      sx={{ paddingLeft: "20%", paddingRight: "20%", position: "relative" }}
    >
      <h1>{cocktail?.name}</h1>

      <CardMedia
        component="img"
        sx={{ height: 250, width: 150, display: "inline", marginLeft:"4%",marginTop:"4%" }}
        image={cocktail?.image_url}
        alt={cocktail?.name}
      />

      <Divider />

      {/* Ingredients Section */}
      <Paper elevation={0} sx={{ padding: "4% 4% 0 0 " }}>
        <h1>Ingredients</h1>
        <Paper elevation={0} sx={{ padding: "4% 4%" }}>
          <ul>
            {cocktail?.ingredients.map((ingredient, index) => (
              <li key={index}>
                {`${ingredient.amount} ${ingredient.scale} ${ingredient.description}`}
              </li>
            ))}
          </ul>
        </Paper>
      </Paper>

      <Divider />

      {/* Steps Section */}
      <Paper elevation={0} sx={{ padding: "4% 4% 0 0" }}>
        <h1>Instructions</h1>
        <Paper elevation={0} sx={{ padding: "4% 4%" }}>
          <ol>
            <li>{cocktail?.method}</li>
          </ol>
        </Paper>
      </Paper>
    </Paper>
  );
}
