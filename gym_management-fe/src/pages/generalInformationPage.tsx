import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormControl,
  Grid,
  Avatar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  target: string;
  activity: string;
  profileImage?: File;
};

const schema = z.object({
  firstName: z.string().min(3, "First Name is required"),
  lastName: z.string().min(3, "Last Name is required"),
  target: z.string().min(1, "Target is required"),
  activity: z.string().min(1, "Activity is required"),
});

function GeneralInformation() {
  const [previewImage, setPreviewImage] = useState<string>(
    "/images/profile.png"
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      firstName: "Aditya",
      lastName: "Singh",
      target: "",
      activity: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data); // post
  };
  const target = watch("target");
  const activity = watch("activity");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar src={previewImage} sx={{ width: "40px", height: "40px" }} />
            <input
              accept="image/*"
              type="file"
              id="profile-image-upload"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <label htmlFor="profile-image-upload">
              <Button component="span">Edit</Button>
            </label>
          </Box>

          <Box sx={{ ml: 1, mb: 4 }}>
            <Typography variant="h6" fontSize="16px">
              Aditya Singh (Client)
            </Typography>
            <Typography variant="body1" fontSize="16px" fontWeight="300">
              adityyasinggh@gmail.com
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} sx={{ mt: -4 }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Box
            component="form"
            noValidate
            sx={{
              width: "100%",
              maxWidth: "700px",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoComplete="firstName"
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="lastName"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                mb: 2,
              }}
            >
              <InputLabel id="yourTargetLabel">Your Target</InputLabel>
              <Select
                labelId="yourTargetLabel"
                id="yourTarget"
                value={target || ""}
                label="Your Target"
                {...register("target")}
              >
                <MenuItem value="Lose weight">Lose weight</MenuItem>
                <MenuItem value="Gain weight">Gain weight</MenuItem>
                <MenuItem value="Improve flexibility">
                  Improve flexibility
                </MenuItem>
                <MenuItem value="General fitness">General fitness</MenuItem>
                <MenuItem value="Build Muscle">Build Muscle</MenuItem>
                <MenuItem value="Rehabilitation/Recovery">
                  Rehabilitation/Recovery
                </MenuItem>
              </Select>
              {errors.target && (
                <Typography color="error">{errors.target.message}</Typography>
              )}
            </FormControl>

            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                mb: 2,
              }}
            >
              <InputLabel id="activity">Preferable Activity</InputLabel>
              <Select
                labelId="activity"
                id="activity"
                value={activity || ""}
                label="Preferable Activity"
                {...register("activity")}
              >
                <MenuItem value="Yoga">Yoga</MenuItem>
                <MenuItem value="Climbing">Climbing</MenuItem>
                <MenuItem value="Strength training">Strength training</MenuItem>
                <MenuItem value="Cross-fit">Cross-fit</MenuItem>
                <MenuItem value="Cardio Training">Cardio Training</MenuItem>
                <MenuItem value="Rehabilitation">Rehabilitation</MenuItem>
              </Select>
              {errors.activity && (
                <Typography color="error">{errors.activity.message}</Typography>
              )}
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                width: "100%",
              }}
            >
              <Button
                type="submit"
                variant="outlined"
                disabled={!isValid}
                sx={{
                  borderRadius: "10px",
                  width: { xs: "100%", md: "auto" },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
//translate("Aditya","en")
export default GeneralInformation;