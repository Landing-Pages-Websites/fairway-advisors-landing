"use client";

import { useTracking } from "@/hooks/useTracking";
import { QueryParamPersistence } from "@/components/QueryParamPersistence";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProofBar } from "@/components/ProofBar";
import { WhyFairway } from "@/components/WhyFairway";
import { TrackRecord } from "@/components/TrackRecord";
import { Services } from "@/components/Services";
import { BuySide } from "@/components/BuySide";
import { Clients } from "@/components/Clients";
import { Faq } from "@/components/Faq";
import { LeadForm } from "@/components/LeadForm";
import { FinalCta } from "@/components/FinalCta";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingCTA } from "@/components/FloatingCTA";
import { TRACKING } from "@/lib/content";

export default function Page(): React.ReactElement {
  useTracking({
    siteKey: TRACKING.siteKey,
    siteId: TRACKING.siteId,
    gtmId: TRACKING.gtmId,
  });

  return (
    <main className="overflow-x-hidden bg-[var(--color-primary)]">
      <QueryParamPersistence />
      <Header />
      <Hero />
      <ProofBar />
      <WhyFairway />
      <TrackRecord />
      <Services />
      <BuySide />
      <Clients />
      <Faq />
      <LeadForm />
      <FinalCta />
      <SiteFooter />
      <FloatingCTA />
    </main>
  );
}
