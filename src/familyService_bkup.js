import rootsProject from "../config";

const { userDbCollection, SafeGET } = rootsProject();
let parentTree = {};
async function fetchParentsRecursive({ member, parent = {}, idx = 0 }) {
  // `Parents` is an array of IDs
  const pRef = await userDbCollection.where("id", "in", member.Parents).get();
  const parents = pRef.docs.map((doc) => doc.data());
  const updatedMember = { ...member, lineage: parents };

  if (!parentTree.hasOwnProperty("FirstName")) {
    parentTree = updatedMember;
  }

  parent.lineage = parent?.lineage?.map((lin, index) => {
    if (index === idx) {
      return updatedMember;
    }
    return lin;
  });

  if (parents) {
    updatedMember.lineage.forEach((p, idx) =>
      p.Parents.length
        ? fetchParentsRecursive({
            member: p,
            parent: updatedMember,
            idx
          })
        : []
    );
  }

  //if (parent?.Parents?.length === idx + 1) {
  //console.log(parentTree);
  //return parentTree;
  //}
}

const HttpFamilyService = () => {
  const listFamily = async (user) => {
    if (!SafeGET) {
      return [];
    }

    const { Parents, Spouse, id = "" } = user;

    let parents, spouse, children, siblings;
    if (Parents.length) {
      parents = await userDbCollection.where("id", "in", Parents).get();
    }

    if (Spouse) {
      spouse = await userDbCollection.where("id", "==", Spouse).get();
    }

    children = await userDbCollection
      .where("Parents", "array-contains-any", [id])
      .get();

    if (user.Parents.length) {
      siblings = await userDbCollection
        .where("Parents", "array-contains-any", [...user.Parents])
        //.where("id", "!=", user.id) // requires an index in the db
        .get();
    }

    const fam = await Promise.all([parents, spouse, children, siblings]);
    return fam.map((doc) => doc?.docs?.map((doc) => doc.data()));
  };

  const getFamilyTree = async ({ contextMember }) => {
    // fetch family in context of logged in person (eventually the person selected)
    // recursively fetch parents
    let x = await fetchParentsRecursive({
      member: contextMember
    });

    console.log("returned", x);
    return [];
  };

  return {
    listFamily,
    getFamilyTree
  };
};

export default HttpFamilyService;
