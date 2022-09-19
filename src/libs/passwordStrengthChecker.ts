const SYMBOLS_DICT = [
  { label: "numberChars", value: 3.32 },
  { label: "alphabet", value: 4.7 },
  { label: "uppercase", value: 4.7 },
  { label: "specialChars", value: 5 },
  { label: "alphabetNumberChars", value: 1 },
  { label: "alphabetSpecialChars", value: 1 },
  { label: "alphabetUppercase", value: 1 },
  { label: "numberCharsSpecialChars", value: 1 },
  { label: "numberCharsUppercase", value: 1 },
  { label: "uppercaseSpecialChars", value: 1 },
  { label: "alphabetNumberCharsUppercase", value: 1 },
  { label: "alphabetNumberCharsSpecialChars", value: 1 },
  { label: "alphabetUppercaseSpecialChars", value: 1 },
  { label: "numberCharsUppercaseSpecialChars", value: 1 },
  { label: "alphabetNumberCharsUppercaseSpecialChars", value: 1 },
];

type ConfigParams = {
  label: string;
  value: boolean;
};

type PasswordStrengthCheckerParams = {
  pwdLength: number;
  config: Array<ConfigParams>;
};

type PaswordStrength =
  | "very weak"
  | "weak"
  | "medium"
  | "strong"
  | "very strong";

export const passwordStrengthChecker = ({
  pwdLength,
  config,
}: PasswordStrengthCheckerParams): PaswordStrength | void => {
  const userSelectedOption = config
    .filter(({ value }) => value)
    .map(({ label }) => label);

  const currentSymbolOption = SYMBOLS_DICT.find(({ label }) =>
    userSelectedOption.every(
      (item) => label.toLowerCase().indexOf(item.toLowerCase()) > -1
    )
  );

  if (!currentSymbolOption) return console.error("Symbol not found");

  const score = pwdLength * currentSymbolOption.value;

  if (score <= 65) return "very weak";
  else if (score > 65 && score <= 78) return "weak";
  else if (score > 78 && score <= 82) return "medium";
  else if (score > 82 && score <= 104) return "strong";
  return "very strong";
};
