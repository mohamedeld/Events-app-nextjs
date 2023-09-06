import Link from "next/link";
import classes from "./Button.module.css";
const Button = ({ link, onClick, children }) => {
  if (link) {
    return (
      <Link href={link} className={classes.btn}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={classes.btn} onClick={onClick}>
        {children}
      </button>
    );
  }
};

export default Button;
