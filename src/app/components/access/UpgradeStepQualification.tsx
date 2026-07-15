"use client";

import type { ReactNode } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Btn } from "@/app/components/common/Btn";
import { useAccess } from "@/lib/access/AccessProvider";
import {
  useQualificationForm,
  MARK_SCHEMES,
  APTITUDE_EXAM_NAMES,
  ENGLISH_EXAM_NAMES,
  type ExamPatch,
} from "./useQualificationForm";
import type { AptitudeExam, EnglishExam } from "@/lib/access/types";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[#666666]">{label}</Label>
      {children}
    </div>
  );
}

function MarkSchemeSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {MARK_SCHEMES.map((scheme) => (
          <SelectItem key={scheme} value={scheme}>
            {scheme.replace("_", " ")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function UpgradeStepQualification({ onComplete }: { onComplete: () => void }) {
  const { saveQualification } = useAccess();
  const form = useQualificationForm();

  async function handleSubmit() {
    await saveQualification(form.toQualificationDetails());
    onComplete();
  }

  return (
    <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-[#333333]">10th Grade</h4>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Board">
            <Input value={form.tenth.board} onChange={(e) => form.setTenth({ ...form.tenth, board: e.target.value })} placeholder="CBSE" />
          </Field>
          <Field label="Year of Passing">
            <Input type="number" value={form.tenth.yearOfPassing} onChange={(e) => form.setTenth({ ...form.tenth, yearOfPassing: Number(e.target.value) })} />
          </Field>
          <Field label="Score">
            <Input type="number" value={form.tenth.score} onChange={(e) => form.setTenth({ ...form.tenth, score: Number(e.target.value) })} />
          </Field>
          <Field label="Mark Scheme">
            <MarkSchemeSelect value={form.tenth.markScheme} onChange={(v) => form.setTenth({ ...form.tenth, markScheme: v as typeof form.tenth.markScheme })} />
          </Field>
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-[#333333]">12th Grade</h4>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Board">
            <Input value={form.twelfth.board} onChange={(e) => form.setTwelfth({ ...form.twelfth, board: e.target.value })} placeholder="CBSE" />
          </Field>
          <Field label="Stream">
            <Select value={form.twelfth.stream} onValueChange={(v) => form.setTwelfth({ ...form.twelfth, stream: v as typeof form.twelfth.stream })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="SCIENCE">Science</SelectItem>
                <SelectItem value="COMMERCE">Commerce</SelectItem>
                <SelectItem value="ARTS">Arts</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Year of Passing">
            <Input type="number" value={form.twelfth.yearOfPassing} onChange={(e) => form.setTwelfth({ ...form.twelfth, yearOfPassing: Number(e.target.value) })} />
          </Field>
          <Field label="Score">
            <Input type="number" value={form.twelfth.score} onChange={(e) => form.setTwelfth({ ...form.twelfth, score: Number(e.target.value) })} />
          </Field>
          <Field label="Mark Scheme">
            <MarkSchemeSelect value={form.twelfth.markScheme} onChange={(v) => form.setTwelfth({ ...form.twelfth, markScheme: v as typeof form.twelfth.markScheme })} />
          </Field>
        </div>
      </section>

      <section className="space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox checked={form.includeGraduation} onCheckedChange={(v) => form.setIncludeGraduation(v === true)} />
          <span className="text-sm font-semibold text-[#333333]">Graduation <span className="text-[#666666] font-normal">(optional)</span></span>
        </label>
        {form.includeGraduation && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Degree">
              <Input value={form.graduation.degree} onChange={(e) => form.setGraduation({ ...form.graduation, degree: e.target.value })} placeholder="B.Tech" />
            </Field>
            <Field label="Field">
              <Input value={form.graduation.field} onChange={(e) => form.setGraduation({ ...form.graduation, field: e.target.value })} placeholder="Computer Science" />
            </Field>
            <Field label="University">
              <Input value={form.graduation.university} onChange={(e) => form.setGraduation({ ...form.graduation, university: e.target.value })} />
            </Field>
            <Field label="Year (or Expected)">
              <Input type="number" value={form.graduation.yearOrExpected} onChange={(e) => form.setGraduation({ ...form.graduation, yearOrExpected: Number(e.target.value) })} />
            </Field>
            <Field label="Score">
              <Input type="number" value={form.graduation.score} onChange={(e) => form.setGraduation({ ...form.graduation, score: Number(e.target.value) })} />
            </Field>
            <Field label="Mark Scheme">
              <MarkSchemeSelect value={form.graduation.markScheme} onChange={(v) => form.setGraduation({ ...form.graduation, markScheme: v as typeof form.graduation.markScheme })} />
            </Field>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox checked={form.includeDiploma} onCheckedChange={(v) => form.setIncludeDiploma(v === true)} />
          <span className="text-sm font-semibold text-[#333333]">Diploma <span className="text-[#666666] font-normal">(optional)</span></span>
        </label>
        {form.includeDiploma && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Field">
              <Input value={form.diploma.field} onChange={(e) => form.setDiploma({ ...form.diploma, field: e.target.value })} />
            </Field>
            <Field label="Institution">
              <Input value={form.diploma.institution} onChange={(e) => form.setDiploma({ ...form.diploma, institution: e.target.value })} />
            </Field>
            <Field label="Year of Passing">
              <Input type="number" value={form.diploma.yearOfPassing} onChange={(e) => form.setDiploma({ ...form.diploma, yearOfPassing: Number(e.target.value) })} />
            </Field>
            <Field label="Score">
              <Input type="number" value={form.diploma.score} onChange={(e) => form.setDiploma({ ...form.diploma, score: Number(e.target.value) })} />
            </Field>
            <Field label="Mark Scheme">
              <MarkSchemeSelect value={form.diploma.markScheme} onChange={(v) => form.setDiploma({ ...form.diploma, markScheme: v as typeof form.diploma.markScheme })} />
            </Field>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-[#333333]">
          Exams for Studying Abroad <span className="text-[#666666] font-normal">(optional)</span>
        </h4>
        <div className="space-y-2">
          {APTITUDE_EXAM_NAMES.map((name) => {
            const entry = form.aptitudeExams.find((e) => e.name === name);
            return <ExamRow key={name} name={name} entry={entry} onToggle={(v) => form.toggleAptitudeExam(name, v)} onUpdate={(patch) => form.updateAptitudeExam(name, patch)} />;
          })}
          {ENGLISH_EXAM_NAMES.map((name) => {
            const entry = form.englishExams.find((e) => e.name === name);
            return <ExamRow key={name} name={name} entry={entry} onToggle={(v) => form.toggleEnglishExam(name, v)} onUpdate={(patch) => form.updateEnglishExam(name, patch)} />;
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-[#333333]">Target Plans</h4>
        <Field label="Degree Level">
          <Select value={form.targetDegreeLevel} onValueChange={(v) => form.setTargetDegreeLevel(v as typeof form.targetDegreeLevel)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="UNDERGRAD">Undergraduate</SelectItem>
              <SelectItem value="POSTGRAD">Postgraduate</SelectItem>
              <SelectItem value="PHD">PhD</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Target Countries">
          <div className="flex gap-4">
            {(["US", "UK", "OTHER"] as const).map((country) => (
              <label key={country} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={form.targetCountries.includes(country)}
                  onCheckedChange={(v) => form.toggleCountry(country, v === true)}
                />
                <span className="text-sm text-[#333333]">{country}</span>
              </label>
            ))}
          </div>
        </Field>
      </section>

      <Btn onClick={handleSubmit} disabled={!form.isValid} className="w-full">
        Finish & Unlock Full Access
      </Btn>
    </div>
  );
}

function ExamRow({
  name,
  entry,
  onToggle,
  onUpdate,
}: {
  name: AptitudeExam["name"] | EnglishExam["name"];
  entry: AptitudeExam | EnglishExam | undefined;
  onToggle: (include: boolean) => void;
  onUpdate: (patch: ExamPatch) => void;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <label className="flex items-center gap-2 cursor-pointer w-24">
        <Checkbox checked={!!entry} onCheckedChange={(v) => onToggle(v === true)} />
        <span className="text-sm text-[#333333]">{name}</span>
      </label>
      {entry && (
        <>
          <Select value={entry.status} onValueChange={(v) => onUpdate({ status: v as "TAKEN" | "PLANNED" })}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="TAKEN">Taken</SelectItem>
              <SelectItem value="PLANNED">Planned</SelectItem>
            </SelectContent>
          </Select>
          {entry.status === "TAKEN" && (
            <Input
              type="number"
              placeholder="Score"
              className="w-24"
              value={entry.score ?? ""}
              onChange={(e) => onUpdate({ score: e.target.value ? Number(e.target.value) : undefined })}
            />
          )}
        </>
      )}
    </div>
  );
}
