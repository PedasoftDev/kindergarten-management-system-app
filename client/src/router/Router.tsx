import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "../pages/notfound/NotFound";
import Dashboard from "../pages/main/Dashboard";
import AddStudentView from "../pages/students/AddStudent/AddStudentView";
import EditStudents from "../pages/students/EditStudent/EditStudent";
import StudentList from "../pages/students/StudentList/StudentList";
import AddPreliminaryInterview from "../pages/preliminaryInterview/AddPreliminaryInterview/AddPreliminaryInterview";
import PreliminaryInterviewList from "../pages/preliminaryInterview/PreliminaryInterviewList/PreliminaryInterviewList";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Schedule from "../pages/schedule/Schedule";
import Paramaters from "../pages/parameters/Paramaters";
import AddClassView from "../pages/classes/AddClass/AddClassView";
import AddTeacherView from "../pages/teachers/AddTeacherView";
import AddEmployeeView from "../pages/employees/AddEmployee/AddEmployeeView";
// import Schedule from "../pages/schedule/Schedule";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Students */}
        <Route path="/students/add" element={<AddStudentView />} />
        <Route path="/students/edit/:id" element={<EditStudents />} />
        <Route path="/students/list" element={<StudentList />} />

        {/* Preliminary Interview */}
        <Route
          path="/preliminary-interview/add"
          element={<AddPreliminaryInterview />}
        />
        <Route
          path="/preliminary-interview/list"
          element={<PreliminaryInterviewList />}
        />
        {/* Schedule */}
        <Route path="/schedule/list" element={<Schedule />} />

        {/*Parameters*/}
        <Route path="/parameters" element={<Paramaters />} />

         {/* Classes */}
         <Route path="/class/add" element={<AddClassView />} />


{/* Teachers */}
<Route path="/teacher/add" element={<AddTeacherView />} />

{/* Employees */}
<Route path="/employee/add" element={<AddEmployeeView />} />


        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
