import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Shield, Github } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import ImageComparison from '@/components/ImageComparison';
import { useToast } from '@/hooks/use-toast';
import heroBanner from '@/assets/hero-banner.jpg';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [damagedImageUrl, setDamagedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setDamagedImageUrl(null); // Clear previous result
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setDamagedImageUrl(null);
  };

  const handleProcessImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      // In a real implementation, this would fetch from your Google Drive
      // For demo purposes, we'll use a placeholder
      setDamagedImageUrl("https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop");
      setIsProcessing(false);
      
      toast({
        title: "Processing complete",
        description: "War damage simulation has been generated successfully",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/80"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-primary text-primary-foreground border-0 shadow-glow">
              <Brain className="w-4 h-4 mr-2" />
              AI Research Project
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              War Damage Simulation
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-primary">
              Using CycleGAN Neural Network
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced AI model trained on 100 epochs to transform undamaged infrastructure images 
              into realistic war damage simulations for research and educational purposes.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-full shadow-card">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">100 Training Epochs</span>
              </div>
              <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-full shadow-card">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Research Purpose</span>
              </div>
              <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-full shadow-card">
                <Brain className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">CycleGAN Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Application */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Upload Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ImageUpload
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
                onClear={handleClearImage}
              />
            </div>
            
            <div className="space-y-6">
              <Card className="p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-4">Processing Controls</h3>
                
                <Button
                  onClick={handleProcessImage}
                  disabled={!selectedImage || isProcessing}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Generate Damage
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  AI processing typically takes 2-3 seconds
                </p>
              </Card>

              <Card className="p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-4">Model Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Architecture:</span>
                    <span className="font-medium">CycleGAN</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Training Epochs:</span>
                    <span className="font-medium">100</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Task Type:</span>
                    <span className="font-medium">Image-to-Image</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Model Status:</span>
                    <span className="font-medium text-green-400">Trained</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Results Section */}
          {(selectedImage || damagedImageUrl) && (
            <ImageComparison
              originalImage={selectedImage}
              damagedImageUrl={damagedImageUrl}
              isProcessing={isProcessing}
            />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              AI Research Project - War Damage Simulation using CycleGAN
            </p>
            <div className="flex justify-center space-x-6">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Github className="w-4 h-4 mr-2" />
                View Research
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;