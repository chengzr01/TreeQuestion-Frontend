import * as React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import TreeSelector from "./tree/TreeSelector";
import QuestionView from "./question/QuestionView";
import ConsoleIndex from "./console/ConsoleIndex";
import TreeIndex from "./tree/TreeIndex";
import ClickableNode from "./tree/diagram/ClickableNode";

const STATE = { INACTIVE: 0, ACTIVE: 1, CORRECT: 2, WRONG: 3 };

const nodeTypes = { clickable: ClickableNode };

export default function AnswerIndex() {
  const [activeTree, setActiveTree] = useState({
    id: 1,
    nodes: [
      {
        id: "1",
        type: "clickable",
        draggable: false,
        position: { x: 0, y: 0 },
        data: { label: "Question ID.1", state: STATE.CORRECT },
      },
      {
        id: "2",
        type: "clickable",
        draggable: false,
        position: { x: 0, y: 0 },
        data: { label: "Question ID.2", state: STATE.CORRECT },
      },
      {
        id: "3",
        type: "clickable",
        draggable: false,
        position: { x: 0, y: 0 },
        data: { label: "Question ID.3", state: STATE.ACTIVE },
      },
      {
        id: "4",
        type: "clickable",
        draggable: false,
        position: { x: 0, y: 0 },
        data: { label: "Question ID.4", state: STATE.WRONG },
      },
      {
        id: "5",
        type: "clickable",
        draggable: false,
        position: { x: 0, y: 0 },
        data: { label: "Question ID.5", state: STATE.INACTIVE },
      },
      {
        id: "6",
        type: "clickable",
        draggable: false,
        position: { x: 0, y: 0 },
        data: { label: "Question ID. 6", state: STATE.INACTIVE },
      },
      {
        id: "7",
        type: "clickable",
        draggable: false,
        position: { x: 0, y: 0 },
        data: { label: "Question ID. 7", state: STATE.INACTIVE },
      },
      {
        id: "8",
        type: "clickable",
        draggable: false,
        position: { x: 0, y: 0 },
        data: { label: "Question ID. 8", state: STATE.INACTIVE },
      },
      {
        id: "9",
        type: "clickable",
        draggable: false,
        position: { x: 0, y: 0 },
        data: { label: "Question ID. 9", state: STATE.INACTIVE },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e2-3", source: "2", target: "3" },
      { id: "e2-4", source: "2", target: "4" },
      { id: "e1-5", source: "1", target: "5" },
      { id: "e5-9", source: "5", target: "9" },
      { id: "e4-6", source: "4", target: "6" },
      { id: "e6-7", source: "6", target: "7" },
      { id: "e6-7", source: "6", target: "8" },
    ],
  });

  const [activeQuestion, setActiveQuestion] = useState({
    id: 3,
    stem: "What is the process of implementing symmetric encryption to protect sensitive data?",
    options: [
      "A. Selecting a different key for encryption and decryption",
      "B. Sharing the key with unauthorized parties",
      "C. Choosing an appropriate algorithm and key size",
      "D. Storing the key in a public location",
    ],
  });

  const [activeMessageList, setActiveMessageList] = useState([
    {
      text: "Question 1: You are right! Next Question: Question 2.",
      label: "right",
    },
    {
      text: "Question 2: You are right! Next Question: Question 4.",
      label: "right",
    },
    {
      text: "Question 4: You are wrong! Next Question: Question 3.",
      label: "wrong",
    },
  ]);

  const handleSubmit = () => {
    setActiveTree({
      id: 1,
      nodes: [
        {
          id: "1",
          type: "clickable",
          draggable: false,
          position: { x: 0, y: 0 },
          data: { label: "Question ID.1", state: STATE.CORRECT },
        },
        {
          id: "2",
          type: "clickable",
          draggable: false,
          position: { x: 0, y: 0 },
          data: { label: "Question ID.2", state: STATE.CORRECT },
        },
        {
          id: "3",
          type: "clickable",
          draggable: false,
          position: { x: 0, y: 0 },
          data: { label: "Question ID.3", state: STATE.CORRECT },
        },
        {
          id: "4",
          type: "clickable",
          draggable: false,
          position: { x: 0, y: 0 },
          data: { label: "Question ID.4", state: STATE.WRONG },
        },
        {
          id: "5",
          type: "clickable",
          draggable: false,
          position: { x: 0, y: 0 },
          data: { label: "Question ID.5", state: STATE.INACTIVE },
        },
        {
          id: "6",
          type: "clickable",
          draggable: false,
          position: { x: 0, y: 0 },
          data: { label: "Question ID. 6", state: STATE.INACTIVE },
        },
        {
          id: "7",
          type: "clickable",
          draggable: false,
          position: { x: 0, y: 0 },
          data: { label: "Question ID. 7", state: STATE.INACTIVE },
        },
        {
          id: "8",
          type: "clickable",
          draggable: false,
          position: { x: 0, y: 0 },
          data: { label: "Question ID. 8", state: STATE.INACTIVE },
        },
        {
          id: "9",
          type: "clickable",
          draggable: false,
          position: { x: 0, y: 0 },
          data: { label: "Question ID. 9", state: STATE.INACTIVE },
        },
        {
          id: "10",
          type: "clickable",
          draggable: false,
          position: { x: 0, y: 0 },
          data: { label: "Question ID. 10", state: STATE.ACTIVE },
        },
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3" },
        { id: "e2-4", source: "2", target: "4" },
        { id: "e1-5", source: "1", target: "5" },
        { id: "e5-9", source: "5", target: "9" },
        { id: "e4-6", source: "4", target: "6" },
        { id: "e6-7", source: "6", target: "7" },
        { id: "e6-7", source: "6", target: "8" },
        { id: "e3-10", source: "3", target: "10" },
      ],
    });
    setActiveQuestion({
      id: 10,
      stem: "What is an example of a scenario where symmetric encryption can be used to secure communication between two parties?",
      options: [
        "A. Protecting data in transit between a web browser and a server",
        "B. Securing a wireless network with a password",
        "C. Encrypting email messages between two parties using a shared secret key",
        "D. Using a digital signature to verify the authenticity of a message",
      ],
    });
    var newMessageList = activeMessageList;
    newMessageList.push({
      text: "Question 3: You are wrong! Next Question: Question 10.",
      label: "right",
    });
    setActiveMessageList(newMessageList);
  };

  const handleSkip = () => {
    setActiveQuestion({
      id: 10,
      stem: "What is an example of a scenario where symmetric encryption can be used to secure communication between two parties?",
      options: [
        "A. Protecting data in transit between a web browser and a server",
        "B. Securing a wireless network with a password",
        "C. Encrypting email messages between two parties using a shared secret key",
        "D. Using a digital signature to verify the authenticity of a message",
      ],
    });
  };

  return (
    <Box sx={{ m: 4, p: 4 }}>
      <Grid container spacing={4} sx={{ mt: 2, mb: 2 }}>
        <Grid item xs={12}>
          <TreeSelector />
        </Grid>
        <Grid item xs={8}>
          <TreeIndex
            id={activeTree.id}
            initialNodes={activeTree.nodes}
            initialEdges={activeTree.edges}
            nodeTypes={nodeTypes}
          />
        </Grid>
        <Grid item xs={4}>
          <QuestionView
            id={activeQuestion.id}
            stem={activeQuestion.stem}
            options={activeQuestion.options}
            handleSubmit={handleSubmit}
            handleSkip={handleSkip}
          />
        </Grid>
        <Grid item xs={12}>
          <ConsoleIndex messageList={activeMessageList} />
        </Grid>
      </Grid>
    </Box>
  );
}
