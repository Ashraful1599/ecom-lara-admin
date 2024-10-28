// utils/variantUtils.ts
type Attribute = {
  name: string;
  values: string[];
};

type Variant = {
  [key: string]: string;
};

// Generates all possible combinations of attribute values (Cartesian product)
export const generateCombinations = (
  attributes: Attribute[],
  index = 0,
  currentCombination = {},
): Variant[] => {
  if (index === attributes.length) {
    return [currentCombination];
  }

  const attribute = attributes[index];
  const variants: Variant[] = [];

  for (const value of attribute.values) {
    variants.push(
      ...generateCombinations(attributes, index + 1, {
        ...currentCombination,
        [attribute.name]: value,
      }),
    );
  }

  return variants;
};
