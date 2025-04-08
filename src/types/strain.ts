export interface Strain {
  name: string;
  type?: string;
  img_url?: string;
  most_common_terpene?: string;
  description?: string;
  thc_level?: number | string;
  
  // Effects - all defined as string to accommodate both string and numeric values
  relaxed?: string;
  happy?: string;
  euphoric?: string;
  uplifted?: string;
  sleepy?: string;
  creative?: string;
  energetic?: string;
  focused?: string;
  talkative?: string;
  hungry?: string;
  tingly?: string;
  giggly?: string;
  aroused?: string;
  
  // Side effects
  dry_mouth?: string;
  dry_eyes?: string;
  dizzy?: string;
  paranoid?: string;
  anxious?: string;
  headache?: string;
  
  // Medical conditions
  stress?: string;
  pain?: string;
  depression?: string;
  anxiety?: string;
  insomnia?: string;
  fatigue?: string;
  lack_of_appetite?: string;
  nausea?: string;
  headaches?: string;
  cramps?: string;
  inflammation?: string;
  muscle_spasms?: string;
  eye_pressure?: string;
  migraines?: string;
  ptsd?: string;
  
  // Other medical conditions
  spinal_cord_injury?: string;
  fibromyalgia?: string;
  phantom_limb_pain?: string;
  epilepsy?: string;
  multiple_sclerosis?: string;
  parkinsons?: string;
  tourettes_syndrome?: string;
  alzheimers?: string;
  hiv_aids?: string;
  tinnitus?: string;
  bipolar_disorder?: string;
  cancer?: string;
  gastrointestinal_disorder?: string;
  asthma?: string;
  anorexia?: string;
  arthritis?: string;
  add_adhd?: string;
  muscular_dystrophy?: string;
  hypertension?: string;
  glaucoma?: string;
  pms?: string;
  seizures?: string;
  spasticity?: string;
  
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
