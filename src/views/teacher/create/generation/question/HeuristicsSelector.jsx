import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";

export default function HeuristicsSelector({
  heuristicValue,
  setHeuristicValue,
}) {
  return (
    <Autocomplete
      fullWidth
      multiple
      size="small"
      options={heuristics}
      value={heuristicValue}
      onChange={(event, newHeuristicValue) => {
        setHeuristicValue(newHeuristicValue);
      }}
      getOptionLabel={(option) => {
        return "(" + option.index + ")" + " " + option.content;
      }}
      defaultValue={[]}
      filterSelectedOptions
      renderInput={(params) => {
        return <TextField {...params} label="Heuristics" />;
      }}
    />
  );
}

const heuristics = [
  {
    index: 1,
    content:
      "According to the question, [restate the concepts being mentioned in the prompt] + [object] + is + [concept content] + Examples of + [object] + are + [example 1] + [example 2] + [example 3]",
    level: "Remember",
  },
  {
    index: 2,
    content:
      "[object] + is + [concept]. For example, [object] + is + [example 1] + [example 2] + [example 3].",
    level: "Remember",
  },
  {
    index: 3,
    content:
      "[cause] + [effect] + because of + [object] + [context of concept] + Therefore + [restate cause and effect relationship]",
    level: "Remember",
  },
  {
    index: 4,
    content:
      "The features/main concepts/advantage/disadvantage + of + [object] + are + [main point 1] + [main point 2] + [main point 3]",
    level: "Remember",
  },
  {
    index: 5,
    content:
      "The main idea of [object/concept] is [context]. The significance of [object] is + [point 1] + [point 2] + [point 3]",
    level: "Understand",
  },
  {
    index: 6,
    content:
      "The purpose of [event/concept] is [context]. In order to accomplish [purpose context], the [personas] + did + [context]",
    level: "Understand",
  },
  {
    index: 7,
    content:
      "The central theme of [object] is [context] because [reason 1] + [reason 2] + [reason 3] + [restate the purpose]",
    level: "Understand",
  },
  {
    index: 8,
    content:
      "The question asks about the steps to do [given question]. The steps to accomplish this are [step 1] + [step 2] + [step 3]. The [concept] is being applied by [context].",
    level: "Apply",
  },
  {
    index: 9,
    content:
      "In order to do [given question prompt], [concept] can be used to solve the problem. To [concept], [explain how to apply the concept to the situation].",
    level: "Apply",
  },
  {
    index: 10,
    content:
      "[concept] can be applied as [context] because + [reason 1] + [reason 2] + [reason 3]",
    level: "Apply",
  },
  {
    index: 11,
    content:
      "The decision/choice being made should be + [concept].[explain how is the concept related to the context given in the question].",
    level: "Apply",
  },
  {
    index: 12,
    content:
      "The key components/factors of [object] are [component/factor 1] + [explanation] + [component/factor 2] + [explanation] + [component/factor 3] + [explanation]. Therefore, [restate the components/factors] are the key elements.",
    level: "Analyze",
  },
  {
    index: 13,
    content:
      "The perspective of [concept] varies. One obvious perspective is [context 1], however, the underlying perspectives are [context 2]+ [context 3] because [explanation]. It may also be influenced by [context 4].",
    level: "Analyze",
  },
  {
    index: 14,
    content:
      "Both [object A] and [object B] display similarities to [context 1] and [context 2]. Therefore, the possible drawn pattern can be [pattern explained]. Given the pattern, it can be predicted that the [trend] is possible because [reasons explained].",
    level: "Analyze",
  },
  {
    index: 15,
    content:
      "[object 1] and [object 2] share similarities but also differs from each other. Similarities are [concept 1], [concept 2], and [concept 3]. Meanwhile, the differences are [diff 1], [diff 2], [diff 3].",
    level: "Evaluate",
  },
  {
    index: 16,
    content:
      "[concepts] + [results] implies [concept 1], [concept 2], and [concept 3]. The reasons are [explanation].",
    level: "Evaluate",
  },
  {
    index: 17,
    content:
      "[object] is [explain object concept]. It excels in [situation/concept 1], [situation/concept 2], and [situation/concept 3]. Meanwhile, its weaknesses are [weak 1], [weak 2], and [weak 3].",
    level: "Evaluate",
  },
  {
    index: 18,
    content:
      "According to [concept 1], we can create the [given question] prototype by using [concept 1], [concept 2], and [concept 3]. The prototype can be evaluated by [context].",
    level: "Create",
  },
];
