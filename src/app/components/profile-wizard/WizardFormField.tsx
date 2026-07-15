"use client";

export function WizardFormField({
  label, defaultValue, wrapperClassName = "", inputClassName,
}: {
  label: string;
  defaultValue: string;
  wrapperClassName?: string;
  inputClassName: string;
}) {
  return (
    <div className={wrapperClassName}>
      <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-1.5">{label}</label>
      <input defaultValue={defaultValue} className={inputClassName} />
    </div>
  );
}
