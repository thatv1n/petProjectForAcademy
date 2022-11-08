import React from 'react';

import ls from 'local-storage';

import './App.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

const styleAddBtn = {
  color: 'white',
  backgroundColor: 'green',
  fontSize: '15px',
  fontWeight: 'bold',
  border: '1px solid green',
  width: '160px',
};

const styleResetBtn = {
  color: 'white',
  backgroundColor: 'red',
  fontSize: '15px',
  fontWeight: 'bold',
  border: '1px solid red',
  width: '160px',
};

const styleRandomBtn = {
  color: 'white',
  backgroundColor: 'orange',
  fontSize: '15px',
  fontWeight: 'bold',
  border: '1px solid orange',
  width: '160px',
};

function App() {
  const [data, setData] = React.useState([]);
  const [valueInp, setValueInp] = React.useState('');
  const [isDel, setIsDel] = React.useState(false);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    if (ls.get('examples')) {
      setData(ls.get('examples'));
    } else {
      ls('examples', []);
    }
  };

  const delData = (id) => {
    const del = data.filter((item) => item.id !== id);
    setData(del);
    ls('examples', del);
  };

  const mapData = data.map((item, i) => (
    <div
      key={i}
      className={isDel ? 'exapmleDel' : 'exapmle'}
      onClick={() => isDel && delData(item.id)}>
      <div>
        {isDel && (
          <span style={{ position: 'relative', left: '-10px' }}>
            <ClearIcon />
          </span>
        )}{' '}
        {`${item.example} = __`}
      </div>
    </div>
  ));

  const randomData = data
    .map(function (elem, index) {
      return [elem, Math.random()];
    })
    .sort(function (a, b) {
      return a[1] - b[1];
    })
    .map(function (elem) {
      return elem[0];
    });

  const getRandomData = () => {
    setData(randomData);
  };

  const addData = () => {
    const lcData = ls.get('examples');
    if (valueInp.length) {
      const newArr = [
        ...lcData,
        {
          id: lcData.length + 1,
          example: valueInp,
        },
      ];
      ls('examples', newArr);
      setData(ls.get('examples'));
    }
    setValueInp('');
    document.querySelector('#outlined-basic').focus();
  };

  const pressEnter = (e) => {
    if (e.keyCode === 13) {
      addData();
    }
  };

  const resetLc = () => {
    ls('examples', []);
    setData([]);
  };

  return (
    <div className="App">
      <div className="form">
        <div className="input">
          <TextField
            id="outlined-basic"
            label="Введите пример : 1+2"
            variant="outlined"
            onChange={(e) => setValueInp(e.target.value)}
            value={valueInp}
            onKeyDown={(e) => pressEnter(e)}
          />
        </div>
        <div className="groupButtons">
          <Button variant="outlined" onClick={(e) => addData(e)} style={styleAddBtn}>
            Добавить
          </Button>
          <Button variant="outlined" onClick={getRandomData} style={styleRandomBtn}>
            Рандом
          </Button>
        </div>
        <div className="groupButtons">
          <Button variant="outlined" onClick={() => setIsDel((isDel) => !isDel)}>
            Редактировать
          </Button>
          <Button variant="outlined" onClick={resetLc} style={styleResetBtn}>
            Очистить все
          </Button>
        </div>
      </div>

      <div className="content">{mapData}</div>
    </div>
  );
}

export default App;
