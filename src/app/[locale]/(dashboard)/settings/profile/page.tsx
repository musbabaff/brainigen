'use client';

import { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfileAvatarPage() {
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const [currentAvatar, setCurrentAvatar] = useState('/images/default-avatar.png');

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop({ unit: '%', width: 90 }, 1, width, height),
      width,
      height
    );
    setCrop(crop);
  }

  const handleUpload = () => {
    if (!completedCrop || !imgRef.current) return;
    toast.success('Avatar updated successfully!');
    setImgSrc('');
    setCurrentAvatar(imgSrc); // mock update
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em]">Profile Avatar</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload and customize your profile picture.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>This image will be displayed publicly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-muted border border-border/50 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentAvatar} alt="Current avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex gap-3">
                <Button variant="outline" className="relative cursor-pointer">
                  Upload new
                  <input type="file" accept="image/*" onChange={onSelectFile} className="absolute inset-0 opacity-0 cursor-pointer" />
                </Button>
                <Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => setCurrentAvatar('/images/default-avatar.png')}>
                  Remove
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">JPG, GIF or PNG. Max size of 2MB.</p>
            </div>
          </div>

          {imgSrc && (
            <div className="mt-6 border border-border/50 rounded-xl p-4 bg-muted/30">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-sm">Crop your image</h3>
                <Button variant="ghost" size="sm" onClick={() => setImgSrc('')}><X className="h-4 w-4" /></Button>
              </div>
              <div className="flex justify-center bg-black/5 rounded-lg p-4 overflow-hidden max-h-[400px]">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1}
                  circularCrop
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img ref={imgRef} src={imgSrc} alt="Crop me" onLoad={onImageLoad} className="max-h-[300px] w-auto" />
                </ReactCrop>
              </div>
              <div className="flex justify-end mt-4">
                <Button onClick={handleUpload} className="gap-2">
                  <Check className="h-4 w-4" /> Save Avatar
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
