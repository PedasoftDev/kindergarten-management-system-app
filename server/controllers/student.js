import Student from "../models/studentModels/student.js";
import StudentMother from "../models/studentModels/studentMother.js";
import StudentFather from "../models/studentModels/studentFather.js";
import StudentHeir from "../models/studentModels/studentHeir.js";
import StudentOther from "../models/studentModels/studentOther.js";
import StudentPhoto from "../models/studentModels/studentPhoto.js";

// Path: server/controllers/student.js

export const createStudent = async (req, res) => {
  const createStudent = req.body;
  const student = createStudent.student;
  const mother = createStudent.parent.mother;
  const father = createStudent.parent.father;
  const heir = createStudent.parent.heir;
  const other = createStudent.other;

  try {
    // create student
    const newStudent = new Student({
      firstName: student.firstName,
      lastName: student.lastName,
      identificationNumber: student.identificationNumber,
      birthDate: student.birthDate,
      birthPlace: student.birthPlace,
      class: student.class,
      gender: student.gender,
      nationality: student.nationality,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // create student photo
    if (student.photo === null || student.photo === undefined) {
      student.photo = "";
    }
    const newStudentPhoto = new StudentPhoto({
      studentId: newStudent._id,
      photo: student.photo,
    });

    // create student mother
    const newStudentMother = new StudentMother({
      studentId: newStudent._id,
      fullName: mother.fullName,
      identificationNumber: mother.identificationNumber,
      phoneNumber: mother.phoneNumber,
      job: mother.job,
      address: mother.address,
      workAddress: mother.workAddress,
      email: mother.email,
      isParent: mother.isParent,
    });

    // create student father
    const newStudentFather = new StudentFather({
      studentId: newStudent._id,
      fullName: father.fullName,
      identificationNumber: father.identificationNumber,
      phoneNumber: father.phoneNumber,
      job: father.job,
      address: father.address,
      workAddress: father.workAddress,
      email: father.email,
      isParent: father.isParent,
    });

    // create student heir
    const newStudentHeir = new StudentHeir({
      studentId: newStudent._id,
      fullName: heir.fullName,
      identificationNumber: heir.identificationNumber,
      phoneNumber: heir.phoneNumber,
      job: heir.job,
      address: heir.address,
      workAddress: heir.workAddress,
      email: heir.email,
      isParent: heir.isParent,
    });

    // create student other
    const newStudentOther = new StudentOther({
      studentId: newStudent._id,
      bloodGroup: other.bloodGroup,
      isParentsTogether: other.isParentsTogether,
      isAllergy: other.isAllergy,
      allergyType: other.allergyType,
      isChronicDisease: other.isChronicDisease,
      chronicDiseaseType: other.chronicDiseaseType,
      emergencyContactFullName: other.emergencyContactFullName,
      emergencyContactPhoneNumber: other.emergencyContactPhoneNumber,
      emergencyContactDegreeOfProximity:
        other.emergencyContactDegreeOfProximity,
    });

    await newStudent.save();
    await newStudentMother.save();
    await newStudentFather.save();
    await newStudentHeir.save();
    await newStudentOther.save();
    await newStudentPhoto.save();

    res.status(201).json({
      message: "Student created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const getStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findById(id);
    const mother = await StudentMother.find({ studentId: id });
    const father = await StudentFather.find({ studentId: id });
    const heir = await StudentHeir.find({ studentId: id });
    const other = await StudentOther.find({ studentId: id });
    const photo = await StudentPhoto.find({ studentId: id });

    const emptyParent = {
      studentId: id,
      fullName: "",
      identificationNumber: "",
      phoneNumber: "",
      job: "",
      address: "",
      workAddress: "",
      email: "",
      isParent: false,
      createdAt: "",
      updatedAt: "",
    };

    if (!student) {
      return res.status(400).json({
        message: "öğrenci bulunamadı!",
        error,
      });
    }
    if (!mother[0]) {
      mother[0] = emptyParent;
    }
    if (!father[0]) {
      father[0] = emptyParent;
    }
    if (!heir[0]) {
      heir[0] = emptyParent;
    }
    if (!other[0]) {
      other[0] = {
        studentId:id, 
      bloodGroup: "",
      isParentsTogether: "",
      isAllergy: false,
      allergyType: "",
      isChronicDisease: false,
      chronicDiseaseType: "",
      emergencyContactFullName: "",
      emergencyContactPhoneNumber: "",
      emergencyContactDegreeOfProximity: ""
      }
    }
    if (!photo[0]) {
      photo[0] = {
        studentId:id,
        photo: "",
      }
    } 
    const studentCopy = {
      identificationNumber: student.identificationNumber,
    firstName: student.firstName,
    lastName: student.lastName,
    birthDate: student.birthDate,
    birthPlace: student.birthPlace,
    class: student.class,
    gender: student.gender,
    nationality: student.nationality,
    createdAt:student.createdAt,
    updatedAt: student.updatedAt,
    photo: photo[0].photo,
  }
    const data ={
      student:studentCopy,
      parent:{
        mother:mother[0],
        father:father[0],
        heir:heir[0]
      },
      other:other[0],
    }
    
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const updateStudent = async (req, res) => {
  const id = req.params.id;
  const updateStudent = req.body;
  const student = updateStudent.student;
  const mother = updateStudent.parent.mother;
  const father = updateStudent.parent.father;
  const heir = updateStudent.parent.heir;
  const other = updateStudent.other;

  

   try {
    const StudentDb = await Student.findById(id);

    if (!StudentDb) {
      return res.status(400).json({
        message: "Öğrenci bulunamadı!",
        error,
      });
    }
    StudentDb.firstName = student.firstName;
    StudentDb.lastName = student.lastName;
    StudentDb.identificationNumber = student.identificationNumber;
    StudentDb.birthDate = student.birthDate;
    StudentDb.birthPlace = student.birthPlace;
    StudentDb.class = student.class;
    StudentDb.gender = student.gender;
    StudentDb.nationality = student.nationality;
    StudentDb.updatedAt = new Date().toISOString();
    await StudentDb.save();


    const MotherDb = await StudentMother.find({
      studentId: id,
      })[0]
      if (!MotherDb) {
        return res.status(400).json({
          message: "Anne bulunamadı!",
          error,
        });
      }
    MotherDb.fullName = mother.fullName;
    MotherDb.identificationNumber = mother.identificationNumber;
    MotherDb.phoneNumber = mother.phoneNumber;
    MotherDb.job = mother.job;
    MotherDb.address = mother.address;
    MotherDb.workAddress = mother.workAddress;
    MotherDb.email = mother.email;
    MotherDb.isParent = mother.isParent;

    await MotherDb.save();
    res.status(200).json({
      message: "Öğrenci güncellendi",
    });

    const FatherDb = await StudentFather.find({
      studentId: id,
    })[0]
    if (!FatherDb) {
      return res.status(400).json({
        message: "Baba bulunamadı!",
        error,
      });
    }
    FatherDb.fullName = father.fullName;
    FatherDb.identificationNumber = father.identificationNumber;
    FatherDb.phoneNumber = father.phoneNumber;
    FatherDb.job = father.job;
    FatherDb.address = father.address;
    FatherDb.workAddress = father.workAddress;
    FatherDb.email = father.email;
    FatherDb.isParent = father.isParent;
  
    await FatherDb.save();
    res.status(200).json({
      message: "Öğrenci güncellendi",
    });

    const HeirDb = await StudentHeir.find({
      studentId: id,
    })[0]
    if (!HeirDb) {
      return res.status(400).json({
        message: "Vasi bulunamadı!",
        error,
      });
    }
    HeirDb.fullName = heir.fullName;
    HeirDb.identificationNumber = heir.identificationNumber;
    HeirDb.phoneNumber = heir.phoneNumber;
    HeirDb.job = heir.job;
    HeirDb.address = heir.address;
    HeirDb.workAddress = heir.workAddress;
    HeirDb.email = heir.email;
    HeirDb.isParent = heir.isParent;
    
    await HeirDb.save();
    res.status(200).json({
      message: "Vasi güncellendi",
    });

    const OtherDb = await StudentOther.find({
      studentId: id,
    })[0]
    if (!OtherDb) {
      return res.status(400).json({
        message: "Diğer bulunamadı!",
        error,
      });
    }
    OtherDb.bloodGroup = other.bloodGroup;
    OtherDb.isParentsTogether = other.isParentsTogether;
    OtherDb.isAllergy = other.isAllergy;
    OtherDb.allergyType = other.allergyType;
    OtherDb.isChronicDisease = other.isChronicDisease;
    OtherDb.chronicDiseaseType = other.chronicDiseaseType;
    OtherDb.emergencyContactFullName = other.emergencyContactFullName;
    OtherDb.emergencyContactPhoneNumber = other.emergencyContactPhoneNumber;
    OtherDb.emergencyContactDegreeOfProximity = other.emergencyContactDegreeOfProximity;

    await OtherDb.save();
    res.status(200).json({
      message: "Diğer güncellendi",
    });
    

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }

};


