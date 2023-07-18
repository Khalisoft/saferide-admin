import React from 'react';
import './AddResult.css';
import { Input, Label, Select, HelperText, Button } from '@windmill/react-ui'

const AddResult = () => {
  const handleImageSelect = () => {
    // handle image select logic
  }

  const handleSubmit = () => {
    // handle form submission logic
  }

  return (
    <div className='add-result'>
      <Label className="mt-4">
        <span>Contestant</span>
        <Select className="mt-1">
          <option>President</option>
          <option>Senate</option>
          <option>House of Reps.</option>
        </Select>
      </Label>

      <Label className="mt-4">
        <span>L.G.A</span>
        <Select className="mt-1">
        </Select>
      </Label>

      <Label className="mt-4">
        <span>Wards</span>
        <Select className="mt-1">
        </Select>
      </Label>

      <Label className="mt-4">
        <span>Polling Units</span>
        <Select className="mt-1">
        </Select>
      </Label>

      <Label className="mt-4">
        <span>Total No. of Voters</span>
        <Input className="mt-1" valid={true} placeholder="Total No. of Voters" />
        <HelperText>Please only enter digits.</HelperText>
      </Label>
      <Label className="mt-4">
        <span>Total No. of Votes</span>
        <Input className="mt-1" valid={true} placeholder="Total No. of Votes" />
        <HelperText>Please only enter digits.</HelperText>
      </Label>
      <Label className="mt-4">
        <span>Total No. of Invalid Votes</span>
        <Input className="mt-1" valid={true} placeholder="Total No. of Invalid Votes" />
        <HelperText>Please only enter digits.</HelperText>
      </Label>

      <div className="flex justify-between mt-4">
        <Button onClick={handleImageSelect}>Select Image</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}

export default AddResult;