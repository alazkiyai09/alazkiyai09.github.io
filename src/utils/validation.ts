/**
 * Data validation schemas and utilities
 * Uses Zod for runtime type validation
 */

import { z } from 'zod';

// ============ Profile Schema ============
export const LocationSchema = z.object({
  city: z.string(),
  region: z.string(),
  country: z.string(),
  flag: z.string(),
  timezone: z.string(),
  availableForRemote: z.boolean().optional(),
});

export const StatusSchema = z.object({
  current: z.string(),
  openTo: z.array(z.string()),
});

export const BioSchema = z.object({
  short: z.string(),
  long: z.string(),
});

export const SocialSchema = z.object({
  github: z.string().url(),
  linkedin: z.string().url(),
  googleScholar: z.string().url().optional(),
});

export const ProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  tagline: z.string(),
  location: LocationSchema,
  status: StatusSchema,
  bio: BioSchema,
  social: SocialSchema,
  resume: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export function validateProfile(data: unknown): Profile {
  return ProfileSchema.parse(data);
}

// ============ Domain Expertise Schema ============
export const ExpertiseAreaSchema = z.object({
  name: z.string(),
  years: z.number(),
  description: z.string(),
  highlights: z.array(z.string()),
  technologies: z.array(z.string()),
});

export const DomainExpertiseSchema = z.object({
  areas: z.array(ExpertiseAreaSchema),
});

export type DomainExpertise = z.infer<typeof DomainExpertiseSchema>;
export type ExpertiseArea = z.infer<typeof ExpertiseAreaSchema>;

export function validateDomainExpertise(data: unknown): DomainExpertise {
  return DomainExpertiseSchema.parse(data);
}

// ============ Skills Schema ============
export const SkillSchema = z.object({
  name: z.string(),
  level: z.number().min(0).max(100),
});

export const SkillCategorySchema = z.object({
  name: z.string(),
  skills: z.array(SkillSchema),
});

export const SkillsSchema = z.object({
  categories: z.array(SkillCategorySchema),
});

export type Skills = z.infer<typeof SkillsSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type Skill = z.infer<typeof SkillSchema>;

export function validateSkills(data: unknown): Skills {
  return SkillsSchema.parse(data);
}

// ============ Experience Schema ============
export const ExperiencePeriodSchema = z.object({
  start: z.string(),
  end: z.string().optional(),
  current: z.boolean().optional(),
});

export const ExperienceItemSchema = z.object({
  id: z.string(),
  company: z.string(),
  title: z.string(),
  location: z.string().optional(),
  period: ExperiencePeriodSchema,
  description: z.string().optional(),
  responsibilities: z.array(z.string()),
  achievements: z.array(z.string()).optional(),
  technologies: z.array(z.string()),
  category: z.string().optional(),
});

export const ExperienceSchema = z.object({
  experience: z.array(ExperienceItemSchema),
});

export type Experience = z.infer<typeof ExperienceSchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type ExperiencePeriod = z.infer<typeof ExperiencePeriodSchema>;

export function validateExperience(data: unknown): Experience {
  return ExperienceSchema.parse(data);
}

// ============ Education Schema ============
export const EducationPeriodSchema = z.object({
  start: z.string(),
  end: z.string().optional(),
  current: z.boolean().optional(),
});

export const TeachingExperienceSchema = z.object({
  role: z.string(),
  courses: z.array(z.string()),
  period: z.string(),
  details: z.string(),
});

export const EducationItemSchema = z.object({
  id: z.string(),
  institution: z.string(),
  location: z.string().optional(),
  degree: z.string(),
  field: z.string(),
  period: EducationPeriodSchema,
  gpa: z.string().optional(),
  thesis: z.string().optional(),
  advisor: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  relevantCoursework: z.array(z.string()).optional(),
  teachingExperience: z.array(TeachingExperienceSchema).optional(),
});

export const EducationSchema = z.object({
  education: z.array(EducationItemSchema),
});

export type Education = z.infer<typeof EducationSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type EducationPeriod = z.infer<typeof EducationPeriodSchema>;
export type TeachingExperience = z.infer<typeof TeachingExperienceSchema>;

export function validateEducation(data: unknown): Education {
  return EducationSchema.parse(data);
}

// ============ Activity Log Schema ============
export const ActivityMetricsSchema = z.object({
  linesOfCode: z.number().optional(),
  experimentsRun: z.number().optional(),
  papersRead: z.number().optional(),
  hoursSpent: z.number().optional(),
  samplesAnalyzed: z.number().optional(),
  totalProjects: z.number().optional(),
}).passthrough(); // Allow additional metrics

export const ActivityLinkSchema = z.object({
  label: z.string(),
  url: z.string().url(),
});

export const ActivitySchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.enum([
    'project_start',
    'project_complete',
    'code_commit',
    'paper_read',
    'experiment_run',
    'blog_post',
    'skill_learned',
    'milestone_reached',
    'publication',
    'application_sent',
  ]),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
  projectRef: z.string().optional(),
  metrics: ActivityMetricsSchema.optional(),
  links: z.array(ActivityLinkSchema).optional(),
});

export const ActivityLogSchema = z.object({
  activities: z.array(ActivitySchema),
});

export type ActivityLog = z.infer<typeof ActivityLogSchema>;
export type Activity = z.infer<typeof ActivitySchema>;

export function validateActivityLog(data: unknown): ActivityLog {
  return ActivityLogSchema.parse(data);
}

// ============ Journey Phases Schema ============
export const JourneyPhaseSchema = z.object({
  name: z.string(),
  days: z.string(),
  description: z.string(),
  status: z.enum(['completed', 'in-progress', 'upcoming']),
  projects: z.array(z.string()),
  skills: z.array(z.string()),
});

export const JourneyPhasesSchema = z.object({
  phases: z.array(JourneyPhaseSchema),
});

export type JourneyPhases = z.infer<typeof JourneyPhasesSchema>;
export type JourneyPhase = z.infer<typeof JourneyPhaseSchema>;

export function validateJourneyPhases(data: unknown): JourneyPhases {
  return JourneyPhasesSchema.parse(data);
}

// ============ Safe Validation Utilities ============

/**
 * Safely parse data with a schema, returning null if validation fails
 */
export function safeParse<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Unknown validation error' };
  }
}

/**
 * Validate with fallback to default value
 */
export function validateWithDefault<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  defaultValue: T
): T {
  const result = safeParse(schema, data);
  return result.success ? result.data : defaultValue;
}
