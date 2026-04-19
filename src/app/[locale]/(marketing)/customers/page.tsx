"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, Building2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LogoWall } from "@/components/marketing/LogoWall";

const ease = [0.16, 1, 0.3, 1] as const;

const caseStudies = [
  {
    slug: "quantum-ai",
    company: "Quantum AI",
    industry: "SaaS",
    size: "200+ employees",
    challenge: "Manual customer support couldn't scale with 10x user growth.",
    solution: "Deployed 3 Brainigen agents handling 80% of tier-1 support tickets.",
    results: ["70% reduction in support time", "95% customer satisfaction", "$240K annual savings"],
    quote: "Brainigen transformed our support operations overnight. What took hours now takes seconds.",
    author: "Sarah Chen",
    role: "VP of Customer Success",
  },
  {
    slug: "neurotech",
    company: "NeuroTech",
    industry: "Healthcare",
    size: "500+ employees",
    challenge: "Clinical data extraction from unstructured reports was error-prone and slow.",
    solution: "Built a RAG-powered agent with Brainigen's Knowledge Base connected to their medical corpus.",
    results: ["90% accuracy on data extraction", "3x faster report processing", "Zero HIPAA violations"],
    quote: "The Knowledge Base feature is incredible. Our AI agent actually understands medical terminology.",
    author: "Dr. Michael Rodriguez",
    role: "Chief Data Officer",
  },
  {
    slug: "datacraft",
    company: "DataCraft",
    industry: "E-commerce",
    size: "50+ employees",
    challenge: "Sales team spent 60% of time on lead qualification instead of closing.",
    solution: "Automated lead scoring and initial outreach with Brainigen's workflow agents.",
    results: ["45% increase in conversion", "60% less time qualifying", "$1.2M pipeline growth"],
    quote: "Our sales reps now focus on what they do best — closing deals. Brainigen handles the rest.",
    author: "Emma Klein",
    role: "Head of Sales",
  },
];

export default function CustomersPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">
            Customers
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] mb-6">
            Loved by AI-first teams
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            See how companies around the world use Brainigen to automate operations,
            delight customers, and scale faster.
          </p>
        </motion.div>

        {/* Logo wall */}
        <div className="mb-20">
          <LogoWall showLink={false} />
        </div>

        {/* Featured case studies */}
        <div className="space-y-8 mb-20">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease }}
            >
              <Card className="border-border/40 bg-card/80 rounded-xl overflow-hidden hover:border-border transition-colors duration-200">
                <CardContent className="p-8 md:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left: Details */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{study.company}</h3>
                          <div className="flex gap-2 mt-0.5">
                            <Badge variant="outline" className="text-[10px] px-2 py-0">{study.industry}</Badge>
                            <Badge variant="outline" className="text-[10px] px-2 py-0">{study.size}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Challenge</p>
                          <p className="text-sm text-foreground/80">{study.challenge}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Solution</p>
                          <p className="text-sm text-foreground/80">{study.solution}</p>
                        </div>
                      </div>

                      {/* Results */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {study.results.map((r) => (
                          <Badge key={r} className="bg-primary/10 text-primary border-0 text-xs font-medium px-3 py-1">
                            {r}
                          </Badge>
                        ))}
                      </div>

                      <Link href={`/customers/${study.slug}`}>
                        <Button variant="outline" size="sm" className="text-sm cursor-pointer">
                          Read full story <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>

                    {/* Right: Quote */}
                    <div className="flex flex-col justify-center">
                      <Quote className="h-8 w-8 text-primary/15 mb-4 -scale-x-100" />
                      <p className="text-lg text-foreground/85 leading-relaxed mb-6 italic">
                        &ldquo;{study.quote}&rdquo;
                      </p>
                      <div>
                        <p className="text-sm font-semibold">{study.author}</p>
                        <p className="text-xs text-muted-foreground">{study.role}, {study.company}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-[-0.02em] mb-4">Ready to join them?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Start building AI agents today and see results within your first week.
          </p>
          <Link href="/register">
            <Button className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6 text-sm font-medium cursor-pointer">
              Start building <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
