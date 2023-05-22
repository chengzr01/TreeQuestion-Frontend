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
        return option.level + " " + option.content;
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
    content:
      "[object]+is+[concept]. For example, [object]+is+[example1]+[example 2]+[example 3].",
    level: "Remember",
  },
  {
    content:
      "[cause]+[effect]+because of +[object]+[context of concept]+Therefore+[restate cause and effect relationship]",
    level: "Remember",
  },
  {
    content:
      "The features/main concepts/advantage/disadvantage+of+[object]+are+[main point 1]+[main point2]+[main point 3]",
    level: "Remember",
  },
  {
    content:
      "The main idea of [object/concept] is [context]. The significance of [object] is + [point 1] +[point 2]+[point 3]",
    level: "Understand",
  },
  {
    content:
      "The purpose of [event/concept] is [context]. In order to accomplish [purpose context], the [personas]+ did + [context]",
    level: "Understand",
  },
  {
    content:
      "The central theme of [object] is [context] because [reason 1]+[reason 2]+[reason 3] + [restate the purpose]",
    level: "Understand",
  },
  {
    content:
      "The question asks about the steps to do [given question]. The steps to accomplish this are [step 1]+[step 2]+[step 3]. The [concept] is being applied by [context].",
    level: "Apply",
  },
  {
    content:
      "The key components/factors of [object] are [component/factor 1]+[explanation]+[component/factor 2]+[explanation]+[component/factor 3]+[explanation]. Therefore, [restate the components/factors] are the key elements.",
    level: "Analyze",
  },
  {
    content:
      "[object 1] and [object 2] share similarities but also differs from each other. Similarities are [concept 1], [concept 2], and [concept 3]. Meanwhile, the differences are [diff 1], [diff 2], [diff 3].",
    levle: "Evaluate",
  },
  {
    content:
      "According to [concept 1], we can create the [given question] prototype by using [concept 1], [concept 2], and [concept 3]. The prototype can be evaluated by [context].",
    level: "Create",
  },
];
