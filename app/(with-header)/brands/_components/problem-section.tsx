import { X, Check, TrendingDown, DollarSign, Database, Clock, Music, Tv, Cloud, Zap } from "lucide-react";

const analogies = [
  {
    icon: Music,
    industry: "Music",
    old: "Buy full albums for $15",
    new: "Stream any song for $0.01",
  },
  {
    icon: Tv,
    industry: "Entertainment",
    old: "Pay $100/mo cable bundles",
    new: "Subscribe only to what you watch",
  },
  {
    icon: Cloud,
    industry: "Computing",
    old: "Buy servers upfront",
    new: "Pay for compute by the second",
  },
  {
    icon: Zap,
    industry: "Data",
    old: "Buy full datasets for $100K+",
    new: "Pay per insight delivered",
  },
];

const ProblemSection = () => {
  return (
    <section id="problem" className="relative py-24">
      <div className="container">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-black md:text-5xl">
            The data industry has a pricing problem
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Enterprise data was built for humans who needed full access. 
            AI agents only need precise slices to deliver answers.
          </p>
        </div>

        {/* Comparison grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Old way */}
          <div className="group relative rounded-2xl border border-destructive/20 bg-gradient-card p-8 transition-all hover:border-destructive/40">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-1.5">
              <X className="h-4 w-4 text-destructive" />
              <span className="text-sm font-semibold text-destructive">Traditional Data Access</span>
            </div>
            
            <h3 className="mb-6 text-2xl font-bold">The Old Model</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-xl bg-background/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                  <DollarSign className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <div className="font-semibold">$50K-$500K Annual Contracts</div>
                  <div className="text-sm text-muted-foreground">Fixed pricing regardless of actual usage</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 rounded-xl bg-background/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                  <Database className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <div className="font-semibold">Full Dataset Downloads</div>
                  <div className="text-sm text-muted-foreground">Terabytes of data you'll never touch</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 rounded-xl bg-background/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                  <TrendingDown className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <div className="font-semibold">90% Goes Unused</div>
                  <div className="text-sm text-muted-foreground">Paying for data that collects dust</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 rounded-xl bg-background/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                  <Clock className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <div className="font-semibold">Weeks to Integrate</div>
                  <div className="text-sm text-muted-foreground">Complex APIs, endless documentation</div>
                </div>
              </div>
            </div>
          </div>

          {/* New way */}
          <div className="group relative rounded-2xl border border-green/20 bg-gradient-card p-8 transition-all hover:border-green/40 hover:shadow-glow">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5">
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-green-600">ADXC Model</span>
            </div>
            
            <h3 className="mb-6 text-2xl font-bold">The AI-Native Way</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-xl bg-background/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold">Pay Per Answer</div>
                  <div className="text-sm text-muted-foreground">Only pay for data that generates insights</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 rounded-xl bg-background/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold">Precise Data Slices</div>
                  <div className="text-sm text-muted-foreground">AI fetches exactly what it needs, nothing more</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 rounded-xl bg-background/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50">
                  <TrendingDown className="h-5 w-5 text-green-600" style={{ transform: 'rotate(180deg)' }} />
                </div>
                <div>
                  <div className="font-semibold">100% Utilization</div>
                  <div className="text-sm text-muted-foreground">Every byte of data drives value</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 rounded-xl bg-background/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold">Minutes to Deploy</div>
                  <div className="text-sm text-muted-foreground">Plug into your AI agents instantly</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-world analogies */}
        <div className="mt-16">
          <div className="mb-8 text-center">
            <h3 className="mb-2 text-xl font-bold md:text-2xl">Every industry made this shift</h3>
            <p className="text-muted-foreground">Data is next.</p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {analogies.map((analogy) => (
              <div 
                key={analogy.industry}
                className="group rounded-xl border border-border bg-gradient-card p-5 transition-all hover:border-primary/30"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <analogy.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-semibold">{analogy.industry}</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    <span className="text-muted-foreground">{analogy.old}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                    <span className="font-medium">{analogy.new}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
