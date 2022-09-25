import * as React from "react";
import { useEffect } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DatePicker from "./DatePicker";
import { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Home(props: any) {
  const {
    data
  } = props;

  const {
    name,
    start_time,
    end_time,
  } = data;

  console.log(data);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [participants, setParticipants] = React.useState<string[]>([]);
  const [startTime, setStartTime] = React.useState<Dayjs | null>(start_time);
  const [endTime, setEndTime] = React.useState<Dayjs | null>(end_time);
  const [interviewName, setInterviewName] = React.useState<string>(name);

  const onSubmit = () => {
    const tempStartTime = startTime?.format("YYYY-MM-DD HH:MM:ss");
    const tempEndTime = endTime?.format("YYYY-MM-DD HH:MM:ss");
    console.log(interviewName, personName, tempStartTime, tempEndTime);
    axios({
      url: "http://localhost:8000/add-interview/",
      method: "post",
      data: {
        name: interviewName,
        participant_ids: personName,
        start_time: tempStartTime,
        end_time: tempEndTime,
      },
    });
    // window.location.reload();
  };

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    axios.get("http://localhost:8000/get-participant/").then((res) => {
      setParticipants(res.data.data);
    });
  }, []);

  return (
    <div className="schedule-container">
      <h2>Schedule Interview</h2>
      <Input
        onChange={(event) => setInterviewName(event.target.value)}
        placeholder={"Interview Name"}
        value={name}
      />
      <br />
      <br />
      <DatePicker changeDate={setStartTime} date={startTime} />
      <br />
      <br />
      <DatePicker changeDate={setEndTime} date={endTime} />
      <br />
      <br />
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-name-label">
          Select Participants
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {participants.map((name: any) => (
            <MenuItem
              key={name.id}
              value={name.id}
              style={getStyles(name, personName, theme)}
            >
              {name.name}
            </MenuItem>
          ))}
        </Select>
        <br />
        <br />
        <Button variant="contained" onClick={() => onSubmit()}>
          Schedule
        </Button>
      </FormControl>
    </div>
  );
}
