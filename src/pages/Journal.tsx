
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
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
    strainId: "1",
    userId: "user1",
    date: "2025-04-03",
    dosage: "0.5g vaporized",
    effectiveness: 4,
    notes: "Helped with back pain and sleep. Felt relaxed without being too sedated.",
    mood: "relaxed",
    activity: "Evening relaxation",
    sideEffects: ["dry_mouth"],
  },
  {
    id: "2",
    strainId: "2",
    userId: "user1",
    date: "2025-04-01",
    dosage: "10mg edible",
    effectiveness: 5,
    notes: "Perfect for creative work. Had a productive afternoon without anxiety.",
    mood: "creative",
    activity: "Working on artwork",
    sideEffects: ["dry_mouth", "dry_eyes"],
  },
  {
    id: "3",
    strainId: "3",
    userId: "user1",
    date: "2025-03-28",
    dosage: "0.25g joint",
    effectiveness: 3,
    notes: "Too energetic for evening use. Will try earlier in the day next time.",
    mood: "energetic",
    activity: "Tried to relax",
    sideEffects: ["paranoia", "anxiety"],
  },
];

const Journal = () => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<JournalEntry[]>(mockJournalEntries);
  const [activeTab, setActiveTab] = useState("entries");
  
  const handleSaveEntry = (newEntry: Partial<JournalEntry>) => {
    const entry = {
      ...newEntry,
      id: Date.now().toString(),
      userId: "user1", // Would come from auth context in a real app
    } as JournalEntry;
    
    setEntries(prev => [entry, ...prev]);
    setActiveTab("entries");
  };

  return (
    <PageLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{t('journalTitle')}</h1>
          <p className="text-muted-foreground">
            {t('journalDescription')}
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="entries" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              {t('myEntries')}
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center">
              <PlusCircle className="h-4 w-4 mr-2" />
              {t('newEntry')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="entries" className="pt-4">
            {entries.length === 0 ? (
              <Card className="flex flex-col items-center justify-center p-8 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">{t('noEntriesYet')}</h3>
                <p className="text-muted-foreground mb-4">{t('startTracking')}</p>
                <Button onClick={() => setActiveTab("new")}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {t('createFirstEntry')}
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry) => (
                  <JournalEntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="new" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('newJournalEntry')}</CardTitle>
                <CardDescription>
                  {t('recordExperience')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <JournalEntryForm onSave={handleSaveEntry} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Journal;
