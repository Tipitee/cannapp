
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

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  strain: z.string().optional(),
  rating: z.string().min(1, {
    message: "Please select a rating.",
  }),
  effects: z.string().min(5, {
    message: "Effects must be at least 5 characters.",
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  title: "",
  strain: "",
  rating: "",
  effects: "",
  notes: "",
};

const effectOptions = [
  "Relaxed", 
  "Happy", 
  "Uplifted", 
  "Creative", 
  "Focused",
  "Energetic", 
  "Sleepy", 
  "Hungry", 
  "Talkative", 
  "Euphoric"
];

export interface JournalEntryFormProps {
  onSave?: (data: FormValues) => void;
  initialData?: FormValues;
}

export const JournalEntryForm = ({ 
  onSave,
  initialData = defaultValues
}: JournalEntryFormProps) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSave) {
        onSave(data);
      }
      
      toast.success(t("journalEntrySaved"), {
        description: t("journalEntrySavedDesc"),
      });

      // Clear form if not editing
      if (!initialData.title) {
        form.reset(defaultValues);
      }
    } catch (error) {
      toast.error(t("errorSavingJournalEntry"), {
        description: t("errorSavingJournalEntryDesc"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData.title ? t("editJournalEntry") : t("newJournalEntry")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("title")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("journalTitlePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="strain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("strain")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("strainPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("rating")}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectRating")} />
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
              name="effects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("effects")}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t("effectsPlaceholder")} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <div className="flex flex-wrap gap-2 my-4">
              {effectOptions.map((effect) => (
                <Button
                  key={effect}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentEffects = form.getValues("effects");
                    const newEffects = currentEffects 
                      ? `${currentEffects}, ${effect}` 
                      : effect;
                    form.setValue("effects", newEffects);
                  }}
                >
                  {effect}
                </Button>
              ))}
            </div>

            <CardFooter className="px-0">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("saving")}
                  </>
                ) : initialData.title ? t("updateEntry") : t("saveEntry")}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
