const Title = ({ name, classes }: { name: string; classes: string }) => {
  return name && <p className={classes}>{name}</p>;
};
export default Title;
