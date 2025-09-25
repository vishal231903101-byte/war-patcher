import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageComparisonProps {
  originalImage: File | null;
  damagedImageUrl: string | null;
  isProcessing?: boolean;
}

const ImageComparison = ({ originalImage, damagedImageUrl, isProcessing }: ImageComparisonProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    if (!damagedImageUrl) return;
    
    // In a real implementation, this would download the processed image
    toast({
      title: "Download started",
      description: "The damaged image is being downloaded",
    });
  };

  if (!originalImage && !damagedImageUrl) {
    return null;
  }

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Image Comparison</h3>
        {damagedImageUrl && (
          <Button onClick={handleDownload} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Result
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Original Image */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-gradient-secondary">
              Original
            </Badge>
          </div>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            {originalImage ? (
              <img
                src={URL.createObjectURL(originalImage)}
                alt="Original undamaged image"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No image selected
              </div>
            )}
          </div>
        </div>

        {/* Transformation Arrow */}
        <div className="hidden md:flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-gradient-transform rounded-full flex items-center justify-center shadow-glow">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">CycleGAN</p>
              <p className="text-xs text-muted-foreground">AI Processing</p>
            </div>
          </div>
        </div>

        {/* Damaged Image */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="destructive" className="bg-gradient-transform">
              War Damaged
            </Badge>
            {isProcessing && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Processing...</span>
              </div>
            )}
          </div>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            {isProcessing ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-muted-foreground">Generating war damage simulation...</p>
                </div>
              </div>
            ) : damagedImageUrl ? (
              <img
                src={damagedImageUrl}
                alt="AI generated war damaged image"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Waiting for processing
              </div>
            )}
          </div>
        </div>
      </div>

      {damagedImageUrl && (
        <div className="mt-6 p-4 bg-gradient-secondary rounded-lg">
          <h4 className="font-medium mb-2">AI Model Information</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Model:</span>
              <p className="font-medium">CycleGAN</p>
            </div>
            <div>
              <span className="text-muted-foreground">Training Epochs:</span>
              <p className="font-medium">100</p>
            </div>
            <div>
              <span className="text-muted-foreground">Task:</span>
              <p className="font-medium">War Damage Simulation</p>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <p className="font-medium text-green-400">Complete</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ImageComparison;