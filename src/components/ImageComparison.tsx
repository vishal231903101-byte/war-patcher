import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageComparisonProps {
  originalImage: File | null;
  damagedImageUrl: string | null;
  restoredImageUrl: string | null;
  isProcessingDamage?: boolean;
  isProcessingRestore?: boolean;
}

const ImageComparison = ({ originalImage, damagedImageUrl, restoredImageUrl, isProcessingDamage, isProcessingRestore }: ImageComparisonProps) => {
  const { toast } = useToast();

  const handleDownload = (type: 'damage' | 'restore') => {
    const imageUrl = type === 'damage' ? damagedImageUrl : restoredImageUrl;
    if (!imageUrl) return;
    
    // In a real implementation, this would download the processed image
    toast({
      title: "Download started",
      description: `The ${type === 'damage' ? 'damaged' : 'restored'} image is being downloaded`,
    });
  };

  if (!originalImage && !damagedImageUrl && !restoredImageUrl) {
    return null;
  }

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">CycleGAN Results</h3>
        <div className="flex gap-2">
          {damagedImageUrl && (
            <Button onClick={() => handleDownload('damage')} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Damaged
            </Button>
          )}
          {restoredImageUrl && (
            <Button onClick={() => handleDownload('restore')} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Restored
            </Button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
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

        {/* Damaged Image */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="destructive" className="bg-gradient-transform">
              War Damaged
            </Badge>
            {isProcessingDamage && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Processing...</span>
              </div>
            )}
          </div>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            {isProcessingDamage ? (
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
                Click "Generate Damage" to process
              </div>
            )}
          </div>
        </div>

        {/* Restored Image */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-gradient-secondary">
              Restored/Undamaged
            </Badge>
            {isProcessingRestore && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Processing...</span>
              </div>
            )}
          </div>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            {isProcessingRestore ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-muted-foreground">Restoring image...</p>
                </div>
              </div>
            ) : restoredImageUrl ? (
              <img
                src={restoredImageUrl}
                alt="AI generated restored image"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Click "Restore to Undamaged" to process
              </div>
            )}
          </div>
        </div>
      </div>

      {(damagedImageUrl || restoredImageUrl) && (
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
              <p className="font-medium">Bidirectional Image Transformation</p>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <p className="font-medium text-green-400">Ready</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ImageComparison;