
export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  dosage: string;
  effectiveness: number;
  notes?: string;
  mood?: string;
  activity?: string;
  sideEffects?: string[];
  strainId?: string; // Keep reference to strainId for future compatibility
}
