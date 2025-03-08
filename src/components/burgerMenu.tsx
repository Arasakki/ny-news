import { slide as Menu } from "react-burger-menu";
import useLocale from "../hooks/useLocale";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function BurgerMenu() {
  const { translate } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const handlerOpen = () => {};
  const styles = {
    bmBurgerButton: {
      width: "36px",
      height: "30px",
      left: "0",
      top: "0",
    },

    bmMenuWrap: {
      position: "fixed",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      zIndex: "1100",

      background: "#FFFF",
    },
    bmMenu: {
      display: "flex",
      marginLeft: "20px",
    },
    bmItemList: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    bmItem: {
      marginBottom: "28px",
    },
  };
  return (
    <Menu
      isOpen={isOpen}
      customBurgerIcon={<MenuIcon onClick={handlerOpen} />}
      styles={styles}
    >
      <Typography variant="h4">{translate("menu.science")}</Typography>
      <Typography variant="h4">{translate("menu.general")}</Typography>
      <Typography variant="h4">{translate("menu.entertainment")}</Typography>
      <Typography variant="h4">{translate("menu.business")}</Typography>
      <Typography variant="h4">{translate("menu.health")}</Typography>
      <Typography variant="h4">{translate("menu.sports")}</Typography>
      <IconButton
        sx={{
          position: "fixed",
          top: 10,
          right: 10,
          width: "35px",
          height: "30px",
        }}
        onClick={() => setIsOpen(false)}
      >
        <CloseIcon sx={{ color: "#00000" }} />
      </IconButton>
    </Menu>
  );
}
