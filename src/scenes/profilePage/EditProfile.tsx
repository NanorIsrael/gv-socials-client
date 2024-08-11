import { useState } from "react";
import {
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import {
  Formik,
  FormikHelpers,
} from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

import { UserI, iState, setLogin, setProfile } from "../../state";
import FlexBetween from "../../components/FlexBetween";
import { EditOutlined } from "@mui/icons-material";
const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

const profileSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  occupation: yup.string().required("required"),
  location: yup.string().required("required"),
});


interface IProfile {
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;
}
const ProfileEdit = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: iState) => state.user);
  const token = useSelector((state: iState) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:600px)");

  if (!user) {
    return null;
  }

  const profileInitialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    location: user?.location,
    occupation: user?.occupation,
  };
  const updateProfile = async (
    values: IProfile,
    onSubmitProp: FormikHelpers<IProfile>,
  ) => {
    const formData = new FormData();
    Object.entries(user).map(([key, value]) => formData.append(key, value));

    Object.entries(values).map(([key, value]) => {
      if (value !== "") {
        formData.set(key, value);
      }
    });

    if (values.photo && values.photo.name) {
      formData.append("photo", values.photo.name);
    }

    const savedUserResponse = await fetch(`${BASE_API_URL}/users/profile`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const savedUser = await savedUserResponse.json();
    onSubmitProp.resetForm();

    if (savedUser) {
      dispatch(
        setLogin({
          user: savedUser,
          token: token,
        }),
      );
    }
  };

  const handleFormSubmit = async (values: IProfile, onSubmitProp: {}) => {
    await updateProfile(values, onSubmitProp);
  };

  return (
    <Box
      width={isNonMobileScreens ? "50%" : "93%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={"1.5rem"}
      bgcolor={palette.background.alt}
    >
      <Typography fontWeight={"500"} variant="h5" sx={{ mb: "1.5rem" }}>
        Update Your Profile
      </Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={profileInitialValues}
        validationSchema={profileSchema}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
            setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display={"grid"}
              gap={"30px"}
              gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
              sx={{
                "& > div": {
                  gridColumn: isNonMobileScreens ? undefined : "span 4",
                },
              }}
            >
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
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      <input {...getInputProps()} />
                      {!values.photo ? (
                        <p>Add Profile Picture Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>
                            {values.photo.name}
                            <EditOutlined />
                          </Typography>
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
              <TextField
                label="First Name"
                onBlur={(e) => {
                  handleBlur(e);
                }}
                onChange={(e) => {
                  handleChange(e);
                }}
                value={values.firstName}
                name={"firstName"}
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Last Name"
                onBlur={(e) => {
                  handleBlur(e);
                }}
                onChange={handleChange}
                value={values.lastName}
                name={"lastName"}
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Location"
                onBlur={(e) => {
                  handleBlur(e);
                }}
                onChange={handleChange}
                value={values.location}
                name={"location"}
                error={Boolean(touched.location) && Boolean(errors.location)}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Occupation"
                onBlur={(e) => {
                  handleBlur(e);
                }}
                onChange={handleChange}
                value={values.occupation}
                name={"occupation"}
                error={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                }
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                width: "100%",
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": {
                  color: palette.primary.main,
                },
              }}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default ProfileEdit;
