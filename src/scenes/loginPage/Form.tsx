import { useState } from "react";
import { Box, useTheme, useMediaQuery, FormControl, Select, InputBase, MenuItem, Typography, TextField, Button } from "@mui/material";
import { Formik, FormikComputedProps, FormikFormProps, FormikHelpers } from "formik";
import * as yup from 'yup'
import { UseDispatch, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { EditOutlined } from "@mui/icons-material";

const registerSchema = ({
	firstName: yup.string().required("required"), 
	lastName: yup.string().required("required"),
	email: yup.string().email("invalid email").required("required"),
	password: yup.string().required("required"),
	location: yup.string().required("required"),
	occupation: yup.string().required("required"),
	picture: yup.string().required("required")
})

const loginSchema = ({
	email: yup.string().email("invalid email").required("required"),
	password: yup.string().required("required"),
})

const initialValuesRegister = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	location: "",
	occupation: "",
	picture: ""
}
const initialValuesLogin = {
	email: "",
	password: "",
}

type PageType = "login" | "register"
const Form = () => {
	const [ pageType, setPageType ] = useState<PageType>("register")
	const { palette } = useTheme();
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const isNonMobile = useMediaQuery("(min-width:600px)")
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
	const isLogin = pageType === "login"
	const isRegister = pageType === "register"

	interface ILogin {
		email: string;
		password: string;
	}

	interface IRegister {
		email: string;
		password: string;
	}
	const login = async (values: ILogin, onSubmitProp: FormikHelpers<ILogin>) => {
		
	}

	const register = async (values: [], onSubmitProp: FormikHelpers<IRegister>) => {
		console.log(values)
		const formData = new FormData()
		for (let val in values) {
			formData.append(val,  values[val])
		}
	}

	const handleFormSubmit  = async (values: {}, onSubmitProp: {}) => {
		if (isLogin) {
			await login(values, onSubmitProp)
			return
		}
		await register(values, onSubmitProp)
	}

	return (
		<Formik
		onSubmit={handleFormSubmit}
		initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
		validationSchema={isLogin ? loginSchema : registerSchema}
		>
		{

			({
				values,
				errors,
				touched,
				handleChange,
				handleSubmit,
				handleBlur,
				setFieldValue,
				resetForm
			}) => (
				<form onSubmit={handleSubmit}>
					<Box
					display={"grid"}
					gap={"30px"}
					gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
					sx={{
						"& > div": {
							gridColumn: isNonMobile ? undefined : "span 4"
						}
					}}
					>
						{isRegister && (
							<>
							<TextField
							label="First Name"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.firstName}
							name={"firstName"}
							error={Boolean(touched.firstName) && Boolean(errors.firstName)}
							sx={{ gridColumn: "span 2" }}
							/>
							<TextField
							label="Last Name"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.lastName}
							name={"lastName"}
							error={Boolean(touched.lastName) && Boolean(errors.lastName)}
							sx={{ gridColumn: "span 2" }}
							/>
							<TextField
							label="email"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.email}
							name={"email"}
							error={Boolean(touched.email) && Boolean(errors.email)}
							sx={{ gridColumn: "span 4" }}
							/>
							<TextField
							label="password"
							type={"password"}
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.password}
							name={"password"}
							error={Boolean(touched.password) && Boolean(errors.password)}
							sx={{ gridColumn: "span 4" }}
							/>
								<Box
								gridColumn={"span 4"}
								border={`1px solid ${palette.neutral.medium}`}
								borderRadius={"5px"}
								p="1rem"
								>
									<Dropzone
									multiple={false}
									onDrop={(acceptedFiles) => 
										setFieldValue("photo", acceptedFiles[0])
									}
									>
											{({
												getRootProps,
												getInputProps
											}) => (
												<Box
												{...getRootProps()}
												border={`2px dashed ${palette.primary.main}`}
												p="1rem"
												sx={{
													"&:hover": {
														cursor: "pointer"
													}
												}}
												>
													<input {...getInputProps()}/>
													{!values.picture ? (
														<p>Add Profile Picture Here (optional)</p>
													) : (
														<FlexBetween>
															<Typography>
																{values.picture.name}
																<EditOutlined/>
															</Typography>
														</FlexBetween>
													)}

												</Box>
											)}
									</Dropzone>
								</Box>
							</>
						)}
					
						{isLogin && (
							<>
							<TextField
							label="email"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.email}
							name={"email"}
							helperText={touched.email && errors.email}
							error={Boolean(touched.email) && Boolean(errors.email)}
							sx={{ gridColumn: "span 2"}}
							/>
							<TextField
							label="password"
							type="password"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.password}
							name={"password"}
							helperText={touched.password && errors.password}
							error={Boolean(touched.password) && Boolean(errors.password)}
							sx={{ gridColumn: "span 2"}}
							/>
								
							</>
						)}
					</Box>
					{/* BUTTONS */}
						<Box>
							<Button
							fullWidth
							type="submit"
							sx={{
								m: "2rem 0",
								p: "1rem",
								backgroundColor: palette.primary.main,
								color: palette.background.alt,
								"&:hover": {
									color: palette.primary.main
								}
							}}
							>
								{isLogin ? "login" : "register"}
							</Button>
							<Typography
								onClick={() => {
									setPageType(isLogin ? "register" : "login")
									resetForm()
								}}
								sx={{
									textDecoration: "underline",
									color: palette.primary.main,
									"&:hover": {
										cursor: "pointer",
										color: palette.primary.light
									}
								}}
								>
									{isLogin ? "Don't have an account? Sign Up here." :
									"Already have an account? login here."}

								</Typography>
						</Box>
				</form>
			)
			}
		</Formik> 
	)
}
export default Form;