export const Square = ({ children, handleClick, isSelected }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};
