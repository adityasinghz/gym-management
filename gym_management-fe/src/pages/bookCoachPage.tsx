import React, { useEffect, useState } from "react";
import Testimonials from "../components/Testimonials.tsx";
import { Grid, Typography } from "@mui/material";
import TimeSlotSelector from "../components/Slots.tsx";
import BookWorkoutProfileCard from "../components/bookWorkoutProfileCard.tsx";
import { useLocation, Navigate } from "react-router-dom";
import CalenderComponent from "../components/CalenderComponent.tsx";
import SessionCard from "../components/SessionCard.tsx";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { bookWorkout, getBookedWorkoutsByUsers } from "../services/workoutService.ts";
import { useSnackbar } from "notistack";

interface BookedWorkout {
  _id: string;
  userId: string;
  coachId: string;
  date: string;
  time: string;
  activity: string;
}

const BookCoachPage: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const location = useLocation();
  const coach = location.state?.coach;
  const availableSlots = coach.timeSlots;
  const user = useSelector((state: RootState) => state.user);
  const userId = user.id;
  const activity = user.activity;
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 6, 3));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookedWorkouts, setBookedWorkouts] = useState<BookedWorkout[]>([]);

  useEffect(() => {
    const fetchBookedWorkouts = async () => {
      try {
        const response = await getBookedWorkoutsByUsers(userId);
        setBookedWorkouts(response);
      } catch (error) {
        console.error("Error fetching booked workouts:", error);
      }
    };
    fetchBookedWorkouts();
  }, [userId]);

  console.log("bookedWorkouts", bookedWorkouts);
  const handleSlotSelection = (slot: string) => {
    setSelectedSlot(slot);
  };
  if (!coach) {
    return <Navigate to="/coaches" replace />;
  }

  return (
    <Grid container spacing={2}>
      <BookWorkoutProfileCard
        selectedSlot={selectedSlot}
        selectedDate={format(selectedDate, "MMM d, yyyy")}
        coach={coach}
        onSelect={async (coachId: string) => {
          if (selectedSlot && selectedDate) {
            console.log("Booking:", {
              date: format(selectedDate, "MMM d, yyyy"),
              slot: selectedSlot,
              coach: coachId,
              activity: user.activity
            });
            try {
              const response = await bookWorkout(userId, coachId, format(selectedDate, "MMM d, yyyy"), selectedSlot, activity);
              console.log(response);
              enqueueSnackbar("Workout booked successfully", { variant: "success" });
            } catch (error) {
              enqueueSnackbar("This slot is already booked", { variant: "error" });
              console.error("Error booking workout:", error);
            }
          }
        }}
      />
      <Grid item xs={12} md={9} sx={{ padding: "2 rem" }}>
        <Grid
          container
          spacing={1}
          display="flex"
          justifyContent="space-between"
        >
          <Grid item xs={12} md={12}>
            <Typography variant="body2">SCHEDULE YOUR SESSION</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <CalenderComponent
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TimeSlotSelector
              date={format(selectedDate, "MMM d")}
              availableSlots={availableSlots}
              onSelect={handleSlotSelection}
            />
          </Grid>
          <Grid item xs={12} md={12} display="flex" marginTop="10px">
            <Typography variant="body2">YOUR UPCOMING WORKOUTS</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
          >
            {bookedWorkouts.map((workout, index) => (
              <SessionCard
              key={workout.time + index}
                title={workout.activity}
                date={workout.date}
                time={workout.time}
                duration="1 hour"
              />
            ))}
          </Grid>
          <Grid item xs={12} md={12} display="flex" marginTop="10px">
            <Typography variant="body2">FEEDBACK</Typography>
          </Grid>
          <Grid item xs={12} md={12} display="flex" justifyContent="flex-start">
            <Testimonials />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BookCoachPage;
