import { Box } from "@mui/material";
const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

const UserImage = ({
  image,
  size = "60px",
}: {
  image: string;
  size: string;
}) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt={"user"}
        src={`${BASE_API_URL}/assets/${image}`}
      />
    </Box>
  );
};
export default UserImage;
