import { useState } from "react";

const questions = [
  {
    year: 2023,
    number: 1,
    topic: "記憶媒体の種類と特徴",
    subtopic: "NAND/NOR型フラッシュメモリ",
    options: ["ア：ａとｄ", "イ：ａとｅ", "ウ：ｂとｃ", "エ：ｂとｄ", "オ：ｃとｅ"],
    answer: "エ",
    question: `ａ：揮発性メモリであり、紫外線で消去できる。
ｂ：不揮発性メモリで電源を切っても保持できる。
ｃ：読み出し速度はNAND型の方が速い。
ｄ：書き込み速度はNAND型の方が速い。
ｅ：USBメモリにはNOR型が使われる。`,
    explanation: "bとdが正しい。NAND型は書き込みが速く、USBメモリには主にNAND型が使われる。"
  }
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const current = questions[index];

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>{current.year}年度 第{current.number}問</h2>
      <h3>{current.topic} - {current.subtopic}</h3>
      <pre>{current.question}</pre>
      {current.options.map(opt => (
        <button key={opt} onClick={() => setSelected(opt)} style={{ display: 'block', marginTop: 8 }}>
          {opt}
        </button>
      ))}
      {selected && (
        <div style={{ marginTop: 16, padding: 10, background: '#eef' }}>
          <p>{selected[0] === current.answer ? '✅ 正解！' : `❌ 不正解。正解は「${current.answer}」`}</p>
          <p>{current.explanation}</p>
          <button onClick={() => {
            setSelected(null);
            setIndex((index + 1) % questions.length);
          }}>次の問題へ</button>
        </div>
      )}
    </div>
  );
}
