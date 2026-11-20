export type WorkforceDivision = "mep" | "civil";

export interface WorkforceRole {
  id: string;
  title: string;
  division: WorkforceDivision;
  category: string;
  environment: string;
}

/**
 * Provisionally excluded per client markup pending final confirmation (not shown publicly):
 * - Site Manager
 * - Project Engineer
 * - Welding Engineer
 * - QA/QC Inspector
 * - Performing Authority
 * - Material Coordinator
 * - Millwright Technician
 *
 * Removed per client request (Nov 2026): engineering, coordination and supervision roles
 * - Mechanical Engineer, Construction Engineer, Project Coordinator
 * - Welding Supervisors, Safety Officer, JP — Job Performer
 * - Piping Foreman, Structural Supervisor, Structural Foreman, Rigging Supervisor, Rigging Foreman
 */
export const WORKFORCE_ROLES: WorkforceRole[] = [
  // Onshore & Offshore MEP
  { id: "mep-12", title: "Multi Welder — GTAW/SMAW", division: "mep", category: "Welding & Fabrication", environment: "Onshore / Offshore" },
  { id: "mep-13", title: "Welder — SMAW", division: "mep", category: "Welding & Fabrication", environment: "Onshore / Offshore" },
  { id: "mep-14", title: "Piping & Structural Fabricator", division: "mep", category: "Welding & Fabrication", environment: "Onshore / Offshore" },
  { id: "mep-15", title: "Piping & Structural Fitter", division: "mep", category: "Welding & Fabrication", environment: "Onshore / Offshore" },
  { id: "mep-16", title: "Grinder Men", division: "mep", category: "Welding & Fabrication", environment: "Onshore / Offshore" },
  { id: "mep-17", title: "Iron Workers", division: "mep", category: "Rigging & Structural", environment: "Onshore / Offshore" },
  { id: "mep-18", title: "Scaffolders", division: "mep", category: "Rigging & Structural", environment: "Onshore / Offshore" },
  { id: "mep-19", title: "Erectors", division: "mep", category: "Rigging & Structural", environment: "Onshore / Offshore" },
  { id: "mep-20", title: "Riggers", division: "mep", category: "Rigging & Structural", environment: "Onshore / Offshore" },
  { id: "mep-21", title: "Painters — Brush & Spray", division: "mep", category: "Surface & Coatings", environment: "Onshore / Offshore" },
  { id: "mep-22", title: "Sand Blasters", division: "mep", category: "Surface & Coatings", environment: "Onshore / Offshore" },
  { id: "mep-23", title: "Mechanical Helper", division: "mep", category: "Mechanical & Equipment", environment: "Onshore / Offshore" },
  { id: "mep-24", title: "Man-Lift Operators", division: "mep", category: "Mechanical & Equipment", environment: "Onshore / Offshore" },
  { id: "mep-25", title: "Industrial Electrician", division: "mep", category: "Electrical & Instrumentation", environment: "Onshore / Offshore" },
  { id: "mep-26", title: "Instrument Technician", division: "mep", category: "Electrical & Instrumentation", environment: "Onshore / Offshore" },

  // Civil & Construction (36 roles)
  { id: "civ-1", title: "Helpers / General Labourers", division: "civil", category: "General & Site Support", environment: "Civil Sector" },
  { id: "civ-2", title: "Flagmen", division: "civil", category: "Safety & Site Watch", environment: "Civil Sector" },
  { id: "civ-3", title: "Fire Watchers", division: "civil", category: "Safety & Site Watch", environment: "Civil Sector" },
  { id: "civ-4", title: "HSE / Safety Officers", division: "civil", category: "Safety & Site Watch", environment: "Civil Sector" },
  { id: "civ-5", title: "Steel Fixers", division: "civil", category: "Structural & Carpentry", environment: "Civil Sector" },
  { id: "civ-6", title: "Bar Benders", division: "civil", category: "Structural & Carpentry", environment: "Civil Sector" },
  { id: "civ-7", title: "Shuttering Carpenters", division: "civil", category: "Structural & Carpentry", environment: "Civil Sector" },
  { id: "civ-8", title: "Gypsum Carpenters", division: "civil", category: "Structural & Carpentry", environment: "Civil Sector" },
  { id: "civ-9", title: "Finishing Carpenters", division: "civil", category: "Structural & Carpentry", environment: "Civil Sector" },
  { id: "civ-10", title: "Block / Plaster Masons", division: "civil", category: "Masonry & Finishing", environment: "Civil Sector" },
  { id: "civ-11", title: "Ceramic Masons", division: "civil", category: "Masonry & Finishing", environment: "Civil Sector" },
  { id: "civ-12", title: "Interlock Masons", division: "civil", category: "Masonry & Finishing", environment: "Civil Sector" },
  { id: "civ-13", title: "Pasco Masons", division: "civil", category: "Masonry & Finishing", environment: "Civil Sector" },
  { id: "civ-14", title: "Concrete Masons", division: "civil", category: "Masonry & Finishing", environment: "Civil Sector" },
  { id: "civ-15", title: "Painters — Brush", division: "civil", category: "Masonry & Finishing", environment: "Civil Sector" },
  { id: "civ-16", title: "Painters — Spray", division: "civil", category: "Masonry & Finishing", environment: "Civil Sector" },
  { id: "civ-17", title: "Scaffolders", division: "civil", category: "Rigging & Access", environment: "Civil Sector" },
  { id: "civ-18", title: "Riggers & Jointers", division: "civil", category: "Rigging & Access", environment: "Civil Sector" },
  { id: "civ-19", title: "Domestic Electricians", division: "civil", category: "Building Services & MEP", environment: "Civil Sector" },
  { id: "civ-20", title: "HVAC Technicians", division: "civil", category: "Building Services & MEP", environment: "Civil Sector" },
  { id: "civ-21", title: "Ductmen", division: "civil", category: "Building Services & MEP", environment: "Civil Sector" },
  { id: "civ-22", title: "Plumbers", division: "civil", category: "Building Services & MEP", environment: "Civil Sector" },
  { id: "civ-23", title: "Forklift Operators", division: "civil", category: "Equipment & Drivers", environment: "Civil Sector" },
  { id: "civ-24", title: "Light Duty Drivers", division: "civil", category: "Equipment & Drivers", environment: "Civil Sector" },
  { id: "civ-25", title: "Heavy Duty Drivers", division: "civil", category: "Equipment & Drivers", environment: "Civil Sector" },
  { id: "civ-26", title: "Hoist Operators", division: "civil", category: "Equipment & Drivers", environment: "Civil Sector" },
  { id: "civ-27", title: "Chargehands Civil", division: "civil", category: "Supervision & Coordination", environment: "Civil Sector" },
  { id: "civ-28", title: "Foremen Civil", division: "civil", category: "Supervision & Coordination", environment: "Civil Sector" },
  { id: "civ-29", title: "Supervisors Civil", division: "civil", category: "Supervision & Coordination", environment: "Civil Sector" },
  { id: "civ-30", title: "Project Coordinators", division: "civil", category: "Supervision & Coordination", environment: "Civil Sector" },
  { id: "civ-31", title: "Document Controller", division: "civil", category: "Admin & Facility Support", environment: "Civil Sector" },
  { id: "civ-32", title: "Admin & Clerical Staff", division: "civil", category: "Admin & Facility Support", environment: "Civil Sector" },
  { id: "civ-33", title: "Office Boys", division: "civil", category: "Admin & Facility Support", environment: "Civil Sector" },
  { id: "civ-34", title: "Cleaners", division: "civil", category: "Admin & Facility Support", environment: "Civil Sector" },
  { id: "civ-35", title: "Gardeners", division: "civil", category: "Landscaping", environment: "Civil Sector" },
  { id: "civ-36", title: "Landscape Workers", division: "civil", category: "Landscaping", environment: "Civil Sector" },
];
