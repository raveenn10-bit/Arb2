"use client";

import { useState, useMemo } from "react";
import { Search, X, MessageCircle, ChevronDown, HardHat, Wrench } from "lucide-react";
import { WORKFORCE_ROLES, type WorkforceDivision } from "@/data/workforce";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WorkforceDirectory() {
  const [division, setDivision] = useState<"all" | WorkforceDivision>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showAll, setShowAll] = useState(false);
  const [openMobileGroups, setOpenMobileGroups] = useState<Record<string, boolean>>({
    "Engineering & Coordination": true,
    "Structural & Carpentry": true,
  });

  const categories = useMemo(() => {
    const base =
      division === "all"
        ? WORKFORCE_ROLES
        : WORKFORCE_ROLES.filter((r) => r.division === division);
    const unique = Array.from(new Set(base.map((r) => r.category)));
    return ["All Categories", ...unique];
  }, [division]);

  const filteredRoles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return WORKFORCE_ROLES.filter((role) => {
      if (division !== "all" && role.division !== division) return false;
      if (selectedCategory !== "All Categories" && role.category !== selectedCategory)
        return false;
      if (
        q &&
        !role.title.toLowerCase().includes(q) &&
        !role.category.toLowerCase().includes(q) &&
        !role.environment.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [division, selectedCategory, searchQuery]);

  const isCapped = !searchQuery.trim() && !showAll && filteredRoles.length > 10;
  const visibleRoles = isCapped ? filteredRoles.slice(0, 10) : filteredRoles;

  const groupedByCategory = useMemo(() => {
    const map: Record<string, typeof filteredRoles> = {};
    for (const role of visibleRoles) {
      if (!map[role.category]) map[role.category] = [];
      map[role.category].push(role);
    }
    return Object.entries(map);
  }, [visibleRoles]);

  const handleDivisionChange = (next: "all" | WorkforceDivision) => {
    setDivision(next);
    setSelectedCategory("All Categories");
    setShowAll(false);
  };

  const getQty = (id: string) => quantities[id] ?? 1;
  const setQty = (id: string, val: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, Math.min(500, val || 1)) }));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDivision("all");
    setSelectedCategory("All Categories");
    setShowAll(false);
  };

  return (
    <div className="space-y-6">
      {/* Division Tabs & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#F5F6F8] p-4 sm:p-5 rounded-xl border border-[#E5E7EB]">
        {/* Division Tabs */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Workforce Divisions">
          <button
            type="button"
            role="tab"
            aria-selected={division === "all"}
            onClick={() => handleDivisionChange("all")}
            className={`px-4 py-2.5 rounded-md text-sm font-semibold transition-colors min-h-[44px] ${
              division === "all"
                ? "bg-[#111315] text-white"
                : "bg-white text-[#111315] border border-[#E5E7EB] hover:border-[#111315]"
            }`}
          >
            All Categories ({WORKFORCE_ROLES.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={division === "mep"}
            onClick={() => handleDivisionChange("mep")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold transition-colors min-h-[44px] ${
              division === "mep"
                ? "bg-[#D40820] text-white"
                : "bg-white text-[#111315] border border-[#E5E7EB] hover:border-[#D40820]"
            }`}
          >
            <Wrench className="h-4 w-4" aria-hidden="true" />
            <span>Onshore &amp; Offshore MEP (26)</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={division === "civil"}
            onClick={() => handleDivisionChange("civil")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold transition-colors min-h-[44px] ${
              division === "civil"
                ? "bg-[#D40820] text-white"
                : "bg-white text-[#111315] border border-[#E5E7EB] hover:border-[#D40820]"
            }`}
          >
            <HardHat className="h-4 w-4" aria-hidden="true" />
            <span>Civil &amp; Construction (36)</span>
          </button>
        </div>

        {/* Instant Search */}
        <div className="relative w-full lg:w-80">
          <label htmlFor="workforce-search" className="sr-only">
            Search workforce roles
          </label>
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]"
            aria-hidden="true"
          />
          <input
            id="workforce-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search role (e.g. Welder, Mason, HVAC)..."
            className="w-full rounded-md border border-[#E5E7EB] bg-white pl-10 pr-10 py-2.5 text-sm text-[#111315] placeholder:text-[#667085] focus:border-[#D40820] focus:outline-none min-h-[44px]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#667085] hover:text-[#111315]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-colors min-h-[36px] ${
              selectedCategory === cat
                ? "bg-[#111315] text-white"
                : "bg-[#F5F6F8] text-[#667085] hover:text-[#111315] border border-[#E5E7EB]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#667085]">
        <p>
          Showing <strong className="text-[#111315]">{filteredRoles.length}</strong>{" "}
          workforce supply categories (manpower supply categories, not active job vacancies).
        </p>
        {(searchQuery || division !== "all" || selectedCategory !== "All Categories") && (
          <button
            type="button"
            onClick={clearFilters}
            className="font-semibold text-[#D40820] hover:underline"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Empty State */}
      {filteredRoles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E5E7EB] bg-[#F5F6F8] p-10 text-center space-y-3">
          <p className="text-base font-semibold text-[#111315]">
            No workforce categories matched &ldquo;{searchQuery}&rdquo;.
          </p>
          <p className="text-sm text-[#667085]">
            Try a different trade keyword or contact our team on WhatsApp for custom staffing requirements.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-md bg-[#111315] px-4 py-2.5 text-sm font-semibold text-white min-h-[44px]"
            >
              Clear Search
            </button>
            <a
              href={buildWhatsAppUrl(
                `Hello Pak Arab Manpower Supply LLC, I am looking for manpower in the category: ${searchQuery || "Custom Trade"}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-[#111315] min-h-[44px]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Ask via WhatsApp</span>
            </a>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop / Tablet Grid */}
          <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {visibleRoles.map((role) => {
              const qty = getQty(role.id);
              const waLink = buildWhatsAppUrl(
                `Hello Pak Arab Manpower Supply LLC,\n\nWe would like to request manpower details:\n- Category: ${role.title}\n- Division: ${role.environment}\n- Estimated Quantity: ${qty} worker(s)\n\nPlease let us know availability and next steps.`
              );

              return (
                <div
                  key={role.id}
                  className="flex flex-col justify-between rounded-lg border border-[#E5E7EB] bg-white p-4 hover:border-[#D40820]/60 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          role.division === "mep"
                            ? "bg-[#D40820]/10 text-[#A40E21]"
                            : "bg-[#111315]/10 text-[#111315]"
                        }`}
                      >
                        {role.environment}
                      </span>
                      <span className="text-xs text-[#667085]">{role.category}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#111315]">{role.title}</h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <label htmlFor={`qty-${role.id}`} className="text-xs text-[#667085]">
                        Qty:
                      </label>
                      <input
                        id={`qty-${role.id}`}
                        type="number"
                        min={1}
                        max={500}
                        value={qty}
                        onChange={(e) => setQty(role.id, parseInt(e.target.value, 10))}
                        className="w-16 rounded border border-[#E5E7EB] px-2 py-1 text-xs font-semibold text-[#111315] text-center min-h-[36px]"
                      />
                    </div>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#F5F6F8] hover:bg-[#25D366] px-3 py-2 text-xs font-semibold text-[#111315] transition-colors min-h-[36px]"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-[#25D366] group-hover:text-[#111315]" />
                      <span>Enquire</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Accordion View */}
          <div className="md:hidden space-y-3">
            {groupedByCategory.map(([catName, roles]) => {
              const isOpen = !!openMobileGroups[catName] || !!searchQuery;
              return (
                <div
                  key={catName}
                  className="rounded-lg border border-[#E5E7EB] bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileGroups((prev) => ({
                        ...prev,
                        [catName]: !prev[catName],
                      }))
                    }
                    className="flex w-full items-center justify-between px-4 py-3.5 text-left font-bold text-sm text-[#111315] bg-[#F5F6F8] min-h-[48px]"
                  >
                    <span>
                      {catName} ({roles.length})
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="divide-y divide-[#E5E7EB]">
                      {roles.map((role) => {
                        const qty = getQty(role.id);
                        const waLink = buildWhatsAppUrl(
                          `Hello Pak Arab Manpower Supply LLC,\n\nWe would like to request manpower details:\n- Category: ${role.title}\n- Division: ${role.environment}\n- Estimated Quantity: ${qty} worker(s)`
                        );
                        return (
                          <div
                            key={role.id}
                            className="p-4 flex items-center justify-between gap-3"
                          >
                            <div>
                              <div className="text-sm font-semibold text-[#111315]">
                                {role.title}
                              </div>
                              <div className="text-xs text-[#667085]">{role.environment}</div>
                            </div>
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-md bg-[#25D366] px-3 py-2 text-xs font-semibold text-[#111315] shrink-0 min-h-[44px]"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              <span>Request</span>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {filteredRoles.length > 10 && !searchQuery.trim() && (
            <div className="relative pt-2 text-center">
              {!showAll && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none -mt-12 h-12 w-full bg-gradient-to-t from-white to-transparent"
                />
              )}
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-md border border-[#111315] bg-white px-6 py-3 text-sm font-bold text-[#111315] hover:bg-[#D40820] hover:border-[#D40820] hover:text-white transition-all duration-200 min-h-[44px] cursor-pointer"
              >
                <span>
                  {showAll
                    ? "Show Less"
                    : `See More (${filteredRoles.length - 10} more categories)`}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    showAll ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
