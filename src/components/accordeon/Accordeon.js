import React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import TextField from '@mui/material/TextField';

const Accordeon = ({ setData, ls }) => {
  const [min, setMin] = React.useState('');
  const [max, setMax] = React.useState('');
  const [count, setCount] = React.useState('');

  const ganarateExamples = () => {
    const arr = [];
    let option = [];
    const checkboxes = document.getElementsByName('option');

    for (const checkbox of checkboxes) {
      if (checkbox.checked) {
        option.push(checkbox.value);
      }
    }
    if (option.length) {
      if (option.length > 1) {
        for (let i = 1; i <= count; i++) {
          for (let j = 1; j <= min; j++) {
            if (option[i] !== '-' && i > j) {
              for (let y = 0; y < 2; y++)
                arr.push({ id: arr.length + 1, example: `${i}${option[y]}${j}` });
            } else {
              arr.push({ id: arr.length + 1, example: `${i}+${j}` });
            }
          }
        }
      } else {
        for (let i = 1; i <= count; i++) {
          for (let j = 1; j <= min; j++) {
            if (option[i] !== '-' && i > j) {
              for (let y = 0; y < 2; y++)
                arr.push({ id: arr.length + 1, example: `${i}${option}${j}` });
            }
          }
        }
      }
    }

    const randomData = arr
      .map(function (elem, index) {
        return [elem, Math.random()];
      })
      .sort(function (a, b) {
        return a[1] - b[1];
      })
      .map(function (elem) {
        return elem[0];
      })
      .splice(0, count);

    setData(randomData);
    ls('examples', randomData);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography>Генерация примеров</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="inputField">
            <TextField
              id="standard-basic"
              label="Мин. значение"
              variant="standard"
              onChange={(e) => setMin(e.target.value)}
              value={min}
            />
          </div>
          <div className="inputField">
            <TextField
              id="standard-basic"
              label="Макс. значение"
              variant="standard"
              onChange={(e) => setMax(e.target.value)}
              value={max}
            />
          </div>
          <div className="inputField">
            <TextField
              id="standard-basic"
              label="Кол-во примеров"
              variant="standard"
              onChange={(e) => setCount(e.target.value)}
              value={count}
            />
          </div>
          <div className="checkboxGroup">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Сложение"
                name="option"
                value="+"
              />
              <FormControlLabel control={<Checkbox />} label="Вычитание" name="option" value="-" />
            </FormGroup>
          </div>
          <Button variant="outlined" onClick={ganarateExamples}>
            Генерировать
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Accordeon;
