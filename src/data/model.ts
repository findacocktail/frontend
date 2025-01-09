export interface Cocktail {
    name: string;
    youtube_link: string;
    ingredients: Ingredient[];
    method: string;
    garnish: string;
    image_url: string;
  }
  
  export interface Ingredient {
    amount: number;
    scale: string;
    description: string;
  }
  