import { Box, BoxProps, Stack, Typography } from "@mui/material";
import useLocale from "../../hooks/useLocale";
import newsLogo from "../../assets/newsapi.svg";
import React from "react";
function Footer({ sx }: BoxProps) {
  const { translate } = useLocale();
  return (
    <Box sx={{ ...sx }}>
      <Stack
        sx={{
          justifyContent: "space-between",
          marginX: "60px",
          marginTop: "40px",
          alignContent: "center",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <Stack
          flexDirection={"row"}
          sx={{
            gap: "20px",
            whiteSpace: "nowrap",
          }}
        >
          <Typography variant="caption">
            {translate("pages.footer.login")}
          </Typography>
          <Typography variant="caption">
            {translate("pages.footer.about")}
          </Typography>
          <Typography variant="caption">
            {translate("pages.footer.publishers")}
          </Typography>
          <Typography variant="caption">
            {translate("pages.footer.sitemap")}
          </Typography>
        </Stack>
        <Stack>
          <Typography sx={{ textAlign: "center" }} variant="caption">
            {translate("pages.footer.powered")}
          </Typography>
          <img src={newsLogo} alt="News API" width="100%" />
        </Stack>
        <Typography variant="caption">
          {translate("pages.footer.copyright")}
        </Typography>
      </Stack>
    </Box>
  );
}

export default React.memo(Footer, () => true);
