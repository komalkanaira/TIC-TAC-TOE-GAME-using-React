import { useState } from "react";

export default function Player({ name, symbol, isActive, onChnagename }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playername, setIsplayername] = useState(name);
  let editableplayer = <span className="player-name">{playername}</span>;
  function handleclick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChnagename(symbol, playername);
    }
  }
  function handlechange(event) {
    setIsplayername(event.target.value);
  }

  if (isEditing) {
    editableplayer = (
      <input type="text" value={playername} onChange={handlechange} />
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="players">
        {editableplayer}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleclick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}