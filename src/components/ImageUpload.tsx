import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClear: () => void;
}

const ImageUpload = ({ onImageSelect, selectedImage, onClear }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (PNG, JPG, JPEG)",
        variant: "destructive"
      });
      return;
    }

    if (imageFiles.length > 1) {
      toast({
        title: "Multiple files selected",
        description: "Please select only one image at a time",
        variant: "destructive"
      });
      return;
    }

    onImageSelect(imageFiles[0]);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="relative overflow-hidden shadow-card">
      {selectedImage ? (
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Original Image</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={onClear}
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
          
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected image"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="mt-4 p-3 bg-secondary rounded-lg">
            <p className="text-sm text-secondary-foreground">
              <span className="font-medium">File:</span> {selectedImage.name}
            </p>
            <p className="text-sm text-secondary-foreground">
              <span className="font-medium">Size:</span> {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      ) : (
        <div
          className={`p-12 border-2 border-dashed rounded-lg transition-all cursor-pointer hover:border-primary ${
            isDragging ? 'border-primary bg-primary/5' : 'border-border'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-6">
              <Upload className="w-8 h-8 text-primary-foreground" />
            </div>
            
            <h3 className="text-xl font-semibold mb-2">Upload Undamaged Image</h3>
            <p className="text-muted-foreground mb-6">
              Drag and drop your image here, or click to browse
            </p>
            
            <Button variant="outline" size="lg" className="bg-gradient-secondary border-border">
              <ImageIcon className="w-4 h-4 mr-2" />
              Choose File
            </Button>
            
            <p className="text-xs text-muted-foreground mt-4">
              Supports PNG, JPG, JPEG files up to 10MB
            </p>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </Card>
  );
};

export default ImageUpload;