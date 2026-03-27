const Icon = ({ name, style }) => (
  <span
    className="material-symbols-outlined"
    style={{
      fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
      ...style,
    }}
  >
    {name}
  </span>
);

export default Icon;
