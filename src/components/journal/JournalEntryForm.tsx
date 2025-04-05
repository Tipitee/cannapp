
import { useState } from "react";
import { Strain, JournalEntry } from "@/types/strain";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckIcon, PlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface JournalEntryFormProps {
  strain?: Strain;
  onSave?: (entry: Partial<JournalEntry>) => void;
}

export const JournalEntryForm = ({ strain, onSave }: JournalEntryFormProps) => {
  const { t } = useLanguage();
  const [entry, setEntry] = useState<Partial<JournalEntry>>({
    strainId: strain?.id,
    date: new Date().toISOString().split('T')[0],
    dosage: '',
    effectiveness: 3,
    mood: 'neutral',
    notes: '',
    activity: '',
    sideEffects: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const commonSideEffects = [
    { id: 'dry_mouth', label: t('dryMouth') },
    { id: 'dry_eyes', label: t('dryEyes') },
    { id: 'paranoia', label: t('paranoia') },
    { id: 'headache', label: t('headache') },
    { id: 'dizziness', label: t('dizziness') },
    { id: 'anxiety', label: t('anxiety') },
  ];

  const handleChange = (field: string, value: any) => {
    setEntry(prev => ({ ...prev, [field]: value }));
  };

  const toggleSideEffect = (effect: string) => {
    setEntry(prev => {
      const currentEffects = [...(prev.sideEffects || [])];
      if (currentEffects.includes(effect)) {
        return { ...prev, sideEffects: currentEffects.filter(e => e !== effect) };
      } else {
        return { ...prev, sideEffects: [...currentEffects, effect] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate saving - would be an API call in a real app
    setTimeout(() => {
      if (onSave) {
        onSave(entry);
      }
      
      toast.success(t('journalEntrySaved'), {
        description: t('journalEntrySuccess'),
      });
      
      // Reset form
      setEntry({
        strainId: strain?.id,
        date: new Date().toISOString().split('T')[0],
        dosage: '',
        effectiveness: 3,
        mood: 'neutral',
        notes: '',
        activity: '',
        sideEffects: [],
      });
      
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="date">{t('date')}</Label>
        <Input
          id="date"
          type="date"
          value={entry.date}
          onChange={(e) => handleChange('date', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="dosage">{t('dosage')}</Label>
        <Input
          id="dosage"
          placeholder={t('dosagePlaceholder')}
          value={entry.dosage}
          onChange={(e) => handleChange('dosage', e.target.value)}
          required
        />
      </div>

      <div>
        <Label>{t('effectiveness')}</Label>
        <div className="flex space-x-2 py-2">
          {[1, 2, 3, 4, 5].map(rating => (
            <Button
              key={rating}
              type="button"
              variant={entry.effectiveness === rating ? "default" : "outline"}
              onClick={() => handleChange('effectiveness', rating)}
              className="flex-1"
            >
              {rating}
            </Button>
          ))}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground mt-1">
          <span>{t('notEffective')}</span>
          <span>{t('veryEffective')}</span>
        </div>
      </div>

      <div>
        <Label htmlFor="mood">{t('mood')}</Label>
        <Select 
          value={entry.mood} 
          onValueChange={(value) => handleChange('mood', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('selectMood')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="happy">{t('happy')}</SelectItem>
            <SelectItem value="relaxed">{t('relaxed')}</SelectItem>
            <SelectItem value="creative">{t('creative')}</SelectItem>
            <SelectItem value="energetic">{t('energetic')}</SelectItem>
            <SelectItem value="focused">{t('focused')}</SelectItem>
            <SelectItem value="sleepy">{t('sleepy')}</SelectItem>
            <SelectItem value="neutral">{t('neutral')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="activity">{t('activity')}</Label>
        <Input
          id="activity"
          placeholder={t('activityPlaceholder')}
          value={entry.activity}
          onChange={(e) => handleChange('activity', e.target.value)}
        />
      </div>

      <div>
        <Label>{t('sideEffects')}</Label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {commonSideEffects.map(effect => (
            <div key={effect.id} className="flex items-center space-x-2">
              <Checkbox
                id={`effect-${effect.id}`}
                checked={(entry.sideEffects || []).includes(effect.id)}
                onCheckedChange={() => toggleSideEffect(effect.id)}
              />
              <Label htmlFor={`effect-${effect.id}`}>{effect.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="notes">{t('notes')}</Label>
        <Textarea
          id="notes"
          placeholder={t('notesPlaceholder')}
          value={entry.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('saving')}
          </>
        ) : (
          <>
            <PlusIcon className="mr-2 h-4 w-4" />
            {t('saveJournalEntry')}
          </>
        )}
      </Button>
    </form>
  );
};
