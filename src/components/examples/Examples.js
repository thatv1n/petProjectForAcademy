import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';

const Examples = ({ data, isDel, delData }) => {
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
  return <>{mapData}</>;
};

export default Examples;
