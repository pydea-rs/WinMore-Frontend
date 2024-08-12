import { HookOptions, QueryKey } from "@/types/global.types";

export interface IGetExamPayload {
  slug: string;
}

export interface IGetExamResponse {
  success: boolean;
  message: string;
  result: IExam;
}

export interface IExam {
  slug: string;
  title: string;
  short_desc: string;
  meta_title: string;
  summary: string | null;
  hint_before_start: string | null;
  content: string | null;
  price_type: string;
  price_analyze_chart: number;
  price_analyze: number;
  price_chart: number;
  number_of_options: number | null;
  number_of_question: number | null;
  min_age: number | null;
  max_age: number | null;
  min_answer: number | null;
  max_answer: number | null;
  type_answer: string | null;
  can_be_null_answer_of_any_question: number | null;
  has_time_constraint: number | null;
  show_home_quick_access: number | null;
  result_type: null;
  rank: null;
  published_at: string;
  active: number | null;
  simple_result: string;
  number_of_participants: number | null;
  estimate_time: number | null;
  faq?: {
    question: string;
    answer: string;
  }[];
  results?: {
    index: string;
    title: string;
    description: string;
    short_description: string;
  }[];
}

export interface IGetExamsHook extends IGetExamPayload, HookOptions {}

export type IGetExamsQuery = QueryKey<"get-exam", IGetExamPayload>;
