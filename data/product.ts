
export interface ProductVariant {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  accentColor: string;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  variants: ProductVariant[];
}


export const product: Product = {
  id: "aero-runner-01",
  name: "Aero Runner Pro",
  category: "Performance Sneaker",
  basePrice: 189,
  variants: [
    {
      id: "midnight-black",
      name: "Shadow Black",
      colorName: "Midnight Black",
      colorHex: "#0a0a0a",
      accentColor: "#ffffff",
      image: "👟",
      description: "Stealth design with premium carbon fiber details",
    },
    {
      id: "ocean-blue",
      name: "Ocean Wave",
      colorName: "Deep Ocean",
      colorHex: "#1e3a8a",
      accentColor: "#60a5fa",
      image: "👟",
      description: "Dynamic colorway inspired by the sea",
    },
    {
      id: "rose-gold",
      name: "Sunset Rose",
      colorName: "Rose Gold",
      colorHex: "#b76e79",
      accentColor: "#fecdd3",
      image: "👟",
      description: "Bold statement with metallic rose accents",
    },
    {
      id: "forest-green",
      name: "Forest Trail",
      colorName: "Forest Green",
      colorHex: "#14532d",
      accentColor: "#86efac",
      image: "👟",
      description: "Nature-inspired performance design",
    },
  ],
};
