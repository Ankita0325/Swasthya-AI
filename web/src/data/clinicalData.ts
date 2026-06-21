// src/data/clinicalData.ts

export interface DoctorProfile {
  name: string;
  age: number;
  phone: string;
  location: string;
  specialty: string;
  recoveryCount: number;
  qualification: string;
  registrationNumber: string;
  experience: string;
  aboutMe: string;
  consultationFee: string;
  timings: string;
  languages: string;
  gender: string;
  dateOfBirth: string;
}

export interface SymptomTimelineEntry {
  date: string;
  symptom: string;
  severity: number; // 1-10
  notes: string;
}

export interface LabReportEntry {
  name: string;
  value: string;
  range: string;
  status: 'normal' | 'abnormal' | 'critical';
  date: string;
}

export interface VitalEntry {
  name: string;
  value: string;
  status: 'normal' | 'elevated' | 'high';
  unit: string;
}

export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  phone: string;
  gender: string;
  location: string;
  riskLevel: 'Low' | 'Moderate' | 'Elevated' | 'Critical';
  symptoms: SymptomTimelineEntry[];
  conditions: string[];
  medications: string[];
  lifestyle: string[];
  habits: string[];
  allergies: string[];
  labReports: LabReportEntry[];
  vitals: VitalEntry[];
  sleep: {
    averageHours: number;
    quality: string;
    notes: string;
  };
  exercise: string;
  familyMembers: {
    relation: string;
    name: string;
    conditions: string[];
  }[];
  riskTrend: {
    date: string;
    score: number; // 0-100
  }[];
  alerts: {
    id: string;
    type: 'warning' | 'info' | 'critical';
    message: string;
    date: string;
  }[];
}

export interface LightPatientEntry {
  id: string;
  name: string;
  age: number;
  gender: string;
  riskLevel: 'Low' | 'Moderate' | 'Elevated' | 'Critical';
  phone: string;
  lastVisit: string;
}

export const staticDoctor: DoctorProfile = {
  name: "Dr. Divya Sharma",
  age: 60,
  phone: "7559302315",
  location: "Mumbai",
  specialty: "General Physician / Internal Medicine",
  recoveryCount: 142,
  qualification: "MBBS, MD (Internal Medicine)",
  registrationNumber: "MCI-12345",
  experience: "35 Years",
  aboutMe: "Dr. Divya Sharma is a veteran of internal medicine in Mumbai, focusing on preventive care, lifestyle disease management, and family health memory tracing.",
  consultationFee: "500",
  timings: "10:00 AM - 5:00 PM",
  languages: "English, Hindi, Marathi",
  gender: "Female",
  dateOfBirth: "1966-08-15"
};

export const mainPatient: PatientRecord = {
  id: "indresh",
  name: "Indresh Suresh",
  age: 20,
  phone: "9324474812",
  gender: "Male",
  location: "Mumbai",
  riskLevel: "Moderate",
  symptoms: [
    { date: "2026-06-18", symptom: "Fatigue", severity: 7, notes: "Feeling extremely exhausted after regular college hours, recurring mid-day." },
    { date: "2026-06-14", symptom: "Headache", severity: 5, notes: "Dull headache localized in frontal area, relieved after resting." },
    { date: "2026-06-10", symptom: "Fatigue", severity: 6, notes: "Woke up feeling unrefreshed, struggled to concentrate on tasks." },
    { date: "2026-06-05", symptom: "Fever", severity: 8, notes: "Mild fever (100.2 F) lasting for 24 hours, resolved after hydration." },
    { date: "2026-05-28", symptom: "Fatigue", severity: 5, notes: "Fatigue reported towards late evening, sleep cycle noted as late." },
    { date: "2026-05-22", symptom: "Dizziness", severity: 4, notes: "Brief lightheadedness when standing up too quickly." }
  ],
  conditions: ["Type 2 Diabetes", "Hypertension", "Obesity", "Prediabetes"],
  medications: ["Metformin", "Lisinopril", "Vitamin D3"],
  lifestyle: ["Sedentary", "Low Water Intake"],
  habits: ["Late Sleeping", "Excess Screen Time"],
  allergies: ["Dust Mites", "Grass Pollen"],
  labReports: [
    { name: "HbA1c", value: "6.8%", range: "4.0% - 5.6%", status: "abnormal", date: "2026-06-12" },
    { name: "Total Cholesterol", value: "215 mg/dL", range: "< 200 mg/dL", status: "abnormal", date: "2026-06-12" },
    { name: "Vitamin D3", value: "18 ng/mL", range: "30 - 100 ng/mL", status: "critical", date: "2026-06-12" },
    { name: "Serum Creatinine", value: "0.9 mg/dL", range: "0.7 - 1.3 mg/dL", status: "normal", date: "2026-06-12" }
  ],
  vitals: [
    { name: "Blood Pressure", value: "138/88 mmHg", status: "elevated", unit: "mmHg" },
    { name: "Body Mass Index", value: "27.4", status: "elevated", unit: "kg/m²" },
    { name: "Heart Rate", value: "78 bpm", status: "normal", unit: "bpm" },
    { name: "SpO2 (Oxygen)", value: "98%", status: "normal", unit: "%" }
  ],
  sleep: {
    averageHours: 6,
    quality: "Poor",
    notes: "Sleep onset delayed due to high screen exposure, frequent micro-awakenings."
  },
  exercise: "Walking (light, infrequent, less than 2,000 steps daily average)",
  familyMembers: [
    { relation: "Father", name: "Suresh Kumar", conditions: ["Hypertension"] },
    { relation: "Mother", name: "Lata Suresh", conditions: ["Prediabetes"] }
  ],
  riskTrend: [
    { date: "2026-06-01", score: 45 },
    { date: "2026-06-05", score: 55 },
    { date: "2026-06-10", score: 58 },
    { date: "2026-06-14", score: 62 },
    { date: "2026-06-18", score: 65 },
    { date: "2026-06-21", score: 64 }
  ],
  alerts: [
    { id: "alt-1", type: "warning", message: "Recurring fatigue reported 3 times this month", date: "2026-06-18" },
    { id: "alt-2", type: "info", message: "Sleep quality declining for 5 consecutive days", date: "2026-06-20" }
  ]
};

export const otherPatients: LightPatientEntry[] = [
  { id: "p-2", name: "Karan Malhotra", age: 45, gender: "Male", riskLevel: "Elevated", phone: "9820012345", lastVisit: "2026-06-19" },
  { id: "p-3", name: "Anjali Deshmukh", age: 34, gender: "Female", riskLevel: "Low", phone: "9930054321", lastVisit: "2026-06-20" },
  { id: "p-4", name: "Ramesh Sawant", age: 62, gender: "Male", riskLevel: "Critical", phone: "9757098765", lastVisit: "2026-06-15" }
];

export const healthGraphNodes = [
  // Center
  { id: "patient", label: "Indresh Suresh", type: "patient", details: "Patient, 20yo Male" },
  // Conditions
  { id: "t2d", label: "Type 2 Diabetes", type: "condition", details: "HbA1c: 6.8% (Prediabetic/Diabetic range)" },
  { id: "ht", label: "Hypertension", type: "condition", details: "BP: 138/88 mmHg" },
  { id: "ob", label: "Obesity", type: "condition", details: "BMI: 27.4 (Overweight)" },
  // Medications
  { id: "met", label: "Metformin", type: "medication", details: "500mg Daily for Blood Glucose" },
  { id: "lis", label: "Lisinopril", type: "medication", details: "10mg Daily for Blood Pressure" },
  { id: "vitd", label: "Vitamin D3", type: "medication", details: "60K UI Weekly" },
  // Lifestyle / Habits
  { id: "sed", label: "Sedentary Lifestyle", type: "lifestyle", details: "Minimal physical activity, desk job" },
  { id: "late", label: "Late Sleeping", type: "habit", details: "Retires to bed past 1:30 AM" },
  { id: "screen", label: "Excess Screen Time", type: "habit", details: "10+ hours daily screen exposure" },
  // Symptoms
  { id: "fatigue", label: "Fatigue", type: "symptom", details: "Reported 3x this month, severe exhaustion" },
  // Lab Tests / Vitals
  { id: "hba1c", label: "HbA1c: 6.8%", type: "lab", details: "Elevated glycemic index" },
  { id: "bp_vital", label: "BP: 138/88", type: "vital", details: "Stage 1 Hypertension threshold" },
  { id: "bmi_vital", label: "BMI: 27.4", type: "vital", details: "Mild obesity / overweight status" }
];

export const healthGraphLinks = [
  { source: "patient", target: "t2d" },
  { source: "patient", target: "ht" },
  { source: "patient", target: "ob" },
  
  // Cross links
  { source: "t2d", target: "met", label: "Treated with" },
  { source: "t2d", target: "hba1c", label: "Monitored by" },
  { source: "ht", target: "lis", label: "Treated with" },
  { source: "ht", target: "bp_vital", label: "Monitored by" },
  
  { source: "sed", target: "ob", label: "Contributes to" },
  { source: "ob", target: "bmi_vital", label: "Measured by" },
  
  { source: "late", target: "fatigue", label: "Causes" },
  { source: "sed", target: "fatigue", label: "Aggravates" },
  { source: "vitd", target: "fatigue", label: "Prescribed for" }
];
