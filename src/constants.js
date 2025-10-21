const IDENTITY_TYPES = [
  { identityTypeId: 1, description: "Jan Aadhaar Id" },
  { identityTypeId: 2, description: "Jan Aadhaar Ack Id" },
  { identityTypeId: 3, description: "Mobile Number" },
  { identityTypeId: 4, description: "Aadhaar Id" },
  { identityTypeId: 5, description: "House Hold Id" },
  { identityTypeId: 6, description: "Abha Address" },
  { identityTypeId: 7, description: "Abha Number" },
  { identityTypeId: 8, description: "Ration Card" },
];

const initialFormData = {
  isRta: "no",
  admissionType: "normal",
  isJanAadhaar: true,
  nameEnglish: "",
  nameHindi: "",
  age: "",
  genderId: "",
  isMlcCase: false,
  mlcCaseId: "",
  isPatientIdentify: false,
  identifierName: "",
  identifierRelation: "",
  identifierContactNo: "",
  identityType: "",
  identityNumber: "",
  entitlementType: "",
  rationCard: "",
  mobileNo: "",
  houseNo: "",
  colonyStreet: "",
  wardBlock: "",
  gramPanchayat: "",
  village: "",
  tehsil: "",
  district: "",
  stateName: "",
  pinCode: "",
  bhamashaId: "",
  janAadhaarId: "",
  photo: null,
  verifyMethod: "aadhaar",
};

const MlcCaseList = [
  {
    mlcCaseId: 0,
    description:
      "Assault And Battery, Including Domestic Violence And Child Abuse",
  },
  {
    mlcCaseId: 1,
    description:
      "Accidents Like Road Traffic Accidents (Rta), Industrial Accidents Etc.",
  },
  {
    mlcCaseId: 2,
    description: "Cases Of Trauma With Suspicion Of Foul Play",
  },
  {
    mlcCaseId: 3,
    description: "Electrical Injuries",
  },
  {
    mlcCaseId: 4,
    description: "Poisoning, Alcohol Intoxication",
  },
  {
    mlcCaseId: 5,
    description: "Undiagnosed Coma",
  },
  {
    mlcCaseId: 6,
    description: "Chemical Injuries",
  },
  {
    mlcCaseId: 7,
    description: "Burns And Scalds",
  },
  {
    mlcCaseId: 8,
    description: "Sexual Offences",
  },
  {
    mlcCaseId: 9,
    description: "Criminal Abortions",
  },
  {
    mlcCaseId: 10,
    description: "Attempted Suicide",
  },
  {
    mlcCaseId: 11,
    description:
      "Cases Of Asphyxia As A Result Of Hanging, Strangulation, Drowning,",
  },
  {
    mlcCaseId: 12,
    description: "Snake Bite Or Animal Bite",
  },
  {
    mlcCaseId: 13,
    description: "Fire Arm Injuries",
  },
  {
    mlcCaseId: 14,
    description: "Drug Overdose",
  },
  {
    mlcCaseId: 15,
    description: "Drug Abuse",
  },
];

const genderList = [
  {
    genderId: 1,
    description: "Male",
  },
  {
    genderId: 2,
    description: "Female",
  },
  {
    genderId: 3,
    description: "Transgender",
  },
  {
    genderId: 4,
    description: "Other",
  },
];

const stateMaster = [
  {
    stateCode: 1,
    descriptionHindi: "जम्मू और कश्मीर",
    descriptionEnglish: "JAMMU AND KASHMIR",
  },
  {
    stateCode: 2,
    descriptionHindi: "हिमाचल प्रदेश",
    descriptionEnglish: "HIMACHAL PRADESH",
  },
  {
    stateCode: 3,
    descriptionHindi: "पंजाब",
    descriptionEnglish: "PUNJAB",
  },
  {
    stateCode: 4,
    descriptionHindi: "चंडीगढ़",
    descriptionEnglish: "CHANDIGARH",
  },
  {
    stateCode: 5,
    descriptionHindi: "उत्तराखंड",
    descriptionEnglish: "UTTARAKHAND",
  },
  {
    stateCode: 6,
    descriptionHindi: "हरियाणा",
    descriptionEnglish: "HARYANA",
  },
  {
    stateCode: 7,
    descriptionHindi: "दिल्ली",
    descriptionEnglish: "DELHI",
  },
  {
    stateCode: 8,
    descriptionHindi: "राजस्थान",
    descriptionEnglish: "RAJASTHAN",
  },
  {
    stateCode: 9,
    descriptionHindi: "उतार प्रदेश",
    descriptionEnglish: "UTTAR PRADESH",
  },
  {
    stateCode: 10,
    descriptionHindi: "बिहार",
    descriptionEnglish: "BIHAR",
  },
];

const districtResponse = [
  {
    districtCode: 1,
    descriptionHindi: "अजमेर",
    descriptionEnglish: "Ajmer",
    stateCode: 8,
  },
  {
    districtCode: 2,
    descriptionHindi: "अलवर",
    descriptionEnglish: "Alwar",
    stateCode: 8,
  },
  {
    districtCode: 3,
    descriptionHindi: "बांसवाड़ा",
    descriptionEnglish: "Banswara",
    stateCode: 8,
  },
  {
    districtCode: 4,
    descriptionHindi: "बारां",
    descriptionEnglish: "Baran",
    stateCode: 8,
  },
];

export {
  IDENTITY_TYPES,
  initialFormData,
  MlcCaseList,
  genderList,
  stateMaster,
  districtResponse,
};
