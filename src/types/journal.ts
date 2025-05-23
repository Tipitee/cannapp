
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
  // Removed strainId as we've eliminated strains from the application
}
