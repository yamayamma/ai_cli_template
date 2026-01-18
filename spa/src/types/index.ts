// Section types
export interface SubSection {
  id: string;
  title: string;
  path: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
  subsections?: SubSection[];
}

// Step types
export interface Example {
  title: string;
  description: string;
  codeSnippet?: string;
}

export interface Step {
  id: string;
  name: string;
  title: string;
  description: string;
  shortDescription: string;
  order: number;
  icon: string;
  color: string;
  examples: Example[];
  relatedCommands: string[];
  previousStep?: string;
  nextStep?: string;
}

// Command types
export interface CommandOption {
  name: string;
  shortName?: string;
  description: string;
  required: boolean;
  default?: string;
  defaultValue?: string;
}

export interface CommandExample {
  title: string;
  command: string;
  code: string;
  description: string;
  output?: string;
}

export interface Command {
  id: string;
  name: string;
  alias?: string;
  description: string;
  usage: string;
  syntax?: string;
  category: string;
  step: number;
  options: CommandOption[];
  examples: CommandExample[];
  relatedSteps: string[];
  tags: string[];
}

// Comparison types
export interface Methodology {
  id: string;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
}

export interface ComparisonDimension {
  name: string;
  values: Record<string, string>;
}

export interface Comparison {
  id: string;
  methodologies: Methodology[];
  dimensions: ComparisonDimension[];
}

// Navigation types
export interface Breadcrumb {
  label: string;
  path: string;
}

export interface NavigationState {
  currentSection: string;
  currentPath: string;
  breadcrumbs: Breadcrumb[];
  searchQuery?: string;
}
