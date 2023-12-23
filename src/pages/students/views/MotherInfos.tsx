import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";

const ContainerArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const MotherInfos = (props: {
  motherInfos: {
    fullName: string;
    identificationNumber: string;
    phoneNumber: string;
    job: string;
    address: string;
    workAddress: string;
    isParent: boolean;
    email: string;
  };
  setMotherInfos: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      identificationNumber: string;
      phoneNumber: string;
      job: string;
      address: string;
      workAddress: string;
      isParent: boolean;
      email: string;
    }>
  >;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setMotherInfos({
      ...props.motherInfos,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <ContainerArea>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: "50%",
          }}
        >
          <TextField
            name="fullName"
            label="Adı-Soyadı"
            variant="outlined"
            size="small"
            value={props.motherInfos.fullName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="identificationNumber"
            label="TC Kimlik Numarası"
            variant="outlined"
            size="small"
            value={props.motherInfos.identificationNumber}
            onChange={handleChange}
          />
          <TextField
            name="phoneNumber"
            label="Cep Telefonu"
            variant="outlined"
            size="small"
            value={props.motherInfos.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            name="job"
            label="Mesleği"
            variant="outlined"
            size="small"
            value={props.motherInfos.job}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="E-mail"
            variant="outlined"
            size="small"
            value={props.motherInfos.email}
            onChange={handleChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "50%",
          }}
        >
          <TextField
            name="address"
            label="Ev Adresi"
            multiline
            rows={5}
            value={props.motherInfos.address}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="workAddress"
            label="İş Adresi"
            multiline
            rows={5}
            value={props.motherInfos.workAddress}
            onChange={handleChange}
          />
        </div>
      </ContainerArea>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <FormControlLabel
          value={props.motherInfos.isParent}
          control={<Switch color="primary" />}
          label="Öğrencinin Velisi mi?"
          labelPlacement="start"
          onClick={() => {
            props.setMotherInfos({
              ...props.motherInfos,
              isParent: !props.motherInfos.isParent,
            });
          }}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={(e) => {
            e.preventDefault();
            props.setExpanded("panel2");
          }}
          sx={{
            height: "max-content",
          }}
        >
          İleri
        </Button>
      </div>
    </>
  );
};

export default MotherInfos;