import * as React from "react";
import { useState } from "react";

import Graph from "react-graph-vis";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";

// Material UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

// Components
import ValidationRow from "./ValidationRow";
import StateTable from "./StateTable";

const heuristics = ["heuristic 1", "heuristic 2", "heuristic 3"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ m: 2, p: 2 }}>
        <DialogTitle>Import as Distractors</DialogTitle>
        {heuristics.map((heuristic) => {
          return <Typography>heuristic</Typography>;
        })}
        <Grid container>
          <Grid xs={6}>
            {" "}
            <Button onClick={handleClose}> Cancel</Button>{" "}
          </Grid>
          <Grid xs={6}>
            {" "}
            <Button onClick={handleClose}> Confirm</Button>{" "}
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function QuestionGenerator() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleQuestionAdd = (event) => {
    console.log("Question Add");
  };

  const handleQuestionDelete = (event) => {
    console.log("Question Delete");
  };

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
    },
    height: "640",
  };

  const validatedList = [
    "Symmetric encryption is a type of encryption where the same key is used for both encryption and decryption.",
    "It is also known as shared secret encryption or private key encryption.",
    "The key used in symmetric encryption must be kept secret to maintain the security of the encrypted data.",
    "Symmetric encryption is faster and more efficient than asymmetric encryption, but it requires secure key distribution.",
    "RC4 is a type of symmetric encryption algorithm.",
    "RC5 is a type of symmetric encryption algorithm.",
    "Blowfish is a type of symmetric encryption algorithm.",
    "AES is a type of symmetric encryption algorithm.",
  ];

  const [keyList, setKeyList] = useState([
    "RC4 is a type of asymmetric encryption algorithm.",
    "RC5 is a type of asymmetric encryption algorithm.",
    "Blowfish is a type of asymmetric encryption algorithm.",
    "AES is a type of symmetric encryption algorithm.",
  ]);

  const markdownQuestion =
    "Question: Which of the following encryption algorithms is an example of symmetric encryption in cybersecurity? \n \n A. RC4 \n \n B. RC5 \n \n C. AES \n \n D. Blowfish \n \n Answer: C. AES";

  const [graphState, setGraphState] = useState({
    nodes: [
      {
        id: "Cybersecurity",
        label: "Cybersecurity",
        property: "Context",
      },
      {
        id: "Symmetric Encryption",
        label: "Symmetric Encryption",
        property: "Concept",
      },
      {
        id: "Asymmetric Encryption",
        label: "Asymmetric Encryption",
        property: "Concept",
      },
      {
        id: "Hashing",
        label: "Hashing",
        property: "Concept",
      },
      {
        id: "Symmetric Encryption True-False 1",
        label: "True-False 1",
        property: "Question",
      },
      {
        id: "Symmetric Encryption True-False 2",
        label: "True-False 2",
        property: "Question",
      },
      {
        id: "Symmetric Encryption Multi-Choice 1",
        label: "Multi-Choice 1",
        property: "Question",
      },
    ],
    edges: [
      { from: "Cybersecurity", to: "Symmetric Encryption" },
      { from: "Symmetric Encryption", to: "Symmetric Encryption True-False 1" },
      { from: "Symmetric Encryption", to: "Symmetric Encryption True-False 2" },
      {
        from: "Symmetric Encryption True-False 1",
        to: "Symmetric Encryption Multi-Choice 1",
      },
      { from: "Cybersecurity", to: "Asymmetric Encryption" },
      { from: "Cybersecurity", to: "Hashing" },
    ],
  });

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Box>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      <Card sx={{ m: 4, p: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StateTable />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body1">
                  💡 1: Analyze, Symmetric encryption
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">💡 2: Evaluate, Hashing</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">
                  💡 3: Create, Symmetric encryption
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ m: 4, p: 4 }}>
            <Typography variant="h4"> Statements </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "80%" }} align="center">
                      Statement
                    </TableCell>
                    <TableCell sx={{ width: "20%" }} align="center">
                      Operation
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {validatedList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((statement) => {
                      return (
                        <ValidationRow
                          statement={statement}
                          handleClickOpen={handleClickOpen}
                          setSelectedValue={setSelectedValue}
                        ></ValidationRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={validatedList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ m: 4, p: 4 }}>
            <Typography variant="h4"> Keys & Selectors </Typography>
            <Grid container spacing={2}>
              {keyList.map((key) => {
                return (
                  <Grid item xs={6}>
                    <Item>{key}</Item>
                  </Grid>
                );
              })}
            </Grid>
            <Button
              variant="outlined"
              onClick={(event) => {
                handleQuestionDelete(event);
              }}
            >
              Generate Questions
            </Button>
          </Card>
          <Card sx={{ m: 4, p: 4 }}>
            <Box>
              <h3>Generated Questions</h3>
              <ReactMarkdown>{markdownQuestion}</ReactMarkdown>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    onClick={(event) => {
                      handleQuestionAdd(event);
                    }}
                  >
                    Add to Tree
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    onClick={(event) => {
                      handleQuestionDelete(event);
                    }}
                  >
                    Delete from Tree
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ m: 4, p: 4 }}>
        <h2>Question Tree</h2>
        <Graph graph={graphState} options={options} />
      </Card>
    </Box>
  );
}
