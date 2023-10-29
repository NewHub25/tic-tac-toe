export const Square = ({ children, handleClick, isSelected }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};
//No hubo ningun error visto dentro de Vite con el cambio de nombre de 'Square' a 'square', pues me mostró el preview como si nada