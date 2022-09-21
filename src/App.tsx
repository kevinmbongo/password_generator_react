import AutorenewIcon from "@mui/icons-material/Autorenew";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  LinearProgress,
  Paper,
  Slider,
  Switch,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import {
  passwordStrengthChecker,
  PaswordStrength,
  ProgressColorsDict,
  SliderColors,
} from "./libs/passwordStrengthChecker";

const App = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const specialChars = "!#$%&()*+,-./:;<=>?@[]^_`{|}~";

  const [passwordLength, setPasswordLength] = useState(8);
  const [pwd, setPwd] = useState("");
  const [isLetter, setIsLetter] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSpecialChars, setIsSpecialChars] = useState(true);
  const [isUppercase, setIsUppercase] = useState(false);
  const [pwdStrength, setPwdStrength] = useState<PaswordStrength>("");
  const [pwdrefresh, setPwdrefresh] = useState(0);

  const handleLetterInput = () => setIsLetter(!isLetter);
  const handleNumberInput = () => setIsNumber(!isNumber);
  const handleSpecialCharsInput = () => setIsSpecialChars(!isSpecialChars);
  const handleUppercase = () => setIsUppercase(!isUppercase);

  const handlePasswordLength = (
    event: Event,
    value: number | Array<number>,
    activeThumb: number
  ) => {
    setPasswordLength(value as unknown as number);
  };

  useEffect(() => {
    const pwdStrength = passwordStrengthChecker({
      pwdLength: pwd.length,
      config: [
        { label: "alphabet", value: isLetter },
        { label: "uppercase", value: isUppercase },
        { label: "numberChars", value: isNumber },
        { label: "specialChars", value: isSpecialChars },
      ],
    });

    setPwdStrength(pwdStrength ?? "");
  }, [pwd]);

  useEffect(() => {
    const checkedOptions =
      !isLetter && !isNumber && !isSpecialChars && !isUppercase;
    if (checkedOptions) setIsSpecialChars(checkedOptions);
  }, [isLetter, isNumber, isSpecialChars, isUppercase]);

  useEffect(() => {
    const dict = [
      ...(isLetter ? [alphabet] : []),
      ...(isNumber ? [numberChars] : []),
      ...(isUppercase ? [uppercase] : []),
      ...(isSpecialChars ? [specialChars] : []),
    ].join();

    const password = new Array(passwordLength)
      .fill(0)
      .reduce((acc) => acc + dict[Math.floor(Math.random() * dict.length)], "");

    setPwd(password);
  }, [
    passwordLength,
    isLetter,
    isNumber,
    isSpecialChars,
    isUppercase,
    pwdrefresh,
  ]);

  const marks = [
    {
      value: 8,
      label: "8",
    },
    {
      value: 20,
      label: "20",
    },
  ];

  const [sliderColor, setSlidercolor] = useState<SliderColors>("inherit");

  useEffect(() => {
    const dict: ProgressColorsDict = {
      "very weak": "error",
      weak: "warning",
      medium: "info",
      strong: "primary",
      "very strong": "success",
      "": "success",
    };

    setSlidercolor(dict[pwdStrength] ?? "");
  }, [pwdStrength]);

  return (
    <>
      <Container maxWidth="sm">
        <h1>Générateur</h1>

        <Paper>
          <div>
            <span>{pwd}</span>
            <IconButton onClick={() => setPwdrefresh(pwdrefresh + 1)}>
              <AutorenewIcon />
            </IconButton>
          </div>

          <Box sx={{ width: "100%" }}>
            <LinearProgress
              variant="determinate"
              value={100}
              color={sliderColor}
            />
          </Box>

          <div>Niveau de securité du mot de passe: {pwdStrength} </div>

          <Button variant="contained">Copier ce mot de passe</Button>
        </Paper>

        <div>
          <h4>LONGUEUR: {passwordLength}</h4>
          <Paper>
            <Slider
              defaultValue={passwordLength}
              step={1}
              valueLabelDisplay="on"
              onChange={handlePasswordLength}
              marks={marks}
              min={8}
              max={20}
            />
          </Paper>

          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">
              <h4>OPTIONS</h4>
            </FormLabel>
            <Paper>
              <FormGroup>
                <FormControlLabel
                  labelPlacement="start"
                  label="Letters (ex. abc):"
                  control={
                    <Switch checked={isLetter} onChange={handleLetterInput} />
                  }
                />
                <FormControlLabel
                  labelPlacement="start"
                  label="Majuscule (ex. ABC):"
                  control={
                    <Switch checked={isUppercase} onChange={handleUppercase} />
                  }
                />
                <FormControlLabel
                  labelPlacement="start"
                  label="Numbers (ex. 123):"
                  control={
                    <Switch checked={isNumber} onChange={handleNumberInput} />
                  }
                />
                <FormControlLabel
                  labelPlacement="start"
                  label="Special Chars (ex. #$%&):"
                  control={
                    <Switch
                      checked={isSpecialChars}
                      onChange={handleSpecialCharsInput}
                    />
                  }
                />
              </FormGroup>
            </Paper>
          </FormControl>
        </div>
      </Container>
    </>
  );
};

export default App;
