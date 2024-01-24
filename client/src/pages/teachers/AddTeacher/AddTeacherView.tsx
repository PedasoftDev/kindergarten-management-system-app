import React, { useState } from "react";
import Content from "../../../components/Content/Content";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, InputLabel } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { trTR } from "@mui/x-date-pickers";
import { ITeacher } from "../../../interfaces/ITeacher";
import Toast from "../../../components/Toast/Toast";


const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
  margin-top: 20px;
  align-items: center;
 
`;

const StyledContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

const StyledContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;


const AddTeacherView = () => {

  const [formData, setFormData] = useState <ITeacher.ITeacher>({
    fullName: "",
    gender: "",
    dutyGroup: "",
    birthDate: "",
    phoneNumber: "",
    class: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      gender: event.target.value,
    });
  };

  const handleDutyGroupChange = (event: SelectChangeEvent<string>) => {
    setFormData({
    ...formData,
      dutyGroup: event.target.value,
    });
  };

  const handleClassChange = (event: SelectChangeEvent<string>) => {
    setFormData({
  ...formData,
      class: event.target.value,
   });
  };

  const handleSubmit = () => {
    console.log("Form submitted!", formData)
    Toast.fire({
      icon: "success",
      title: "Başarılı!",
    })
  };
  
    return (
          <Content
            titleName="Öğretmenler"
            header="Öğretmen Tanımlama"
            content={
      
              <StyledContainer>
                <div style={{
                  display: "flex",
                  width: "80%",
                  justifyContent: "center",
                  gap: 20,
                }}>
                <StyledContainerLeft>
                    <TextField
                    name="fullName"
                    value={formData.fullName}
                    size="small"
                    label="Adı-Soyadı"
                    onChange={handleChange}
                    required
                    />
                    <FormControl fullWidth size="small">
                        <InputLabel>Cinsiyeti</InputLabel>
                        <Select
                            name="gender"
                            value={formData.gender}
                            label="Cinsiyeti"
                            onChange={handleGenderChange}
                            size="small"
                            required
                        >
                            <MenuItem value="Kadın">Kadın</MenuItem>
                            <MenuItem value="Erkek">Erkek</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth size="small">
                        <InputLabel>Görevi</InputLabel>
                        <Select
                            name="duty group"
                            value={formData.dutyGroup}
                            label="Görevi"
                            onChange={handleDutyGroupChange}
                            size="small"
                            required
                        >
                            <MenuItem value="Öğretmen">Öğretmen</MenuItem>
                            <MenuItem value="Branş Öğretmeni">Branş Öğretmeni</MenuItem>
                            <MenuItem value="Yardımcı Öğretmen">Yardımcı Öğretmeni</MenuItem>
                        </Select>
                    </FormControl>
                </StyledContainerLeft>
                
                <StyledContainerRight>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        slotProps={{ textField: { size: "small", error: false } }}
                        label="Doğum Tarihi"
                        localeText={trTR.components.MuiLocalizationProvider.defaultProps.localeText}
                        format="DD/MM/YYYY"
                        value={dayjs(formData.birthDate)}
                        onChange={(newValue: any) => {
                            setFormData({
                             ...formData,
                                birthDate: newValue.$d.toISOString(),
                            });
                        }}
                    />                   
                  </LocalizationProvider>
                  <TextField 
                  name="phoneNumber"
                  label="Cep Telefonu"
                  variant="outlined"
                  size="small"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  />
                  <FormControl fullWidth size="small">
                        <InputLabel>Sorumlu Olduğu Sınıf</InputLabel>
                        <Select
                            name="class"
                            value={formData.class}
                            label="Sorumlu Olduğu Sınıf"
                            onChange={handleClassChange}
                            size="small"
                            required
                        >
                            <MenuItem value="1-A">1-A</MenuItem>
                            <MenuItem value="1-B">1-B</MenuItem>
                        </Select>
                    </FormControl>

                  
                </StyledContainerRight>
                </div>

                <div
                style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
                gap: "20px",
                width: "80%"
              }}
              >
              <Button variant="contained" fullWidth size="small" onClick={handleSubmit}>KAYDET</Button>
              </div>
              </StyledContainer>
              
            }
        />
        
       
     
    )

}

export default AddTeacherView;