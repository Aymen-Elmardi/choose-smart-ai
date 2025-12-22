interface QuizLoadingTransitionProps {
  visible?: boolean;
}

const QuizLoadingTransition = ({ visible = true }: QuizLoadingTransitionProps) => {
  return (
    <div 
      className={`min-h-screen bg-background flex items-center justify-center p-6 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center max-w-md animate-fade-up">
        {/* Soft spinner */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-muted"></div>
            <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          </div>
        </div>

        {/* Primary text */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Analysing your answers
        </h2>

        {/* Secondary text */}
        <p className="text-muted-foreground text-lg mb-4">
          Matching your business with the most suitable payment providers
        </p>

        {/* Subtle third line */}
        <p className="text-sm text-muted-foreground/70">
          This usually takes a few seconds
        </p>
      </div>
    </div>
  );
};

export default QuizLoadingTransition;
