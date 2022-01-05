import React, { useState, useRef, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import { Box, Typography, Container, Paper, Button } from "@mui/material";
import arrayOfObjects from "./Component/Array";
import Start from "./Component/Start";
import Questions from "./Component/Questions";
import FullResult from "./Component/FullResult";
import AppBarr from "./Component/AppBarr";
import AttQue from "./Component/AttQue";

export default function App() {
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
  const [timer, setTimer] = useState();
  const num = 15;
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
    }
    const time = num - timer;
    let rAns = all.options
      .filter(function (element) {
        return element.isCorrect === true;
      })
      .map(function (el) {
        return el.answer;
      });
    setChoose([
      ...choose,
      { qn: id, question: all.ques, ans: answer, right: rAns, qtime: time },
    ]);
    if (Ref.current) {
      clearInterval(Ref.current);
    }
    setSelectedAnswer([...selectedAnswer, id]);
  };
  const ans = choose.map((user, index) => (
    <AttQue
      expanded={expanded}
      index={index}
      user={user}
      handleChange={handleChange}
    />
  ));

  // start Quiz
  const qstart = () => {
    setStart(false);
    clearTimer(getDeadTime());
  };
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
    setTimer("15");
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
    deadline.setSeconds(deadline.getSeconds() + 15);
    return deadline;
  };
  useEffect(() => {
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
        <Questions
          user={user}
          selectedAnswer={selectedAnswer}
          handleAnswerOptionClick={handleAnswerOptionClick}
        />
      );
    });

  return (
    <ThemeProvider theme={theme}>
      <Box mb={5}>
        <AppBarr score={score} />
        {showResult ? (
          <FullResult
            ans={ans}
            totalMarks={totalMarks}
            right={right}
            wrong={wrong}
            posi={posi}
            nega={nega}
            score={score}
          />
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
                <Start qstart={qstart} />
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
                        disabled={
                          !(
                            selectedAnswer[selectedAnswer.length - 1] ===
                            pageNumber + 1
                          )
                        }
                        size="large"
                        onClick={next}
                        color="secondary"
                      >
                        Next
                      </Button>
                    ) : pageNumber < arrayOfObjects.length ? (
                      <Button
                        variant="contained"
                        disabled={
                          !(
                            selectedAnswer[selectedAnswer.length - 1] ===
                            pageNumber + 1
                          )
                        }
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
