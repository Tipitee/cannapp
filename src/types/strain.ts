export interface Strain {
  name: string;
  type?: string;
  img_url?: string;
  most_common_terpene?: string;
  description?: string;
  thc_level?: number | string;
  
  // Effects
  relaxed?: string | number;
  happy?: string | number;
  euphoric?: string | number;
  uplifted?: string | number;
  sleepy?: string | number;
  creative?: string | number;
  energetic?: string | number;
  focused?: string | number;
  talkative?: string | number;
  hungry?: string | number;
  tingly?: string | number;
  giggly?: string | number;
  aroused?: string | number;
  
  // Side effects
  dry_mouth?: string | number;
  dry_eyes?: string | number;
  dizzy?: string | number;
  paranoid?: string | number;
  anxious?: string | number;
  headache?: string | number;
  
  // Medical conditions
  stress?: string | number;
  pain?: string | number;
  depression?: string | number;
  anxiety?: string | number;
  insomnia?: string | number;
  fatigue?: string | number;
  lack_of_appetite?: string | number;
  nausea?: string | number;
  headaches?: string | number;
  cramps?: string | number;
  inflammation?: string | number;
  muscle_spasms?: string | number;
  eye_pressure?: string | number;
  migraines?: string | number;
  ptsd?: string | number;
  
  // Other medical conditions
  spinal_cord_injury?: string | number;
  fibromyalgia?: string | number;
  phantom_limb_pain?: string | number;
  epilepsy?: string | number;
  multiple_sclerosis?: string | number;
  parkinsons?: string | number;
  tourettes_syndrome?: string | number;
  alzheimers?: string | number;
  hiv_aids?: string | number;
  tinnitus?: string | number;
  bipolar_disorder?: string | number;
  cancer?: string | number;
  gastrointestinal_disorder?: string | number;
  asthma?: string | number;
  anorexia?: string | number;
  arthritis?: string | number;
  add_adhd?: string | number;
  muscular_dystrophy?: string | number;
  hypertension?: string | number;
  glaucoma?: string | number;
  pms?: string | number;
  seizures?: string | number;
  spasticity?: string | number;
  
  // Arrays for effects and terpenes
  effects?: string[] | null;
  terpenes?: string[] | null;
}

export type StrainType = 'all' | 'sativa' | 'indica' | 'hybrid';

export interface StrainFilterProps {
  search?: string;
  type?: StrainType;
  effects?: string[];
  minThc?: number;
  maxThc?: number;
}
