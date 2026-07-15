"use client";

import { useState } from "react";
import type {
  AcademicRecord,
  AptitudeExam,
  DiplomaRecord,
  EnglishExam,
  GraduationRecord,
  MarkScheme,
  QualificationDetails,
} from "@/lib/access/types";

const CURRENT_YEAR = new Date().getFullYear();

const EMPTY_RECORD: AcademicRecord = { board: "", yearOfPassing: CURRENT_YEAR, score: 0, markScheme: "PERCENTAGE" };
const EMPTY_GRADUATION: GraduationRecord = { degree: "", field: "", university: "", yearOrExpected: CURRENT_YEAR, score: 0, markScheme: "PERCENTAGE" };
const EMPTY_DIPLOMA: DiplomaRecord = { field: "", institution: "", yearOfPassing: CURRENT_YEAR, score: 0, markScheme: "PERCENTAGE" };

// Shared shape for updating either exam type (excludes `name`, which never changes via update calls).
export type ExamPatch = { status?: "TAKEN" | "PLANNED"; score?: number; date?: string };

export function useQualificationForm() {
  const [tenth, setTenth] = useState<AcademicRecord>(EMPTY_RECORD);
  const [twelfth, setTwelfth] = useState<QualificationDetails["twelfth"]>({ ...EMPTY_RECORD, stream: "SCIENCE" });

  const [includeGraduation, setIncludeGraduation] = useState(false);
  const [graduation, setGraduation] = useState<GraduationRecord>(EMPTY_GRADUATION);

  const [includeDiploma, setIncludeDiploma] = useState(false);
  const [diploma, setDiploma] = useState<DiplomaRecord>(EMPTY_DIPLOMA);

  const [aptitudeExams, setAptitudeExams] = useState<AptitudeExam[]>([]);
  const [englishExams, setEnglishExams] = useState<EnglishExam[]>([]);

  const [targetDegreeLevel, setTargetDegreeLevel] = useState<QualificationDetails["targetDegreeLevel"]>("UNDERGRAD");
  const [targetCountries, setTargetCountries] = useState<QualificationDetails["targetCountries"]>([]);

  function toggleAptitudeExam(name: AptitudeExam["name"], include: boolean) {
    setAptitudeExams((prev) =>
      include ? [...prev, { name, status: "PLANNED" }] : prev.filter((e) => e.name !== name),
    );
  }

  function updateAptitudeExam(name: AptitudeExam["name"], patch: ExamPatch) {
    setAptitudeExams((prev) => prev.map((e) => (e.name === name ? { ...e, ...patch } : e)));
  }

  function toggleEnglishExam(name: EnglishExam["name"], include: boolean) {
    setEnglishExams((prev) =>
      include ? [...prev, { name, status: "PLANNED" }] : prev.filter((e) => e.name !== name),
    );
  }

  function updateEnglishExam(name: EnglishExam["name"], patch: ExamPatch) {
    setEnglishExams((prev) => prev.map((e) => (e.name === name ? { ...e, ...patch } : e)));
  }

  function toggleCountry(country: "US" | "UK" | "OTHER", include: boolean) {
    setTargetCountries((prev) => (include ? [...prev, country] : prev.filter((c) => c !== country)));
  }

  const isValid = tenth.board.trim() !== "" && twelfth.board.trim() !== "" && targetCountries.length > 0;

  function toQualificationDetails(): QualificationDetails {
    return {
      tenth,
      twelfth,
      graduation: includeGraduation ? graduation : undefined,
      diploma: includeDiploma ? diploma : undefined,
      exams:
        aptitudeExams.length || englishExams.length
          ? { aptitude: aptitudeExams.length ? aptitudeExams : undefined, english: englishExams.length ? englishExams : undefined }
          : undefined,
      targetDegreeLevel,
      targetCountries,
    };
  }

  return {
    tenth,
    setTenth,
    twelfth,
    setTwelfth,
    includeGraduation,
    setIncludeGraduation,
    graduation,
    setGraduation,
    includeDiploma,
    setIncludeDiploma,
    diploma,
    setDiploma,
    aptitudeExams,
    toggleAptitudeExam,
    updateAptitudeExam,
    englishExams,
    toggleEnglishExam,
    updateEnglishExam,
    targetDegreeLevel,
    setTargetDegreeLevel,
    targetCountries,
    toggleCountry,
    isValid,
    toQualificationDetails,
  };
}

export const MARK_SCHEMES: MarkScheme[] = ["PERCENTAGE", "CGPA_10", "GPA_4", "GRADE"];
export const APTITUDE_EXAM_NAMES: AptitudeExam["name"][] = ["SAT", "ACT", "GRE", "GMAT"];
export const ENGLISH_EXAM_NAMES: EnglishExam["name"][] = ["IELTS", "TOEFL", "PTE", "DUOLINGO"];
