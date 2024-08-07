import {
  dragonBallCards,
  ben10Cards,
  pokemonCards,
  powerRangersCards,
  yugiohCards,
  narutoCards,
} from "./cardData";

export const gameData = [
  {
    id: 1,
    title: "Dragon Ball",
    image: "/images/dragon-ball.jpg",
    rules: [
      { image: "/images/rule1.jpg", description: "Rule 1 description" },
      { image: "/images/rule2.jpg", description: "Rule 2 description" },
      { image: "/images/rule3.jpg", description: "Rule 3 description" },
    ],
    cards: dragonBallCards,
    coverImage: "/images/dragonball-cover.jpg",
    backImage: "/images/dragonball-back.jpg",
  },
  {
    id: 2,
    title: "Ben 10",
    image: "/images/ben10.jpg",
    description: "Transform into alien heroes and save the universe!",
    rules: [
      { image: "/images/rule1.jpg", description: "Rule 1 description" },
      { image: "/images/rule2.jpg", description: "Rule 2 description" },
      { image: "/images/rule3.jpg", description: "Rule 3 description" },
    ],
    cards: ben10Cards,
    coverImage: "/images/ben10-cover.jpg",
    backImage: "/images/ben10-back.jpg",
  },
  {
    id: 3,
    title: "Pokémon",
    image: "/images/pokemon.jpg",
    description: "Catch 'em all and battle with your favorite Pokémon!",
    rules: [
      { image: "/images/rule1.jpg", description: "Rule 1 description" },
      { image: "/images/rule2.jpg", description: "Rule 2 description" },
      { image: "/images/rule3.jpg", description: "Rule 3 description" },
    ],
    cards: pokemonCards,
    coverImage: "/images/pokemon-cover.jpg",
    backImage: "/images/pokemon-back.jpg",
  },
  {
    id: 4,
    title: "Power Rangers",
    image: "/images/powerrangers.jpg",
    description: "Join the Power Rangers and fight evil!",
    rules: [
      { image: "/images/rule1.jpg", description: "Rule 1 description" },
      { image: "/images/rule2.jpg", description: "Rule 2 description" },
      { image: "/images/rule3.jpg", description: "Rule 3 description" },
    ],
    cards: powerRangersCards,
    coverImage: "/images/powerrangers-cover.jpg",
    backImage: "/images/powerrangers-back.jpg",
  },
  {
    id: 5,
    title: "Yu-Gi-Oh!",
    image: "/images/yugioh.jpg",
    description: "Duel with powerful monsters and spells in Yu-Gi-Oh!",
    rules: [
      { image: "/images/rule1.jpg", description: "Rule 1 description" },
      { image: "/images/rule2.jpg", description: "Rule 2 description" },
      { image: "/images/rule3.jpg", description: "Rule 3 description" },
    ],
    cards: yugiohCards,
    coverImage: "/images/yugioh-cover.jpg",
    backImage: "/images/yugioh-back.jpg",
  },
  {
    id: 6,
    title: "Naruto",
    image: "/images/naruto.jpg",
    description: "Fight alongside your favorite ninjas in the Naruto world!",
    rules: [
      { image: "/images/rule1.jpg", description: "Rule 1 description" },
      { image: "/images/rule2.jpg", description: "Rule 2 description" },
      { image: "/images/rule3.jpg", description: "Rule 3 description" },
    ],
    cards: narutoCards,
    coverImage: "/images/naruto-cover.jpg",
    backImage: "/images/naruto-back.jpg",
  },
  // Add more game entries as needed
];
