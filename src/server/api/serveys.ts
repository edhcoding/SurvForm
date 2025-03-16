import express from "express";
import JsonStorage from "@/utils/jsonStorage";
import path from "path";
import { SectionData, Statistics, SurveyResponse } from "@/types/app";
import { getStatistics } from "@/utils/statistics";

const router = express.Router();

const storage = new JsonStorage<{
  sections: SectionData[];
  emailCollected: boolean;
  responses: SurveyResponse[];
}>(path.join(__dirname, "../data/surveys.json"));

// 설문조사 데이터 조회 - GET
router.get("/", (_req, res) => {
  return res.json(storage.getAll());
});

// 설문조사 데이터 생성 - POST
router.post("/", (req, res) => {
  const id = Date.now();
  storage.set(id, {
    ...req.body,
    emailCollected: false,
  });

  return res.json({ id });
});

// 설문조사 데이터 수정 - PUT
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  storage.set(id, req.body);

  return res.json({ id });
});

// PUT은 전체 수정, PATCH는 일부 수정
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = storage.get(id);
  storage.set(id, {
    ...data,
    ...req.body,
  });

  return res.json({ id });
});

// 설문조사 상세 조회 - GET
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = storage.get(id);

  if (!data) {
    return res.status(404).json({ error: "Not found" });
  }

  return res.json(data);
});

router.post("/:id/responses", (req, res) => {
  const id = Number(req.params.id);
  const data = storage.get(id);

  if (!data) {
    return res.status(404).json({ error: "Not found" });
  }

  storage.set(id, {
    ...data,
    responses: [...(data.responses ?? []), req.body],
  });

  return res.status(201).json({ message: "Response added" });
});

router.get("/:id/statistics", (req, res) => {
  const id = Number(req.params.id);
  const data = storage.get(id);

  if (!data) {
    return res.status(404).json({ error: "Not found" });
  }

  const { sections, responses } = data;

  const statistics: Statistics = getStatistics(sections, responses);

  return res.json({ statistics });
});

export default router;
