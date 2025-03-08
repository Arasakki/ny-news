import { Box, CircularProgress } from "@mui/material";
export default function Loader() {
  return (
    <Box
      sx={{
        p: 5,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />;
    </Box>
  );
}
