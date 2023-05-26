import classes from './Loader.module.scss';

const Loader = () => {
  return (
    <div className="centered">
      <div className={classes.spinner}></div>
    </div>
  );
};

export default Loader;
