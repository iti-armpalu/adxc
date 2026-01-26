import { Building2, DollarSign, Target } from "lucide-react";

export function HeroSection() {
  return (

    <section className="w-full py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h1 className="text-4xl md:text-[60px] max-w-3xl text-center mx-auto font-extrabold leading-tight tracking-tight mb-8 ">
          SMEs want your data, but can't access it today
        </h1>

        {/* Market Reality Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Stat 1 */}
          <div className="bg-white rounded-xl border border-slate-200 text-center p-6 md:p-8 hover:border-adxc hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center ">
                <Building2 className="w-6 h-6 text-adxc" />
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
              {">"}99%
            </div>
            <div className="text-lg text-slate-500">of Businesses</div>
            <p className="text-sm text-slate-500 mt-3">
              are small and medium-sized enterprises
            </p>
          </div>

          {/* Stat 2 */}
          <div className="bg-white rounded-xl border border-slate-200 text-center p-6 md:p-8 hover:border-adxc hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-adxc" />
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
              ~$74B
            </div>
            <div className="text-lg text-slate-500">Annual SME Spend</div>
            <p className="text-sm text-slate-500 mt-3">
              Estimated annual SME research and data spend (UK + US)
            </p>
          </div>
        </div>

        {/* Highlight Box - Your Wedge */}
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-8 md:p-10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-6">
              <h3 className="text-2xl lg:text-3xl font-semibold text-slate-900 text-balance">
                We Can Unlock This Market for You via Agent-Native Data Delivery
              </h3>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-emerald-600">
                    $4.5M
                  </div>
                  <div className="text-sm text-slate-600">
                    Target annual revenue potential
                  </div>
                </div>
              </div>
              <p className="text-slate-600 md:border-l md:border-emerald-200 md:pl-12">
                for Kantar via ADXC within 24 months
              </p>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-slate-400 mt-8 max-w-3xl mx-auto leading-relaxed">
          Estimated research and data spend by SMEs (1–250 employees) in the UK and US who currently purchase research.
        </p>
      </div>
    </section>



    // <section className="pt-28 pb-24 px-6 relative overflow-hidden">
    //   {/* Background decoration */}
    //   <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-muted/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

    //   <div className="container mx-auto max-w-6xl relative">
    //     {/* Badge */}
    //     <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-8 animate-fade-up">
    //       <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
    //       <span className="text-sm font-medium text-muted-foreground">Unlocking SME data markets</span>
    //     </div>

    //     <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
    //       {/* Left: Main headline */}
    //       <div>
    //         <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-[1.1] tracking-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
    //           SMEs want your data, but can't access it today
    //         </h1>

    //         <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
    //           We bridge the gap between enterprise data providers and the businesses that need it most.
    //         </p>

    //         {/* Highlight Box */}
    //         <div className="bg-adxc rounded-2xl p-6 md:p-8 shadow-xl animate-fade-up" style={{ animationDelay: "0.3s" }}>
    //           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    //             <p className="text-lg md:text-xl font-semibold text-background">
    //               We can unlock this market for you.
    //             </p>
    //             <div className="text-right">
    //               <div className="text-3xl md:text-4xl font-extrabold text-background tracking-tight">
    //                 $4.5M
    //               </div>
    //               <p className="text-background/60 text-sm">
    //                 Target revenue via ADXC
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Right: Stats */}
    //       <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
    //         <div className="bg-secondary rounded-2xl p-8 border border-border">
    //           <div className="text-6xl md:text-7xl font-extrabold text-foreground mb-3 tracking-tight">
    //             &gt;99%
    //           </div>
    //           <p className="text-muted-foreground text-lg">
    //             of all businesses are SMEs
    //           </p>
    //         </div>

    //         <div className="bg-secondary rounded-2xl p-8 border border-border">
    //           <div className="text-6xl md:text-7xl font-extrabold text-foreground mb-3 tracking-tight">
    //             $74B
    //           </div>
    //           <p className="text-muted-foreground text-lg">
    //             Potential untapped SME research + data budget in UK + US alone
    //           </p>
    //         </div>
    //       </div>
    //     </div>

    //     <p className="text-xs text-muted-foreground mt-8 opacity-70">
    //       <sup>1</sup> Estimated market research budget of SMEs in UK + US w/ 1-250 employees, who currently pay for research
    //     </p>
    //   </div>
    // </section>
  );
}
