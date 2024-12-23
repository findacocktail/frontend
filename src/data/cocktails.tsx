import { useEffect, useState } from "react";

async function getCocktails(terms: string[]) : Promise<Cocktail[]>{
    let requestURL = new URL("https://api.findacocktail.com/cocktails")

    for (let i = 0; i < terms.length; i++) {
        requestURL.searchParams.append("term", terms[i])
    }

    /*
    for (let term in notIncluded) {
        requestURL.searchParams.append("notIncluded", term)
    }
    */

    const response = await fetch(requestURL, {
        method: "GET"
    })

    if (!response.ok) {
        throw new Error("Network response was not ok")
    }

    return await response.json() as Promise<Cocktail[]>
}

export const useCocktails = (terms: string[]) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | undefined>();
    const [cocktails, setCocktails] = useState<Cocktail[] | undefined>();

    useEffect(() => {
        const fetchCocktails = async () => {
            try {
                if (terms.length == 0){
                    return
                }
                setLoading(true);
                const data = await getCocktails(terms)
                setCocktails(data)
            } catch (e) {
                setError(e as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchCocktails()
    }, [terms])

    return {
        loading,
        error,
        cocktails,
    }
}

export interface Cocktail {
    name: string
    youtube_link: string
    ingredients: Ingredient[]
    method: string
    garnish: string
    image_url: string
}

export interface Ingredient {
    amount: number
    scale: string
    description: string
}

