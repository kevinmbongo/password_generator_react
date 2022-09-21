import { ChangeEvent, useEffect, useState } from "react";
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
  const handlePasswordLength = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(Number(e.target.value));
    console.log(e);
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
      <div className="my-10 ">result: {pwd} </div>

      <div className="my-10 ">
        Niveau de securité du mot de passe: {pwdStrength}{" "}
      </div>

      <div className="my-10">
        <label>Size of Password (8 to 20 characters):</label>

        <input
          className="mx-10"
          type="number"
          defaultValue={passwordLength}
          onChange={handlePasswordLength}
          min="8"
          max="20"
        />

        <label>
          Letters:
          <input
            className="mx-10"
            type="checkbox"
            checked={isLetter}
            onChange={handleLetterInput}
          />
        </label>

        <label>
          Numbers:
          <input
            className="mx-10"
            type="checkbox"
            checked={isNumber}
            onChange={handleNumberInput}
          />
        </label>

        <label>
          Majuscule:
          <input
            className="mx-10"
            type="checkbox"
            checked={isUppercase}
            onChange={handleUppercase}
          />
        </label>

        <label>
          Special Chars:
          <input
            className="mx-10"
            type="checkbox"
            checked={isSpecialChars}
            onChange={handleSpecialCharsInput}
          />
        </label>
      </div>
    </>
  );
};

export default App;
