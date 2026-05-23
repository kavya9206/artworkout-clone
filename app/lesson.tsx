import { useLocalSearchParams } from "expo-router";

import DrawingCanvas from "../components/DrawingCanvas";

import { lessons } from "../data/lessons";

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams();

  const lesson = lessons.find(
    (l) => l.id.toString() === lessonId
  );

  if (!lesson) return null;

  return <DrawingCanvas lesson={lesson} />;
}