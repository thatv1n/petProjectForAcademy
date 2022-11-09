import React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

const Accordeon = ({ setData, ls }) => {
  const [min, setMin] = React.useState('');
  const [max, setMax] = React.useState('');
  const [count, setCount] = React.useState('');

  const ganarateExamples = () => {
    const arr = [];

    for (let i = 1; i <= count; i++) {
      for (let j = 1; j <= min; j++) {
        arr.push({ id: arr.length + 1, example: `${i}+${j}` });
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
          <Button variant="outlined" onClick={ganarateExamples}>
            Генерировать
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Accordeon;
