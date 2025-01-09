import { useParams } from "react-router";
import { useCocktail } from "../data/cocktail.ts";
import { LinearProgress } from "@mui/joy";

export default function CocktailDetails() {
  let { name } = useParams();
  const { loading, error, cocktail } = useCocktail(name as string);

  if (error) {
    console.log(error);
  }

  return (
    <div>
      {loading && <LinearProgress thickness={1} />}
      <h1>{cocktail?.youtube_link}</h1>
    </div>
  );
}
