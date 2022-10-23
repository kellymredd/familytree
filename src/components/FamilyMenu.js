import React, { useEffect, useState } from 'react';
import useMembers from '../hooks/useMembers.hook';
import useSortMenu from '../hooks/useSortMenu.hook';
import CreateButtonScreenCombo from '../shared/CreateButtonScreenCombo';
import Collapsable from './Collapsable';

export default function FamilyMenu() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState(null);
  const [count, setCount] = useState(0);
  const { getMembers } = useMembers();
  const sortMenu = useSortMenu();

  useEffect(() => {
    async function fetch() {
      const response = await getMembers().catch((error) => console.log(error));
      const orgd = await sortMenu(response.rows);

      setMembers(orgd);
      setCount(response.count);
      setLoading(false);
    }

    setLoading(true);
    fetch();
  }, []);

  return (
    <div className="familyMenu flex">
      <p>
        <span>Family Members</span>
        <span>({count})</span>
      </p>
      <div className="familyMenuOverflow">
        <ul>
          {members ? (
            members?.map((member, idx) => (
              <li key={idx}>
                <Collapsable member={member} />
              </li>
            ))
          ) : !loading ? (
            <li className="noMembersFound">
              <p>No Members found for your family.</p>
              <CreateButtonScreenCombo buttonText="Add one here" />
            </li>
          ) : (
            <li>
              <p style={{ color: '#fff', padding: '15px' }}>
                Loading Members...
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
