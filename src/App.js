import React, { useState, useRef, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import {
  Avatar,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Paper,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  TableBody,
} from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import arrayOfObjects from "./Array";
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

export default function App() {
  const classes = useStyle();
  const [expanded, setExpanded] = useState(false);
  const [showResult, setshowResult] = useState(false);
  const [choose, setChoose] = useState([]);
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [posi, setPosi] = useState(0);
  const [nega, setNega] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([0]);
  const [users] = useState(arrayOfObjects.slice(0, arrayOfObjects.length));
  const [pageNumber, setPageNumber] = useState(0);
  const [start, setStart] = useState(true);

  // Accordian expand
  const handleChange = (open) => (event, isExpanded) => {
    setExpanded(isExpanded ? open : false);
  };

  // click to show Answer
  const handleAnswerOptionClick = (isCorrect, id, answer, all) => {
    if (isCorrect) {
      setScore(score + all.marks);
      setRight(right + 1);
      setPosi(posi + all.marks);
    } else {
      setScore(score - all.negative);
      setWrong(wrong + 1);
      setNega(nega + all.negative);

      let rAns = all.options
        .filter(function (element) {
          return element.isCorrect === true;
        })
        .map(function (el) {
          return el.answer;
        });
      setChoose([
        ...choose,
        { qn: id, question: all.ques, ans: answer, right: rAns },
      ]);
    }
    // if (Ref.current) {
    //   clearInterval(Ref.current);
    // }
    setSelectedAnswer([...selectedAnswer, id]);
  };
  const ans = choose.map((user, index) => (
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
                variant="outlined"
                color="error"
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
                variant="outlined"
                color="success"
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
  ));

  // start Quiz
  const qstart = () => {
    setStart(false);
    clearTimer(getDeadTime())
  }
  // Next Page
  const next = () => {
    setPageNumber((pre) => pre + 1);
    clearTimer(getDeadTime());
  };


  // Result page
  const result = () => {
    setshowResult(true);
  };

  // Total Marks [reduce method]
  const totalMarks = arrayOfObjects.reduce(
    (prevM, currM) => prevM + currM.marks,
    0
  );

  // FOr timer

  const Ref = useRef(null);
  const [timer, setTimer] = useState();
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    if (seconds === 0) {
      next();
    }

    return {
      total,
      seconds,
    };
  };
  const startTimer = (e) => {
    let { total, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(seconds > 9 ? seconds : "0" + seconds);
    }
  };
  const clearTimer = (e) => {
    setTimer("10");
    if (Ref.current) {
      clearInterval(Ref.current);
    }
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };
  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  };
  useEffect(() => {
    // clearTimer(getDeadTime());
    console.log(pageNumber);
    if (pageNumber === arrayOfObjects.length) {
      result();
    }
  }, [pageNumber]);
  // Render all questions [slice and map]

  const userPerPage = 1;
  const pageVisited = pageNumber * userPerPage;
  const displayQues = users
    .slice(pageVisited, pageVisited + userPerPage)
    .map((user) => {
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
                      // disabled={sec === 0 ? true : false}
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
      );
    });

  return (
    <ThemeProvider theme={theme}>
      <Box mb={5}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography
              variant="h6"
              onClick={() => window.location.reload()}
              component="div"
              style={{ flexGrow: 1 }}
            >
              Home
            </Typography>
            <Typography variant="h6" mr={5}>
              Score: {score}
            </Typography>
            <IconButton>
              <Avatar>S</Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
        {showResult ? (
          <>
            <Container
              sx={{ marginTop: "5%", padding: "2%" }}
              variant="outlined"
              component={Paper}
            >
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        Total Number of Questions
                      </TableCell>
                      <TableCell align="center">Right Answer</TableCell>
                      <TableCell align="center">Wrong Answer</TableCell>
                      <TableCell align="center">Postive Marks</TableCell>
                      <TableCell align="center">Negative Marks</TableCell>
                      <TableCell align="center">Marks Obtained</TableCell>
                      <TableCell align="center">Total Marks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        {arrayOfObjects.length}
                      </TableCell>
                      <TableCell align="center">{right}</TableCell>
                      <TableCell align="center">{wrong}</TableCell>
                      <TableCell align="center">{posi}</TableCell>
                      <TableCell align="center">{nega}</TableCell>
                      <TableCell align="center">{score}</TableCell>
                      <TableCell align="center">{totalMarks}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
            <Container
              sx={{ marginTop: "2%", padding: "2%" }}
              variant="outlined"
              component={Paper}
            >
              {ans}
            </Container>
          </>
        ) : (
          <Container maxWidth="md">
            <Box
              mt={5}
              mb={2}
              elevation={3}
              component={Paper}
              maxWidth="lg"
              p={1}
              textAlign="center"
            >
              <Typography variant="h5">Quiz</Typography>
            </Box>
            <Paper elevation={5} component={Box} p={2}>
              {start ? (
                <>
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', borderBottom: '2px solid black'}}>
                    <Typography sx={{ fontSize: '20px'}} variant="overline">Instruction</Typography>
                  </Box>
                  <Box sx={{ width: '100%', margin: '5px'}}>
                    <Typography variant="overline">Welcome to Quiz app. In this quiz have {arrayOfObjects.length} Questions. Each question in the quiz is of multiple-choice or "true or false" format. Each correct or incorrect response will result in appropriate feedback immediately at the end of all Questions. There will be negative marking on the basis of questions marks. The total score for the quiz is based on your responses to all questions.</Typography>
                  </Box>
                  <Box pt={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center', borderTop: '2px solid black'}}>
                  <Button  variant="contained"
                        size="medium"
                        onClick={qstart}
                        color="secondary">START Quiz</Button>
                  </Box>
                </>
              ) : (
                <>
                  <Box maxWidth="lg" textAlign="right">
                    <Button
                      variant="contained"
                      sx={{ textTransform: "none" }}
                      color="secondary"
                      size="small"
                    >
                      Time : {timer} sec
                    </Button>
                  </Box>
                  {displayQues}
                  <Box display="flex" sx={{ justifyContent: "flex-end" }} p={2}>
                   
                    {pageNumber < arrayOfObjects.length - 1 ? (
                      <Button
                        variant="contained"
                        disabled={!(selectedAnswer[selectedAnswer.length - 1] === (pageNumber + 1))}
                        size="large"
                        onClick={next}
                        color="secondary"
                      >
                        Next
                      </Button>
                    ) : pageNumber < arrayOfObjects.length ? (
                      <Button
                        variant="contained"
                        disabled={!(selectedAnswer[selectedAnswer.length - 1] === (pageNumber + 1))}
                        size="large"
                        onClick={result}
                        color="secondary"
                      >
                        Result
                      </Button>
                    ) : null}
                  </Box>
                </>
              )}
            </Paper>
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
}
