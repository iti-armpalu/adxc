import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const FloatingCTA = () => {
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild> */}
            <Button 
              size="icon"
              onClick={scrollToCalculator}
              className="h-12 w-12 rounded-full"
            >
              <Calculator className="h-5 w-5" />
            </Button>
          {/* </TooltipTrigger>
          <TooltipContent side="left" className="font-medium"> */}
            Calculate Your Savings
          {/* </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
    </div>
  );
};

export default FloatingCTA;
