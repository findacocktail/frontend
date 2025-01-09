import { useEffect, useState } from "react";
import { Cocktail } from "./model";

async function getCocktail(name: string): Promise<Cocktail> {
  let requestURL = new URL(`https://api.findacocktail.com/cocktails/${name}`);

  const response = await fetch(requestURL, { method: "GET" });

  if (!response.ok) {
    console.error(response.text)
    throw new Error("Network response was not ok");
  }

  return (await response.json()) as Promise<Cocktail>;
}

export const useCocktail = (name: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();
  const [cocktail, setCocktail] = useState<Cocktail | undefined>();

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        if (name.length == 0) {
          return;
        }
        setLoading(true);
        const data = await getCocktail(name);
        setCocktail(data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktail();
  }, [name]);

  return {
    loading,
    error,
    cocktail,
  };
};

