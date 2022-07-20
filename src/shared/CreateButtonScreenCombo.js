import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../controls";
import CreateScreen from "../member/CreateScreen";
import defaultMember from "../utils/initialMember";
import useMembers from "../hooks/useMembers.hook";

export default function CreateButtonScreenCombo({ buttonText }) {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const { saveMember } = useMembers();

  function handleOpenModal(e) {
    e.preventDefault();
    setModalOpen(true);
  }

  function cancelMember() {
    setModalOpen(false);
  }

  function save(form) {
    //reroute to edit screen
    saveMember({ member: form }).then(() => history.push("/:id/edit"));
  }

  return (
    <>
      <Button onClick={(e) => handleOpenModal(e)}>{buttonText}</Button>
      {modalOpen && <div className="my-modal-cover"></div>}
      {modalOpen && (
        <div className="my-modal">
          <CreateScreen
            initialMember={defaultMember}
            handleCancel={cancelMember}
            handleSave={save}
            handleSaveById={null}
            memberType={null}
            contextMember={null}
          />
        </div>
      )}
    </>
  );
}
