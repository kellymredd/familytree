const child = ({ related, member }) => {
  const spouseId = related.relations.find((rel) => rel.type === 'spouse').id;
  return [
    {
      type: 'child',
      relatedId: related.id,
      memberId: member.id,
      nullColumn: 'memberId',
    },
    {
      type: 'parent',
      relatedId: member.id,
      memberId: related.id,
      nullColumn: 'relatedId',
    },
    {
      type: 'child',
      relatedId: related.id,
      memberId: spouseId,
      nullColumn: 'memberId',
    },
    {
      type: 'parent',
      relatedId: spouseId,
      memberId: related.id,
      nullColumn: 'relatedId',
    },
  ];
};

const parent = ({ relatedId, memberId }) => {
  return [
    {
      type: 'child',
      relatedId,
      memberId,
    },
    {
      type: 'parent',
      relatedId: memberId,
      memberId: relatedId,
    },
  ];
};

const spouse = ({ relatedId, memberId }) => {
  return [
    {
      type: 'spouse',
      relatedId,
      memberId,
      nullColumn: 'memberId',
    },
    {
      type: 'spouse',
      relatedId: memberId,
      memberId: relatedId,
      nullColumn: 'relatedId',
    },
  ];
};

const assocHelpers = {
  child,
  parent,
  spouse,
};

export default assocHelpers;
