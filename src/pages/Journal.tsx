
import { useLanguage } from "@/contexts/LanguageContext";
import { PageLayout } from "@/components/layout/PageLayout";
import { useState } from "react";
import { JournalEntryForm } from "@/components/journal/JournalEntryForm";
import { JournalEntryCard } from "@/components/journal/JournalEntryCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen } from "lucide-react";
import { JournalEntry } from "@/types/journal";

// Mock data - would come from an API in a real app
const mockJournalEntries: JournalEntry[] = [
  {
    id: "1",
    userId: "user123",
    date: "2025-01-15",
    dosage: "10mg edible",
    effectiveness: 4,
    notes: "Helped with anxiety and sleep. Felt relaxed after about 1 hour.",
    mood: "relaxed",
    activity: "Evening relaxation",
    sideEffects: ["dry_mouth", "hunger"],
  },
  {
    id: "2",
    userId: "user123",
    date: "2025-01-10",
    dosage: "0.5g vaporized",
    effectiveness: 3,
    notes: "Good for creativity, but didn't help much with pain.",
    mood: "creative",
    activity: "Art session",
    sideEffects: ["dry_eyes"],
  }
];

const Journal = () => {
  const { t } = useLanguage();
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(mockJournalEntries);
  const [showForm, setShowForm] = useState(false);
  
  const handleSaveEntry = (entry: JournalEntry) => {
    // In a real app, this would save to a database
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      userId: "user123", // In a real app, this would come from auth
    };
    setJournalEntries([newEntry, ...journalEntries]);
    setShowForm(false);
  };
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-3xl font-bold">{t("journal")}</h1>
          <Button 
            onClick={() => setShowForm(!showForm)} 
            variant={showForm ? "outline" : "default"}
            className="mt-2 sm:mt-0"
          >
            {showForm ? t("cancel") : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" /> 
                {t("newEntry")}
              </>
            )}
          </Button>
        </div>
        
        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t("newJournalEntry")}</CardTitle>
              <CardDescription>{t("journalEntryDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <JournalEntryForm onSave={handleSaveEntry} onCancel={() => setShowForm(false)} />
            </CardContent>
          </Card>
        )}
        
        {journalEntries.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {journalEntries.map((entry) => (
              <JournalEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">{t("noJournalEntries")}</h3>
            <p className="mt-2 text-muted-foreground">{t("startJournalingPrompt")}</p>
            <Button onClick={() => setShowForm(true)} className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" />
              {t("createFirstEntry")}
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Journal;
