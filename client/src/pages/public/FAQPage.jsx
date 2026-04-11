import { useApp } from "../../context/AppContext.jsx";

export default function FAQPage() {
  const { meta } = useApp();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <div className="space-y-6">
        <h1 className="page-title">Frequently Asked Questions</h1>
        {meta.faq.map((item) => (
          <div key={item.question} className="glass rounded-[28px] p-6">
            <h2 className="font-display text-2xl font-semibold text-slate-900">{item.question}</h2>
            <p className="mt-3 text-slate-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
