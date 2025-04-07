
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star } from "lucide-react";

interface ReviewFormProps {
  strainId: string;
  onSubmit: (data: {
    rating: number;
    comment: string;
    effectiveness: number;
    sideEffects: string[];
    userId: string;
    userName: string;
  }) => Promise<boolean>;
  onCancel?: () => void;
}

export function ReviewForm({ strainId, onSubmit, onCancel }: ReviewFormProps) {
  const { t } = useLanguage();
  const [rating, setRating] = useState(5);
  const [effectiveness, setEffectiveness] = useState(5);
  const [selectedSideEffects, setSelectedSideEffects] = useState<string[]>([]);
  const form = useForm({
    defaultValues: {
      comment: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Common side effects
  const sideEffects = [
    "dry_mouth", 
    "dry_eyes", 
    "paranoia", 
    "dizziness", 
    "anxiety", 
    "headache"
  ];

  const handleSubmit = async (data: { comment: string }) => {
    setIsSubmitting(true);
    try {
      // In a real app, we would get this from auth
      const mockUserId = "user123";
      const mockUserName = "CannabisExplorer";

      const success = await onSubmit({
        rating,
        effectiveness,
        comment: data.comment,
        sideEffects: selectedSideEffects,
        userId: mockUserId,
        userName: mockUserName,
      });

      if (success) {
        form.reset();
        setRating(5);
        setEffectiveness(5);
        setSelectedSideEffects([]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSideEffect = (effect: string) => {
    if (selectedSideEffects.includes(effect)) {
      setSelectedSideEffects(selectedSideEffects.filter(e => e !== effect));
    } else {
      setSelectedSideEffects([...selectedSideEffects, effect]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div>
          <FormLabel>{t("rating")}</FormLabel>
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1"
              >
                <Star
                  className="w-6 h-6 text-yellow-500"
                  fill={star <= rating ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        </div>

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("yourReview")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("shareYourExperience") || "Share your experience with this strain..."}
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>{t("effectiveness")}</FormLabel>
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setEffectiveness(star)}
                className="p-1"
              >
                <Star
                  className="w-6 h-6 text-green-500"
                  fill={star <= effectiveness ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <FormLabel>{t("sideEffects")}</FormLabel>
          <div className="flex flex-wrap gap-2 mt-1">
            {sideEffects.map(effect => (
              <Badge
                key={effect}
                variant={selectedSideEffects.includes(effect) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleSideEffect(effect)}
              >
                {t(effect) || effect.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              {t("cancel")}
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting} className="bg-app-primary hover:bg-app-secondary">
            {isSubmitting ? t("submitting") : t("submitReview")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
