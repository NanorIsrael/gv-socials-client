
  import {
	Typography,
	useTheme,
  } from "@mui/material";

  import FlexBetween from "../../components/FlexBetween";
  import WidgetWrapper from "../../components/WidgetWrapper";

  const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

  
  const AdvertWidget = () => {
	const { palette } = useTheme();
	const dark = palette.neutral.dark;
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;
	
	return (
		<WidgetWrapper>
			<FlexBetween>
				<Typography color={dark} variant="h5" fontWeight={500}>
				Sponsored
				</Typography>
				<Typography color={dark}>Create Ad</Typography>
			</FlexBetween>
			<img 
			src={`${BASE_API_URL}/assets/info4.jpeg`}
			width={"100%"}
			height={"auto"}
			alt={"advert"}
			style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
			/>
			<FlexBetween>
				<Typography color={main}>
					Gv Tech Cosmetics
				</Typography>
				<Typography color={medium}>GvTech.com</Typography>
			</FlexBetween>
			<Typography color={medium} m={"0.5rem 0"}>
				Your pathway to stunning and immaculate beauty, ensures your skin
				is exfoliating and shining like light.
			</Typography>
		</WidgetWrapper>
	)
  }
  export default AdvertWidget;