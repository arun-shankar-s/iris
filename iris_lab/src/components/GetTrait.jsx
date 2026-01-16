export default function GetTrait(
  petalLength,
  sepalWidth,
  petalWidth,
  sepalLength
) {
  const petalSize = petalLength + petalWidth;
  const sepalSize = sepalLength + sepalWidth;

  let trait = "";

  if (petalSize < 80 && sepalSize > 120) {
    trait = "Grounded · Compact · Resilient";
  } else if (petalSize > 140 && sepalSize < 90) {
    trait = "Expressive · Delicate · Striking";
  } else {
    trait = "Adaptable · Balanced · Expressive";
  }

  return {
    trait,
    petalDesc:
      petalLength < 30
        ? "Short"
        : petalLength < 70
        ? "Moderate"
        : "Long",
    sepalDesc:
      sepalWidth < 35
        ? "Narrow"
        : sepalWidth < 70
        ? "Balanced"
        : "Wide",
  };
}
