import {
  Box,
  useTheme,
  useMediaQuery,
  FormControl,
  Select,
  InputBase,
  MenuItem,
  Typography,
} from "@mui/material";
import { setLogout } from "../../state";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        width={"100%"}
        bgcolor={theme.palette.background.alt}
        p={"1rem 6%"}
        textAlign={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={"32px"} color={"primary"}>
          Gv Socials
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p={"2rem"}
        m={"2rem auto"}
        borderRadius={"1.5rem"}
        bgcolor={theme.palette.background.alt}
      >
        <Typography fontWeight={"500"} variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Gv Socials, the Social Media for GV Tech!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};
export default LoginPage;
