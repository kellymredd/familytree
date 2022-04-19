import rootsProject from "../config/config";

const { userDbCollection, SafeGET } = rootsProject();
let parentTree = {};
let childrenTree = {};
// let currentId;

async function fetchChildren(parents) {
  //let spouse = null;
  let children;

  // fetch spouse
  // todo: should we only fetch for MALE members? we only need 1 member to provide the spouse
  // if (member.Spouse) {
  //   spouse = await userDbCollection.where("id", "==", member.Spouse).get();
  // }
  console.log(parents);

  // fetch siblings
  if (parents.Parents.length) {
    const sRef = await userDbCollection
      .where("Parents", "array-contains-any", [...parents.Parents])
      .get();
    children = sRef?.docs.map((doc) => doc.data());
  }

  return {
    ...parents,
    childrenTree: children
  };
}

async function fetchChildrenRecursive({ parents, parent = {}, idx = 0 }) {
  const updatedMember = await fetchChildren(parents);

  parent.childrenTree = parent?.childrenTree?.map((lin, index) => {
    if (index === idx) {
      return updatedMember;
    }
    return lin;
  });

  // still need to fetch parents of newly fetched siblings (not children) here
  if (updatedMember.childrenTree.length) {
    updatedMember.childrenTree.forEach((p, idx) =>
      fetchChildrenRecursive({
        member: p,
        parent: updatedMember,
        idx
      })
    );
    return childrenTree;
  } else {
    // this never fires
    return childrenTree;
  }
}

async function fetchParents(member) {
  let parents = [];

  // fetch parents
  if (member.Parents.length) {
    const pRef = await userDbCollection.where("id", "in", member.Parents).get();
    parents = pRef?.docs.map((doc) => doc.data());
  }

  return {
    ...member,
    lineageTree: parents
  };
}

async function fetchParentsRecursive({ member, parent = {}, idx = 0 }) {
  // currentId = member.id;
  const updatedMember = await fetchParents(member);

  if (!parentTree.hasOwnProperty("FirstName")) {
    parentTree = updatedMember;
  }

  parent.lineageTree = parent?.lineageTree?.map((lin, index) => {
    if (index === idx) {
      return updatedMember;
    }
    return lin;
  });

  if (updatedMember.Parents.length) {
    updatedMember.lineageTree.forEach((p, idx) =>
      fetchParentsRecursive({
        member: p,
        parent: updatedMember,
        idx
      })
    );
    return parentTree;
  } else {
    // this never fires
    return parentTree;
  }
}

function invertTree(tree) {
  var newObject = {};

  // let loop = (node) => {
  //   for (const [key, value] of Object.entries(node)) {
  //     console.log(key, value);
  //     if (key === "lineageTree") {
  //       loop(value); // array
  //     }
  //   }
  // };

  function loop(tree) {
    // console.log(tree);
    if (tree?.lineageTree) {
      tree.lineageTree.forEach((lin) => {
        console.log(lin);
        if (lin.lineageTree.length) {
          loop(lin.lineageTree);
        }
        //return [];
      });
    }
  }

  loop(tree);

  // var keys = [];

  // for (var key in tree) {
  //   keys.push(key);
  // }

  // for (var i = keys.length - 1; i >= 0; i--) {
  //   var value = tree[keys[i]];
  //   newObject[keys[i]] = value;
  // }

  return newObject;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const HttpFamilyService = () => {
  const listFamily = async (user) => {
    if (!SafeGET) {
      return [];
    }

    const { Parents, Spouse, id = "" } = user;

    let parents, spouse, children, siblings;
    if (Parents?.length) {
      parents = await userDbCollection.where("id", "in", Parents).get();
    }

    if (Spouse) {
      spouse = await userDbCollection.where("id", "==", Spouse).get();
    }

    children = await userDbCollection
      .where("Parents", "array-contains-any", [id])
      .get();

    if (user?.Parents?.length) {
      siblings = await userDbCollection
        .where("Parents", "array-contains-any", [...user.Parents])
        //.where("id", "!=", user.id) // requires an index in the db
        .get();
    }

    const fam = await Promise.all([parents, spouse, children, siblings]);
    return fam.map((doc) => doc?.docs?.map((doc) => doc.data()));
  };

  // const traverse = (root) => {
  //   root.children.forEach((child) => {
  //     console.log(child.value)
  //     traverse(child)
  //   })
  // }

  const getFamilyTree = async ({ contextMember }) => {
    // fetch family in context of logged in person (eventually the person selected)
    // let previousId;
    // const tree = await fetchParentsRecursive({
    //   member: contextMember
    // });
    // var sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
    // var poll = (promiseFn, time) =>
    //   promiseFn().then(sleep(time).then(() => poll(promiseFn, time)));
    // return poll(
    //   () =>
    //     new Promise(() => {
    //       console.log(previousId, currentId);
    //       if (previousId !== currentId) {
    //         previousId = currentId;
    //       } else {
    //         console.log("fired");
    //         return tree;
    //       }
    //     }),
    //   1000
    // );

    // separate code
    // return delay(1000).then(() => {
    //   console.log(previousId, currentId);
    //   if (previousId !== currentId) {
    //     previousId = currentId;
    //     delay(1000);
    //   } else {
    //     return tree;
    //   }
    // });
    //}

    // separate code
    // const poll = window.setInterval(() => {
    //   if (currentId === previousId) {
    //     clearInterval(poll);
    //     return delay(1000).then(function () {
    //       return response;
    //     });
    //   }
    //   previousId = currentId;
    // }, 100);
    // });

    const tree = await fetchParentsRecursive({
      member: contextMember
    });
    const finalParentTree = await delay(1000).then(() => tree);

    const invertedParentTree = invertTree(finalParentTree);
    console.log(invertedParentTree);

    // const childrenTree = [finalParentTree].map(async (parents) => {
    //   const childfoo = await fetchChildrenRecursive({ parents });
    //   console.log(childfoo);
    //   return childfoo;
    // });
    // console.log(finalTree);

    return [];
    /**
     *
     *
     *
     * the code below is the GOAT, leave it alone
     *
     */

    // this wrks!
    // recursively fetch parents
    // const tree = await fetchParentsRecursive({
    //   member: contextMember
    // });
    // return delay(1000).then(() => tree);
  };

  return {
    listFamily,
    getFamilyTree
  };
};

export default HttpFamilyService;
