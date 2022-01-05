import React from 'react';
import {
    Button,
    Box,
    Typography,
  } from "@mui/material";
import arrayOfObjects from "./Array";


function Start(props) {
    const {qstart} = props;
    return (
        <>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            borderBottom: "2px solid black",
          }}
        >
          <Typography sx={{ fontSize: "20px" }} variant="overline">
            Instruction
          </Typography>
        </Box>
        <Box sx={{ width: "100%", margin: "5px" }}>
          <Typography variant="overline">
            Welcome to Quiz app. In this quiz have{" "}
            {arrayOfObjects.length} Questions. Each question in the
            quiz is of multiple-choice format. Each Question have fix time to choose answer. Each
            correct or incorrect response will result in appropriate
            feedback immediately at the end of all Questions. There
            will be negative marking on the basis of questions marks.
            The total score for the quiz is based on your responses to
            all questions.
          </Typography>
        </Box>
        <Box
          pt={2}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            borderTop: "2px solid black",
          }}
        >
          <Button
            variant="contained"
            size="medium"
            onClick={qstart}
            color="secondary"
          >
            START Quiz
          </Button>
        </Box>
      </>
    )
}

export default Start
