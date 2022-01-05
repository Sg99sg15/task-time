import React, {useState} from 'react'
import {
  Box,
  Typography,
  Container,
  Paper,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  TableBody,
} from "@mui/material";
import arrayOfObjects from "./Array";




function FullResult(props) {
 const {right,wrong, posi, nega, score, totalMarks, ans} = props;
    return (
        <>
        <Container
          sx={{ marginTop: "5%", padding: "2%" }}
          variant="outlined"
          component={Paper}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "5px",
            }}
          >
            <Typography
              variant="button"
              sx={{
                fontSize: "28px",
              }}
            >
              Your Result
            </Typography>
          </Box>
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
                  <TableCell align="center">Missed Question</TableCell>
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
                  <TableCell align="center">
                    {arrayOfObjects.length - (right + wrong)}
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "5px",
            }}
          >
            <Typography
              variant="button"
              sx={{
                fontSize: "28px",
              }}
            >
              Attempted Questions
            </Typography>
          </Box>

          {ans}
        </Container>
      </>
    )
}

export default FullResult
