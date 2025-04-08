
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { JournalEntry } from "@/types/journal";

interface JournalEntryCardProps {
  entry: JournalEntry;
}

export const JournalEntryCard = ({ entry }: JournalEntryCardProps) => {
  const { t } = useLanguage();

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return dateString;
    }
  };

  const getEffectivenessLabel = (rating: number) => {
    switch (rating) {
      case 1: return t('notEffective');
      case 2: return t('slightlyEffective');
      case 3: return t('moderatelyEffective');
      case 4: return t('veryEffective');
      case 5: return t('extremelyEffective');
      default: return '';
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'relaxed': return '😌';
      case 'creative': return '🎨';
      case 'energetic': return '⚡';
      case 'focused': return '🧠';
      case 'sleepy': return '😴';
      case 'neutral': return '😐';
      default: return '';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{formatDate(entry.date)}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">{t('dosage')}:</span>
          <span>{entry.dosage}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="font-medium">{t('effectiveness')}:</span>
          <div className="flex items-center">
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < entry.effectiveness ? 'text-yellow-500' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-xs text-muted-foreground">
              ({getEffectivenessLabel(entry.effectiveness)})
            </span>
          </div>
        </div>
        
        {entry.mood && (
          <div className="flex justify-between text-sm">
            <span className="font-medium">{t('mood')}:</span>
            <span>
              {getMoodIcon(entry.mood)} {t(entry.mood)}
            </span>
          </div>
        )}
        
        {entry.activity && (
          <div className="flex justify-between text-sm">
            <span className="font-medium">{t('activity')}:</span>
            <span>{entry.activity}</span>
          </div>
        )}
        
        {entry.sideEffects && entry.sideEffects.length > 0 && (
          <div className="text-sm">
            <span className="font-medium">{t('sideEffects')}:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {entry.sideEffects.map((effect) => (
                <Badge key={effect} variant="outline" className="text-xs">
                  {t(effect)}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {entry.notes && (
          <div className="mt-2">
            <span className="font-medium text-sm">{t('notes')}:</span>
            <p className="text-sm mt-1 whitespace-pre-wrap">{entry.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
