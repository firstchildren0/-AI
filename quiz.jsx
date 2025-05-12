
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const questions = [
  {
    year: 2023,
    number: 1,
    priority: "A",
    topic: "記憶媒体の種類と特徴",
    subtopic: "フラッシュメモリ（NAND/NOR型）",
    question: `フラッシュメモリに関する記述として、最も適切な組み合わせを下記の解答群から選べ。

ａ：揮発性メモリであるので、紫外線を照射することでデータを消去できる。
ｂ：不揮発性メモリであるので、電源を切っても記憶していたデータを保持できる。
ｃ：NAND型とNOR型を比べると、読み出し速度はNAND型の方が速い。
ｄ：NAND型とNOR型を比べると、書き込み速度はNAND型の方が速い。
ｅ：NOR型は、USBメモリやSSDなどの外部記憶装置に用いられている。`,
    options: [
      "ア：ａとｄ", "イ：ａとｅ", "ウ：ｂとｃ", "エ：ｂとｄ", "オ：ｃとｅ"
    ],
    answer: "エ",
    explanation: "bとdが正しい。\n\nフラッシュメモリは不揮発性で、NAND型は書き込みが高速。読み出し速度はNOR型が優位で、USBメモリやSSDは主にNAND型。\n\n▶ 詳しくは：[Wikipedia: フラッシュメモリ](https://ja.wikipedia.org/wiki/フラッシュメモリ) を参照。"
  }
];

export default function DiagnosisQuizApp() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [inputTime, setInputTime] = useState(60);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;
    const id = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  const filteredQuestions = questions.filter(q =>
    (!selectedTopic || q.topic === selectedTopic) &&
    (!selectedSubtopic || q.subtopic === selectedSubtopic)
  );

  const current = filteredQuestions[index] || questions[0];

  const handleAnswer = (choice) => setSelected(choice);

  const nextQuestion = () => {
    setSelected(null);
    setIndex((prev) => (prev + 1) % filteredQuestions.length);
    setCountdown(inputTime);
  };

  const uniqueTopics = [...new Set(questions.map(q => q.topic))];
  const uniqueSubtopics = selectedTopic
    ? [...new Set(questions.filter(q => q.topic === selectedTopic).map(q => q.subtopic))]
    : [];

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select onValueChange={setSelectedTopic}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="主題を選択" />
          </SelectTrigger>
          <SelectContent>
            {uniqueTopics.map((t, i) => <SelectItem key={i} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedSubtopic}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="副題を選択" />
          </SelectTrigger>
          <SelectContent>
            {uniqueSubtopics.map((s, i) => <SelectItem key={i} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Input
          type="number"
          className="w-full"
          placeholder="制限時間（秒）"
          value={inputTime}
          onChange={(e) => setInputTime(Number(e.target.value))}
        />
      </div>

      <Card>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-500">{current.year}年度 第{current.number}問（優先度：{current.priority}）</div>
          <h2 className="text-lg font-bold">{current.topic} ― {current.subtopic}</h2>
          {countdown !== null && <div className="text-red-600">⏱ 残り時間：{countdown}秒</div>}
          <pre className="bg-gray-100 p-2 whitespace-pre-wrap text-sm">{current.question}</pre>

          <div className="grid gap-2">
            {current.options.map((opt) => (
              <Button
                key={opt}
                variant={selected === opt ? (opt[0] === current.answer ? "default" : "destructive") : "outline"}
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </Button>
            ))}
          </div>

          {selected && (
            <div className="mt-4 p-3 border rounded bg-gray-50 text-sm">
              {selected[0] === current.answer
                ? "✅ 正解です！"
                : `❌ 不正解です。正解は「${current.answer}」です。`}
              <div className="mt-2 text-gray-700 whitespace-pre-wrap">{current.explanation}</div>
              <Button className="mt-4" onClick={nextQuestion}>次の問題へ</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
