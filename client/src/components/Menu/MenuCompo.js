import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { OPEN_SIDEBAR } from "../../constants/actionTypes";

const useStyles = makeStyles((theme) => ({
  sidebarMenu: {
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
}));

const MenuCompo = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOpenSidebar = () => {
    dispatch({ type: OPEN_SIDEBAR });
  };

  return (
    <Button className={classes.sidebarMenu} onClick={handleOpenSidebar}>
      <MenuIcon fontSize="large" />
    </Button>
  );
};

export default MenuCompo;
