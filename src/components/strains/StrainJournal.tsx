
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { JournalEntry, Strain } from "@/types/strain";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";

interface StrainJournalProps {
  strain: Strain;
  entries?: JournalEntry[];
}

export function StrainJournal({ strain, entries = [] }: StrainJournalProps) {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date>(new Date());
  
  // Group entries by date for easier display
  const entriesByDate = entries.reduce((acc, entry) => {
    const dateStr = entry.date.split('T')[0]; // Get YYYY-MM-DD format
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(entry);
    return acc;
  }, {} as Record<string, JournalEntry[]>);
  
  // Get dates that have entries
  const highlightedDates = Object.keys(entriesByDate).map(dateStr => new Date(dateStr));
  
  // Format date for display
  const formattedDate = format(date, 'yyyy-MM-dd');
  const currentEntries = entriesByDate[formattedDate] || [];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("journalYourExperience")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calendar">
          <TabsList className="mb-4">
            <TabsTrigger value="calendar">{t("calendar")}</TabsTrigger>
            <TabsTrigger value="list">{t("list")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-4">
            <div className="flex justify-center">
              <Calendar 
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="rounded-md border"
                // Highlight dates with entries
                modifiers={{
                  highlighted: highlightedDates
                }}
                modifiersStyles={{
                  highlighted: {
                    backgroundColor: 'rgba(126, 105, 171, 0.1)',
                    fontWeight: 'bold'
                  }
                }}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">
                {format(date, 'MMMM d, yyyy')}
              </h3>
              
              {currentEntries.length > 0 ? (
                <div className="space-y-3">
                  {currentEntries.map((entry) => (
                    <Card key={entry.id} className="bg-muted/50">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">{t("dosage")}: {entry.dosage}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        
                        <div className="text-sm space-y-1">
                          <p>{t("effectiveness")}: {entry.effectiveness}/5</p>
                          <p>{t("mood")}: {entry.mood}</p>
                          <p>{t("activity")}: {entry.activity}</p>
                          
                          {entry.sideEffects.length > 0 && (
                            <div className="mt-1">
                              <span className="text-muted-foreground">{t("sideEffects")}:</span>{' '}
                              {entry.sideEffects.join(', ')}
                            </div>
                          )}
                          
                          {entry.notes && (
                            <p className="mt-2 italic">"{entry.notes}"</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-4">
                  {t("noEntriesForThisDay")}
                </div>
              )}
            </div>
            
            <div className="flex justify-center">
              <Button className="bg-app-primary hover:bg-app-secondary">
                {t("addNewEntry")}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <div className="space-y-4">
              {entries.length > 0 ? (
                entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((entry) => (
                    <Card key={entry.id} className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">
                            {format(new Date(entry.date), 'MMMM d, yyyy')}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {t("dosage")}: {entry.dosage}
                          </div>
                        </div>
                        
                        <div className="text-sm space-y-1">
                          <p>{t("effectiveness")}: {entry.effectiveness}/5</p>
                          <p>{t("mood")}: {entry.mood}</p>
                          <p>{t("activity")}: {entry.activity}</p>
                          
                          {entry.notes && (
                            <p className="mt-2 italic">"{entry.notes}"</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  {t("noJournalEntriesYet")}
                </div>
              )}
              
              <div className="flex justify-center">
                <Button className="bg-app-primary hover:bg-app-secondary">
                  {t("addNewEntry")}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
