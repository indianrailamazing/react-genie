import React, { useState } from "react";
import styled from "styled-components";

const App = () => {
  const [activeTab, setActiveTab] = useState("deboarding-services");
  const [transport, setTransport] = useState(false);
  const [accommodation, setAccommodation] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});

  const validateMobile = (number) => {
    const mobileRegex = /^[1-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  const validateTrainNumber = (number) => {
    const trainNumberRegex = /^\d{5}$/;
    return trainNumberRegex.test(number);
  };

  const validateArrivalDate = (date) => {
    const selectedDate = new Date(date);
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 120);
    return selectedDate > currentDate && selectedDate <= maxDate;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    let error = '';

    if (name === "mobile" || name === "mobile-berth") {
      if (!validateMobile(value)) {
        error = 'Mobile number must be a 10 digit number and not start with 0.';
      }
    } else if (name === "train-number" || name === "train-number-berth") {
      if (!validateTrainNumber(value)) {
        error = 'Train number must be a 5 digit number.';
      }
    } else if (name === "arrival-date" || name === "arrival-date-berth") {
      if (!validateArrivalDate(value)) {
        error = 'Arrival date must be in the future and not more than 120 days ahead.';
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const mobile = values["mobile"] || values["mobile-berth"];
    const trainNumber = values["train-number"] || values["train-number-berth"];
    const arrivalDate = values["arrival-date"] || values["arrival-date-berth"];

    const newErrors = {};

    if (!validateMobile(mobile)) {
      newErrors.mobile = 'Mobile number must be a 10 digit number and not start with 0.';
    }

    if (!validateTrainNumber(trainNumber)) {
      newErrors.trainNumber = 'Train number must be a 5 digit number.';
    }

    if (!validateArrivalDate(arrivalDate)) {
      newErrors.arrivalDate = 'Arrival date must be in the future and not more than 120 days ahead.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully");
    }
  };

  return (
    <Container>
      <Header>
        <h1>Rail Genie</h1>
        <p>Making your railway journey smoother and more convenient</p>
      </Header>
      <Main>
        <Tabs>
          <Tab
            className={activeTab === "deboarding-services" ? "active" : ""}
            onClick={() => setActiveTab("deboarding-services")}
          >
            Deboarding Services
          </Tab>
          <Tab
            className={activeTab === "services-at-berth" ? "active" : ""}
            onClick={() => setActiveTab("services-at-berth")}
          >
            Services at Berth
          </Tab>
        </Tabs>
        {activeTab === "deboarding-services" && (
          <TabContent>
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" required onChange={handleInputChange} />

              <Label htmlFor="mobile">Mobile#</Label>
              <Input type="text" id="mobile" name="mobile" maxLength="10" required onChange={handleInputChange} />
              {errors.mobile && <Error>{errors.mobile}</Error>}

              <Label htmlFor="deboarding-station">Deboarding Station</Label>
              <Select id="deboarding-station" name="deboarding-station" required onChange={handleInputChange}>
                <option value="">Select Station</option>
                <option value="station1">Station 1</option>
                <option value="station2">Station 2</option>
                {/* Add more stations as needed */}
              </Select>

              <Label htmlFor="train-number">Train Number (e.g., 12727)</Label>
              <Input type="number" id="train-number" name="train-number" maxLength="5" required onChange={handleInputChange} />
              {errors.trainNumber && <Error>{errors.trainNumber}</Error>}

              <Label htmlFor="arrival-date">Train Arrival date at Deboarding Station as per Schedule</Label>
              <Input type="date" id="arrival-date" name="arrival-date" required onChange={handleInputChange} />
              {errors.arrivalDate && <Error>{errors.arrivalDate}</Error>}

              <Label htmlFor="coach">Coach</Label>
              <Input type="text" id="coach" name="coach" required onChange={handleInputChange} />

              <Label htmlFor="berth">Berth</Label>
              <Input type="text" id="berth" name="berth" required onChange={handleInputChange} />

              <Label htmlFor="number-of-bags">Number of bags (To be carried by Luggage Porter)</Label>
              <Input type="number" id="number-of-bags" name="number-of-bags" required onChange={handleInputChange} />

              <Label>Select one or more services from below</Label>
              <Checkbox>
                <input type="checkbox" id="transport" name="services" value="transport" onChange={() => setTransport(!transport)} />
                Transport
              </Checkbox>
              {transport && (
                <RadioGroup>
                  <Radio>
                    <input type="radio" id="auto" name="transport-type" value="auto" />
                    Auto
                  </Radio>
                  <Radio>
                    <input type="radio" id="cab" name="transport-type" value="cab" />
                    Cab
                  </Radio>
                  <Input type="text" id="destination" name="destination" placeholder="Google Maps Destination" onChange={handleInputChange} />
                </RadioGroup>
              )}

              <Checkbox>
                <input type="checkbox" id="wheelchair" name="services" value="wheelchair" />
                Wheelchair (To Drop at Station Exit near to the vehicle)
              </Checkbox>

              <Checkbox>
                <input type="checkbox" id="accommodation" name="services" value="accommodation" onChange={() => setAccommodation(!accommodation)} />
                Freshup/Accommodation at Station
              </Checkbox>
              {accommodation && (
                <Input type="number" id="accommodation-duration" name="accommodation-duration" placeholder="Accommodation/Freshup duration Hours" onChange={handleInputChange} />
              )}

              <ButtonGroup>
                <Button type="reset" className="clear">Clear</Button>
                <Button type="submit" className="submit">Submit</Button>
              </ButtonGroup>
            </Form>
          </TabContent>
        )}
        {activeTab === "services-at-berth" && (
          <TabContent>
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="name-berth">Name</Label>
              <Input type="text" id="name-berth" name="name-berth" required onChange={handleInputChange} />

              <Label htmlFor="mobile-berth">Mobile#</Label>
              <Input type="text" id="mobile-berth" name="mobile-berth" maxLength="10" required onChange={handleInputChange} />
              {errors.mobile && <Error>{errors.mobile}</Error>}

              <Label htmlFor="station">Station</Label>
              <Select id="station" name="station" required onChange={handleInputChange}>
                <option value="">Select Station</option>
                <option value="station1">Station 1</option>
                <option value="station2">Station 2</option>
                {/* Add more stations as needed */}
              </Select>

              <Label htmlFor="train-number-berth">Train Number (e.g., 12727)</Label>
              <Input type="number" id="train-number-berth" name="train-number-berth" maxLength="5" required onChange={handleInputChange} />
              {errors.trainNumber && <Error>{errors.trainNumber}</Error>}

              <Label htmlFor="arrival-date-berth">Train Arrival date at Deboarding Station as per Schedule</Label>
              <Input type="date" id="arrival-date-berth" name="arrival-date-berth" required onChange={handleInputChange} />
              {errors.arrivalDate && <Error>{errors.arrivalDate}</Error>}

              <Label htmlFor="coach-berth">Coach</Label>
              <Input type="text" id="coach-berth" name="coach-berth" required onChange={handleInputChange} />

              <Label htmlFor="berth-berth">Berth</Label>
              <Input type="text" id="berth-berth" name="berth-berth" required onChange={handleInputChange} />

              <Label htmlFor="services-required">Describe the services required at your berth</Label>
              <Textarea id="services-required" name="services-required" rows="4" placeholder="Medicines/Air Pillow/Locks etc" onChange={handleInputChange}></Textarea>

              <ButtonGroup>
                <Button type="reset" className="clear">Clear</Button>
                <Button type="submit" className="submit">Submit</Button>
              </ButtonGroup>
            </Form>
          </TabContent>
        )}
        <Disclaimer>
          <p>RailGenie functions solely as an intermediary to relay passengers' requirements to authorised service providers within railway stations. Any complaints regarding service deficiencies should be directed to the respective railway station authorities. RailGenie, as a private entity, disclaims responsibility for any such deficiencies in services.</p>
        </Disclaimer>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: #f4f4f4;
`;

const Header = styled.header`
  background: #0033cc;
  color: white;
  padding: 10px 0;
  text-align: center;
`;

const Main = styled.main`
  width: 80%;
  margin: 20px auto;
  background: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
`;

const Tab = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-bottom: none;
  transition: background 0.3s ease, color 0.3s ease;

  &.active {
    background: #0033cc;
    border-top: 2px solid #0033cc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    color: white;
    font-weight: bold;
  }

  &:not(.active) {
    background: #f4f4f4;
    color: #999;
  }
`;

const TabContent = styled.div`
  display: block;
`;

const Form = styled.form`
  margin-top: 20px;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Checkbox = styled.div`
  margin-bottom: 10px;
`;

const RadioGroup = styled.div`
  margin-left: 20px;
  margin-bottom: 10px;
`;

const Radio = styled.div`
  margin-bottom: 5px;
`;

const ButtonGroup = styled.div`
  text-align: right;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &.clear {
    background: #ccc;
    color: white;
  }
  &.submit {
    background: #0033cc;
    color: white;
  }
`;

const Disclaimer = styled.div`
  margin-top: 20px;
  font-size: 0.9em;
  color: #666;
`;

const Error = styled.p`
  color: red;
  font-size: 0.9em;
`;

export default App;
