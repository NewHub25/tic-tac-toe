import { AVATARS, TURNS } from "../constants.js";
import { audioClick } from "../music.js";
import { Square } from "./Square.jsx";

const AvatarDialog = ({ player, setBoard, setTurn }) => {
  return (
    <dialog>
      <button
        className="close-btn"
        onClick={(e) => e.currentTarget.parentElement.close()}
      >
        {"< volver"}
      </button>
      <section className="avatars">
        {AVATARS.map((emoji, index) => {
          return (
            <Square
              key={index}
              handleClick={(e) => {
                audioClick.play();
                const temp = TURNS[player];
                TURNS[player] = emoji;
                setTurn(TURNS[player]);
                setBoard((prev) =>
                  prev.map((prevEmoji) =>
                    prevEmoji === temp ? emoji : prevEmoji
                  )
                );
                e.currentTarget.parentElement.parentElement.close();
              }}
            >
              {emoji}
            </Square>
          );
        })}
      </section>
    </dialog>
  );
};
export default AvatarDialog;
