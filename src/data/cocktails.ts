import { useEffect, useState } from "react";
import { Cocktail } from "./model";

async function getCocktails(terms: string[]): Promise<Cocktail[]> {
  let requestURL = new URL("https://api.findacocktail.com/cocktails");

  for (let i = 0; i < terms.length; i++) {
    requestURL.searchParams.append("term", terms[i]);
  }

  const response = await fetch(requestURL, { method: "GET" });

  if (!response.ok) {
    console.error(response.text)
    throw response.status
  }

  return (await response.json()) as Promise<Cocktail[]>;
}

export const useCocktails = (terms: string[]) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();
  const [cocktails, setCocktails] = useState<Cocktail[] | undefined>();

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        if (terms.length == 0) {
          setCocktails([])
          return;
        }
        setLoading(true);
        const data = await getCocktails(terms);
        setCocktails(data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktails();
  }, [terms]);

  return {
    loading,
    error,
    cocktails,
    setError,
  };
};

