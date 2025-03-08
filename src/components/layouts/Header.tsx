import { Box, BoxProps, Divider, Stack, Typography } from "@mui/material";
import useLocale from "../../hooks/useLocale";
import BurgerMenu from "../burgerMenu";
import React from "react";
function Header({ sx }: BoxProps) {
  const { translate } = useLocale();
  return (
    <Box sx={{ ...sx }}>
      <Stack sx={{ position: "absolute", zIndex: "900" }}>
        <BurgerMenu />
      </Stack>

      <Stack
        flexDirection={"row"}
        sx={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ margin: "auto" }}>
          {translate("pages.title")}
        </Typography>
      </Stack>
      <Divider />
    </Box>
  );
}
export default React.memo(Header, () => true);
