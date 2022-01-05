import React from 'react'

import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";



function AttQue({expanded, index, user, handleChange}) {
    return (
        <>
        <Accordion
          expanded={expanded === index}
          onChange={handleChange(index)}
          key={index}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="pan1a-content"
            id="pan1a-header"
          >
            <Button
              variant="outlined"
              sx={{ textTransform: "none", marginRight: "10px" }}
              color="secondary"
              size="small"
            >
              Time taken: {user.qtime} sec
            </Button>
            <Typography>Question {user.qn}:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{user.question}</Typography>
            <Box
              maxWidth="lg"
              mt={5}
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Typography>Your selected answer :</Typography>
              <RadioGroup name="same">
                <Button
                  style={{ border: "3px solid", margin: "5px" }}
                  size="small"
                  disabled
                  variant="outlined"
                  color="secondary"
                  key={index}
                >
                  <FormControlLabel
                    value={user.ans}
                    control={<Radio disabled color="secondary" />}
                    label={user.ans}
                  />
                </Button>
              </RadioGroup>
              <Typography>Right answer is:</Typography>
              <RadioGroup name="same">
                <Button
                  style={{ border: "3px solid", margin: "5px" }}
                  size="small"
                  disabled
                  variant="outlined"
                  color="secondary"
                  key={index}
                >
                  <FormControlLabel
                    value={user.right}
                    control={<Radio disabled color="secondary" />}
                    label={user.right}
                  />
                </Button>
              </RadioGroup>
            </Box>
          </AccordionDetails>
        </Accordion>
      </>
    )
}

export default AttQue
