import AutorenewIcon from "@mui/icons-material/Autorenew";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  IconButton,
  LinearProgress,
  Paper,
  Slider,
  Switch,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import {
  passwordStrengthChecker,
  PaswordStrength,
  ProgressColorsDict,
  SliderColors,
} from "./libs/passwordStrengthChecker";
import "./styles.css";

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
      <Box
        sx={{
          minWidth: "100%",
          display: "flex",
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Typography variant="h3" component="h1" sx={{ fontWeight: 900 }}>
            Générateur
          </Typography>
          <Paper
            sx={{
              paddingTop: 3,
              paddingBottom: 3,
              paddingLeft: 2,
              paddingRight: 2,
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" component="span" fontSize="25px">
                  {pwd}
                </Typography>
                <IconButton onClick={() => setPwdrefresh(pwdrefresh + 1)}>
                  <AutorenewIcon />
                </IconButton>
              </Box>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <LinearProgress
                  sx={{ borderRadius: 10, marginBottom: 0.5 }}
                  variant="determinate"
                  value={100}
                  color={sliderColor}
                />
                <Typography variant="inherit" component="span" fontSize="16px">
                  Niveau de securité: {pwdStrength} !
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                color="success"
                sx={{
                  paddingLeft: 7,
                  paddingRight: 7,
                  paddingTop: 1.5,
                  paddingBottom: 1.5,
                  borderRadius: 1.5,
                  color: "white",
                }}
              >
                Copier ce mot de passe
              </Button>
            </Box>
          </Paper>

          <Typography variant="inherit" component="h4" color="text.secondary">
            LONGUEUR: {passwordLength}
          </Typography>

          <Paper sx={{ borderRadius: 3, paddingTop: 4, paddingBottom: 1 }}>
            <Container maxWidth="sm">
              <Slider
                defaultValue={passwordLength}
                step={1}
                valueLabelDisplay="on"
                onChange={handlePasswordLength}
                marks={marks}
                min={8}
                max={20}
              />
            </Container>
          </Paper>

          <Typography variant="inherit" component="h4" color="text.secondary">
            OPTIONS
          </Typography>
          <FormControl>
            <Paper
              sx={{
                borderRadius: 3,
                paddingTop: 3,
                paddingBottom: 3,
                paddingLeft: 2,
                paddingRight: 2,
              }}
            >
              <Container>
                <FormGroup>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between;",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle1" component="span">
                      Letters (ex. abc):
                    </Typography>
                    <Switch checked={isLetter} onChange={handleLetterInput} />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between;",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle1" component="span">
                      Majuscule (ex.{" "}
                      <Typography
                        variant="subtitle1"
                        component="span"
                        color="greenyellow"
                      >
                        ABC
                      </Typography>
                      ):
                    </Typography>
                    <Switch checked={isUppercase} onChange={handleUppercase} />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between;",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle1" component="span">
                      Numbers (ex.{" "}
                      <Typography
                        variant="subtitle1"
                        component="span"
                        color="blueviolet"
                      >
                        123
                      </Typography>
                      ):
                    </Typography>
                    <Switch checked={isNumber} onChange={handleNumberInput} />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between;",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle1" component="span">
                      Special Chars (ex.{" "}
                      <Typography
                        variant="subtitle1"
                        component="span"
                        color="orange"
                      >
                        #$%&
                      </Typography>
                      ):
                    </Typography>
                    <Switch
                      checked={isSpecialChars}
                      onChange={handleSpecialCharsInput}
                    />
                  </Box>
                </FormGroup>
              </Container>
            </Paper>
          </FormControl>
        </Container>
      </Box>
    </>
  );
};

export default App;
