import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../controls';

function Item({ member }) {
  return (
    <Link to={`/${member.id}`} title={`View ${member.firstName}'s profile`}>
      {member.lastName}, {member.firstName} {member.middleName}
    </Link>
  );
}

export default function Collapsable({ member }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <header style={{ position: 'sticky' }}>
        <h4>
          <Button btnStyle="link" onClick={() => setCollapsed((prev) => !prev)}>
            <i
              className={collapsed ? 'fa fa-caret-right' : 'fa fa-caret-down'}
            ></i>{' '}
            {member.header}
          </Button>
        </h4>
      </header>
      {!collapsed
        ? member.members.map((sub, subIdx) => (
            <Item member={sub} key={subIdx} />
          ))
        : null}
    </>
  );
}
