import { useParams } from "react-router-dom";
import type { Lang, Text } from "../types";

const getText = (value: Text | null | undefined, lang: string): string => {
  if (value && typeof value === "object") {
    return value[lang as Lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }
  return value ?? "";
};

export default function SpecsTable({ specs }: { specs: { label: Text; value: Text }[] }) {
  const { lang = "ru" } = useParams();

  return (
    <section className="specs">
      {specs.map((row, index) => {
        const label = getText(row.label, lang);
        const value = getText(row.value, lang);

        return (
          <div key={`${label}-${index}`} className="spec-row">
            <div className="spec-label">{label}</div>
            <div>{value}</div>
          </div>
        );
      })}
    </section>
  );
}
