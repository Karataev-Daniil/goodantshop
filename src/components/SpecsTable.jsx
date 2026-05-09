import { useParams } from "react-router-dom";

const getText = (value, lang) => {
  if (value && typeof value === "object") {
    return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }
  return value ?? "";
};

export default function SpecsTable({ specs }) {
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
