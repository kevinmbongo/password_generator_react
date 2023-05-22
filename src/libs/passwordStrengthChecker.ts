import { AlertColor } from "@mui/material";

const SYMBOLS_DICT = [
  { label: "numberChars", value: 3.32 },
  { label: "alphabet", value: 4.7 },
  { label: "uppercase", value: 4.7 },
  { label: "specialChars", value: 5 },
  { label: "alphabetNumberChars", value: 5.17 },
  { label: "alphabetUppercase", value: 5.3 },
  { label: "numberCharsUppercase", value: 5.45 },
  { label: "numberCharsSpecialChars", value: 5.55 },
  { label: "alphabetSpecialChars", value: 5.68 },
  { label: "uppercaseSpecialChars", value: 5.75 },
  { label: "alphabetNumberCharsUppercase", value: 5.95 },
  { label: "alphabetUppercaseSpecialChars", value: 6.1 },
  { label: "alphabetNumberCharsSpecialChars", value: 6.2 },
  { label: "numberCharsUppercaseSpecialChars", value: 6.49 },
  { label: "alphabetNumberCharsUppercaseSpecialChars", value: 7 },
];

export type SnackBarMessage = { severity: AlertColor; message: string };

export type MessageDict = {
  success: SnackBarMessage;
  error: SnackBarMessage;
};

type ConfigParams = {
  label: string;
  value: boolean;
};

type PasswordStrengthCheckerParams = {
  pwdLength: number;
  config: Array<ConfigParams>;
};

export type SliderColors =
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | "inherit";

export type ProgressColorsDict = {
  "very weak": SliderColors;
  weak: SliderColors;
  medium: SliderColors;
  strong: SliderColors;
  "very strong": SliderColors;
  "": SliderColors;
};

export type PaswordStrength =
  | "very weak"
  | "weak"
  | "medium"
  | "strong"
  | "very strong"
  | "";

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
