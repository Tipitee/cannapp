
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";
import { JournalEntry } from "@/types/journal";

const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  dosage: z.string().min(1, { message: "Dosage is required" }),
  effectiveness: z.number().min(1).max(5),
  notes: z.string().optional(),
  mood: z.string().optional(),
  activity: z.string().optional(),
  sideEffects: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  date: new Date().toISOString().substring(0, 10),
  dosage: "",
  effectiveness: 3,
  notes: "",
  mood: "",
  activity: "",
  sideEffects: [],
};

const moodOptions = [
  "happy", 
  "relaxed", 
  "creative", 
  "energetic", 
  "focused",
  "sleepy", 
  "neutral"
];

const sideEffectOptions = [
  "dry_mouth", 
  "dry_eyes", 
  "hunger", 
  "paranoia", 
  "anxiety",
  "dizziness", 
  "headache", 
  "fatigue"
];

export interface JournalEntryFormProps {
  onSave?: (data: JournalEntry) => void;
  onCancel?: () => void;
  initialData?: Partial<JournalEntry>;
}

export const JournalEntryForm = ({ 
  onSave,
  onCancel,
  initialData = {}
}: JournalEntryFormProps) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSideEffects, setSelectedSideEffects] = useState<string[]>(initialData.sideEffects || []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      ...initialData,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const journalEntry: JournalEntry = {
        id: initialData.id || Date.now().toString(),
        userId: initialData.userId || "user123",
        date: data.date,
        dosage: data.dosage,
        effectiveness: data.effectiveness,
        notes: data.notes,
        mood: data.mood,
        activity: data.activity,
        sideEffects: selectedSideEffects,
      };
      
      if (onSave) {
        onSave(journalEntry);
      }
      
      toast.success(t("journalEntrySaved"), {
        description: t("journalEntrySavedDesc"),
      });

      // Reset form if not editing
      if (!initialData.id) {
        form.reset(defaultValues);
        setSelectedSideEffects([]);
      }
    } catch (error) {
      toast.error(t("errorSavingJournalEntry"), {
        description: t("errorSavingJournalEntryDesc"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSideEffect = (effect: string) => {
    setSelectedSideEffects(prev => 
      prev.includes(effect)
        ? prev.filter(item => item !== effect)
        : [...prev, effect]
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData.id ? t("editJournalEntry") : t("newJournalEntry")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("date")}</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dosage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("dosage")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("dosagePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="effectiveness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("effectiveness")}</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(parseInt(value))} 
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectEffectiveness")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          {"⭐".repeat(rating)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("mood")}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectMood")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {moodOptions.map((mood) => (
                        <SelectItem key={mood} value={mood}>
                          {t(mood)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("activity")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("activityPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>{t("sideEffects")}</FormLabel>
              <div className="flex flex-wrap gap-2 mt-2">
                {sideEffectOptions.map((effect) => (
                  <Button
                    key={effect}
                    type="button"
                    variant={selectedSideEffects.includes(effect) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSideEffect(effect)}
                  >
                    {t(effect)}
                  </Button>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("notes")}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t("notesPlaceholder")} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="px-0 pt-4 flex gap-2 justify-between">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  {t("cancel")}
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("saving")}
                  </>
                ) : initialData.id ? t("updateEntry") : t("saveEntry")}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
