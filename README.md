# Pak Arab Manpower Supply LLC — Corporate Website

Production-ready Next.js App Router corporate website for **Pak Arab Manpower Supply LLC** (Abu Dhabi, UAE), designed & developed by [Harsh Apex Digital Solutions](https://harshapex.com.lk).

## Tech Stack
- **Framework:** Next.js 15 (App Router, Static Site Generation)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Motion:** GSAP + ScrollTrigger, Motion for React, Vanta.js (`VANTA.NET`)
- **Icons:** Lucide React

## Local Setup & Production Build
```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run start
```

## Vercel Deployment
1. Push this directory to your GitHub repository.
2. Import the repository in Vercel (Framework Preset: **Next.js**).
3. No environment variables or database connections are required (100% frontend architecture with centralized data in `src/data/`).

## Client Handover & Confirmation Checklist
Before pointing the production domain (`www.pakarabmps.com`), please confirm with the client:
1. **Cancelled MEP Roles:** Confirm the 7 provisionally excluded roles (`Site Manager`, `Project Engineer`, `Welding Engineer`, `QA/QC Inspector`, `Performing Authority`, `Material Coordinator`, `Millwright Technician`) should remain omitted.
2. **ADNOC & CICPA Documentation:** Confirm active supporting documentation if you wish to feature ADNOC approval or CICPA permit eligibility badges publicly.
3. **Secondary Address:** Confirm whether the historical Shabiya-12 address (`Building C-06, Shabiya-12, P.O. Box 133046`) stored in `src/data/company.ts` should remain hidden or be listed as a secondary branch.
4. **Client Logo Permissions:** Confirm usage permissions for the 26 client logos in `public/images/clients/`.
