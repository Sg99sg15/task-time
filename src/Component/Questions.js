import React from 'react'
import {
  Box,
  Typography,
  Container,
  Paper,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";


const useStyle = makeStyles({
    container: {
      padding: "5px",
      margin: "10px",
    },
    box: {
      padding: "5px",
    },
  });
  


  function Questions({user, selectedAnswer, handleAnswerOptionClick}) {
    //   const {} = props;
    const classes = useStyle();
    return (
         <>
          <Container component={Paper} className={classes.container}>
            <Box className={classes.box}>
              <Typography>
                Question {user.qNo}: {user.ques}
              </Typography>
            </Box>
            <Box maxWidth="lg" mt={5} display="flex" justifyContent="center">
              <RadioGroup name="same">
                {user.options.map((item, index) => {
                  return (
                    <Button
                      style={{ border: "3px solid", margin: "5px" }}
                      size="small"
                      variant="outlined"
                      color={
                        selectedAnswer.includes(user.qNo) && item.isCorrect
                          ? "success"
                          : selectedAnswer.includes(user.qNo) &&
                            item.isCorrect === false
                          ? "error"
                          : "secondary"
                      }
                      key={index}
                    >
                      <FormControlLabel
                        value={item.answer}
                        control={
                          <Radio
                            disabled={selectedAnswer.includes(user.qNo)}
                            onClick={() =>
                              handleAnswerOptionClick(
                                item.isCorrect,
                                user.qNo,
                                item.answer,
                                user
                              )
                            }
                            color="secondary"
                          />
                        }
                        label={item.answer}
                      />
                    </Button>
                  );
                })}
              </RadioGroup>
            </Box>
          </Container>
        </>
    )
}

export default Questions
