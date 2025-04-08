
import { Strain } from "@/types/strain";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

interface StrainDetailProps {
  strain: Strain;
}

export function StrainDetail({ strain }: StrainDetailProps) {
  const { t } = useLanguage();

  const getTypeColor = () => {
    switch(strain.type?.toLowerCase()) {
      case 'sativa': return 'bg-green-500 text-white';
      case 'indica': return 'bg-purple-500 text-white';
      case 'hybrid': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  
  // Get effects with values above zero
  const getEffects = () => {
    const effectsMap: Record<string, string | undefined> = {
      relaxed: strain.relaxed,
      happy: strain.happy,
      euphoric: strain.euphoric,
      uplifted: strain.uplifted,
      sleepy: strain.sleepy,
      creative: strain.creative,
      energetic: strain.energetic,
      focused: strain.focused,
      talkative: strain.talkative,
      hungry: strain.hungry,
      tingly: strain.tingly,
      giggly: strain.giggly,
      aroused: strain.aroused,
    };

    return Object.entries(effectsMap)
      .filter(([_, value]) => value && value !== '0')
      .sort((a, b) => Number(b[1] || '0') - Number(a[1] || '0'))
      .map(([key, value]) => ({ name: key, strength: value }));
  };
  
  // Get medical conditions with values above zero
  const getMedical = () => {
    const medicalMap: Record<string, string | undefined> = {
      stress: strain.stress,
      pain: strain.pain,
      depression: strain.depression,
      anxiety: strain.anxiety,
      insomnia: strain.insomnia,
      fatigue: strain.fatigue,
      lack_of_appetite: strain.lack_of_appetite,
      nausea: strain.nausea,
      headaches: strain.headaches,
      cramps: strain.cramps,
      inflammation: strain.inflammation,
      muscle_spasms: strain.muscle_spasms,
      eye_pressure: strain.eye_pressure,
      migraines: strain.migraines,
      ptsd: strain.ptsd,
    };

    return Object.entries(medicalMap)
      .filter(([_, value]) => value && value !== '0')
      .sort((a, b) => Number(b[1] || '0') - Number(a[1] || '0'))
      .map(([key, value]) => ({ name: key, strength: value }));
  };
  
  // Get side effects with values above zero
  const getSideEffects = () => {
    const sideEffectsMap: Record<string, string | undefined> = {
      dry_mouth: strain.dry_mouth,
      dry_eyes: strain.dry_eyes,
      dizzy: strain.dizzy,
      paranoid: strain.paranoid,
      anxious: strain.anxious,
      headache: strain.headache,
    };

    return Object.entries(sideEffectsMap)
      .filter(([_, value]) => value && value !== '0')
      .sort((a, b) => Number(b[1] || '0') - Number(a[1] || '0'))
      .map(([key, value]) => ({ name: key, strength: value }));
  };

  const effects = getEffects();
  const medical = getMedical();
  const sideEffects = getSideEffects();

  // Format THC level with fallback
  const formatThcLevel = () => {
    if (strain.thc_level === undefined || strain.thc_level === null) {
      return "?";
    }
    return parseFloat(String(strain.thc_level)).toFixed(1) + "%";
  };

  return (
    <>
      <div className="relative rounded-lg overflow-hidden aspect-video bg-muted mb-6">
        {strain.img_url ? (
          <img 
            src={strain.img_url} 
            alt={strain.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900">
            <span className="text-6xl">🌿</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold mr-2">{strain.name}</h1>
        <Badge className={`${getTypeColor()}`}>
          {strain.type || "Unknown Type"}
        </Badge>
        <Badge variant="outline">
          THC: {formatThcLevel()}
        </Badge>
      </div>
      
      {strain.description && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <p>{strain.description}</p>
          </CardContent>
        </Card>
      )}

      <Accordion type="multiple" className="mb-6">
        {effects.length > 0 && (
          <AccordionItem value="effects">
            <AccordionTrigger className="text-lg">
              {t("effects") || "Effects"}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {effects.map(({ name, strength }) => (
                  <div key={name} className="flex items-center justify-between border rounded p-2">
                    <span className="capitalize">{name.replace(/_/g, ' ')}</span>
                    <Badge variant="secondary">{strength || "?"}</Badge>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {medical.length > 0 && (
          <AccordionItem value="medical">
            <AccordionTrigger className="text-lg">
              {t("medicalBenefits") || "Medical Benefits"}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {medical.map(({ name, strength }) => (
                  <div key={name} className="flex items-center justify-between border rounded p-2">
                    <span className="capitalize">{name.replace(/_/g, ' ')}</span>
                    <Badge variant="secondary">{strength || "?"}</Badge>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {sideEffects.length > 0 && (
          <AccordionItem value="side-effects">
            <AccordionTrigger className="text-lg">
              {t("sideEffects") || "Side Effects"}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {sideEffects.map(({ name, strength }) => (
                  <div key={name} className="flex items-center justify-between border rounded p-2">
                    <span className="capitalize">{name.replace(/_/g, ' ')}</span>
                    <Badge variant="secondary">{strength || "?"}</Badge>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </>
  );
}
