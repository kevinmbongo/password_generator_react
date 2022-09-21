import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Slider,
  Switch,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { passwordStrengthChecker } from "./libs/passwordStrengthChecker";

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
  const [pwdStrength, setPwdStrength] = useState("");

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
  }, [passwordLength, isLetter, isNumber, isSpecialChars, isUppercase]);

  return (
    <>
      <Container maxWidth="sm">
        <h1>Générateur</h1>

        <Paper>
          <div>result: {pwd} </div>

          <div>Niveau de securité du mot de passe: {pwdStrength} </div>
          <Button variant="contained">Copier ce mot de passe</Button>
        </Paper>

        <div>
          <h3>LONGUEUR: {passwordLength}</h3>
          <Paper>
            {" "}
            <Slider
              defaultValue={passwordLength}
              step={1}
              valueLabelDisplay="on"
              onChange={handlePasswordLength}
              min={8}
              max={20}
            />
          </Paper>

          <Paper>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">
                <h3>OPTIONS</h3>
              </FormLabel>

              <FormGroup>
                <FormControlLabel
                  label="Letters:"
                  control={
                    <Switch checked={isLetter} onChange={handleLetterInput} />
                  }
                />
                <FormControlLabel
                  label="Numbers:"
                  control={
                    <Switch checked={isNumber} onChange={handleNumberInput} />
                  }
                />
                <FormControlLabel
                  label="Majuscule:"
                  control={
                    <Switch checked={isUppercase} onChange={handleUppercase} />
                  }
                />
                <FormControlLabel
                  label="Special Chars:"
                  control={
                    <Switch
                      checked={isSpecialChars}
                      onChange={handleSpecialCharsInput}
                    />
                  }
                />
              </FormGroup>
            </FormControl>
          </Paper>
        </div>
      </Container>
    </>
  );
};

export default App;
