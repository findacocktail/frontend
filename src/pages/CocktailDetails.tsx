import { useParams } from "react-router";
import { useCocktail } from "../data/cocktail.ts";
import { Card } from "@mui/joy";
import { CardMedia, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

export default function CocktailDetails() {
  let { name } = useParams();
  const { loading, error, cocktail } = useCocktail(name as string);

  if (error) {
    console.log(error);
  }

  if (loading) {
    console.log("loading");
  }

  if (!cocktail) {
    return;
  }

  return (
    <Card sx={{paddingLeft:"20%", paddingRight:"20%", position:"relative"}}>
      <Typography variant="h3">{cocktail.name}</Typography>

      <CardMedia
        component="img"
        sx={{ height: 250, width: 150, display: "inline" }}
        image={cocktail.image_url}
        alt={cocktail.name}
      />

      <Divider />

      {/* Ingredients Section */}
      <div>
        <Typography variant="h4">Ingredients</Typography>
        <h2 className="text-xl font-semibold mb-3"></h2>
        <ul className="space-y-2">
          {cocktail.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-700">
              {`${ingredient.amount} ${ingredient.scale} ${ingredient.description}`}
            </li>
          ))}
        </ul>
      </div>

      <Divider />

      {/* Steps Section */}
      <div>
        <Typography variant="h4">Instructions</Typography>
        <ol className="space-y-2">
          <li className="text-gray-700">{cocktail.method}</li>
        </ol>
      </div>
    </Card>
  );
}
