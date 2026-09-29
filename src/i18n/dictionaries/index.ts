import type { Locale } from "../config";
import { type Dict, en } from "./en";
import { vi } from "./vi";

export type { Dict };
export const dictionaries: Record<Locale, Dict> = { en, vi };
